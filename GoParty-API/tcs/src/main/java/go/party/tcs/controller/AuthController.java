package go.party.tcs.controller;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.EmailService;
import go.party.tcs.service.JWTService;
import go.party.tcs.service.UsuarioService;
import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/v1/auth") 
public class AuthController {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private UsuarioService service;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private String codigoGeradoEmail;

    private String emailUsuario;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        try{
            UsernamePasswordAuthenticationToken userPassword = new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword());
            var authenticate = manager.authenticate(userPassword);
            String jwt = jwtService.generateToken((Usuario) authenticate.getPrincipal());
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("usuario", authenticate);
            return ResponseEntity.ok().body(response);
        } catch (AuthenticationException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nome de usuario e senha inválidos");
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody Usuario usuario) {
        try {
            String password = new BCryptPasswordEncoder().encode(usuario.getSenha());
            usuario.setSenha(password);
            //Momento de cadastro do user
            usuario.setDataCadastro(LocalDateTime.now());
            service.cadastrarUsuario(usuario);
            return  ResponseEntity.ok("Usuario cadastrado com sucesso!");
        } catch (RuntimeException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário.");
        }
    }

    @PostMapping("/cadastro-usuario-estudante")
    public ResponseEntity<String> cadastrarUsuarioEstudante(@RequestBody Usuario usuario) {
        try {
            // Verifica se o e-mail é educacional
            if (!isEmailEducacional(usuario.getEmail())) {
                return ResponseEntity.badRequest().body("O e-mail fornecido não é de uma instituição educacional.");
            }
    
            String password = new BCryptPasswordEncoder().encode(usuario.getSenha());
            usuario.setSenha(password);
            //Momento de cadastro do usuário
            usuario.setDataCadastro(LocalDateTime.now());
            service.cadastrarUsuarioEstudante(usuario);
            return ResponseEntity.ok("Estudante cadastrado com sucesso!");
        } catch (RuntimeException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário.");
        }
    }
    
    // Método para verificar se o e-mail é educacional
    private boolean isEmailEducacional(String email) {
        // Lista de domínios educacionais válidos
        List<String> dominiosEducacionais = Arrays.asList(".edu", ".edu.br", "@alunos"); 
        return dominiosEducacionais.stream().anyMatch(dominio -> email.endsWith(dominio));
    }
    
    //Verificação para troca de senha
    @GetMapping("/check-email-change")
    public ResponseEntity<String> checkEmailExistsTroca(@RequestParam String emailDigitado) throws MessagingException {

        boolean exists = usuarioRepository.existsByEmail(emailDigitado);
        if (exists){
            emailUsuario = emailDigitado;
            codigoGeradoEmail = gerarCodigoRecuperacao();
            String assunto = "Recuperação de senha | GoParty";
            String mensagem = "Use o código a seguir para redefinir sua senha: " + codigoGeradoEmail;
            emailService.sendEmailToClient(emailDigitado, assunto, mensagem);
            return ResponseEntity.ok("Email já cadastrado!");
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
    }

    //Verificar codigo digitado
    @GetMapping("/check-code")
    public ResponseEntity<String> verificarCodigoDigitado(@RequestParam String codigoDigitado) throws MessagingException {

        if (codigoDigitado.equals(codigoGeradoEmail)){
            return ResponseEntity.ok("codigo verificado com sucessoQ!");
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Código digitado incorreto!");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
    }

    //Troca de Senha
    @PostMapping("/change-password")
    public ResponseEntity<String> trocaDeSenha(@RequestParam String novaSenha) throws MessagingException {

        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(emailUsuario);

        if (usuarioOptional.isPresent()){
            Usuario usuario = usuarioOptional.get();
            String novaSenhaEncode = passwordEncoder.encode(novaSenha);
            usuario.setSenha(novaSenhaEncode);
            usuarioRepository.save(usuario);
            return ResponseEntity.ok("Senha alterada com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não encontrado!");
        }
    }

    // Método de geração de códigos aleatórios alfanuméricos
    public String gerarCodigoRecuperacao() {

        String caracteres = "0123456789";
        StringBuilder codigo = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 5; i++) {
            int index = random.nextInt(caracteres.length());
            codigo.append(caracteres.charAt(index));
        }
        return codigo.toString();
    }


}
