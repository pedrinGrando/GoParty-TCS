package go.party.tcs.service;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.UsuarioResponseDTO;
import go.party.tcs.model.AppException;
import go.party.tcs.model.Usuario;
import go.party.tcs.util.GerarCodigo;
import go.party.tcs.validate.Email;
import go.party.tcs.validate.Senha;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import go.party.tcs.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private  BCryptPasswordEncoder passwordEncoder;

    private Usuario usuarioValidarCadastro;

    private String codigoGeradoEmail;

    private String emailUsuario;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, AppException {
        return usuarioRepository.findByUsername(username);
    }

    public Map<String, Object> login(Usuario usuario) {
        UsernamePasswordAuthenticationToken userPassword = new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword());
        var authenticate = manager.authenticate(userPassword);
        Usuario authenticatedUser = (Usuario) authenticate.getPrincipal();
        if (!authenticatedUser.isAtivo()) {
            throw new AppException("Conta inativa. Por favor, entre em contato com o suporte.");
        }
        UsuarioResponseDTO usuarioResponseDTO = new UsuarioResponseDTO(
                authenticatedUser.getId(), authenticatedUser.getNome(), authenticatedUser.getUsername(),
                authenticatedUser.getEmail(), authenticatedUser.getDataNasci(), authenticatedUser.getTipoUsuario(),
                authenticatedUser.getCpf(), authenticatedUser.getFotoCaminho(),
                authenticatedUser.getDataAceite()
        );
        String jwt = jwtService.generateToken(authenticatedUser);
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("usuario", usuarioResponseDTO);
        return response;
    }

    public void cadastroUsuario(Usuario usuario) throws MessagingException, AppException {
        if(!Email.isValidEmail(usuario.getEmail())) {
            throw new AppException("Email invalido");
        }
        if(!Senha.isSenhaValida(usuario.getPassword())) {
            throw new AppException("Senha invalida");
        }
        String password = new BCryptPasswordEncoder().encode(usuario.getSenha());
        usuario.setSenha(password);
        usuario.setDataAceite(LocalDateTime.now());
        usuarioValidarCadastro = usuario;
        emailUsuario = usuarioValidarCadastro.getEmail();
        codigoGeradoEmail = GerarCodigo.gerarCodigoRecuperacao();
        String assunto = "Olá "+ usuarioValidarCadastro.getUsername() + " bem vindo ao GoParty";
        String mensagem = "Use o código a seguir para validar sua conta: " + codigoGeradoEmail;
        emailService.sendEmailToClient(emailUsuario, assunto, mensagem);
    }

    public boolean validarEmailCadastro(String codigoDigitado) {
        if(codigoDigitado.equals(codigoGeradoEmail)){
            if(!Email.isStudent(usuarioValidarCadastro.getEmail())){
                usuarioService.cadastrarUsuario(usuarioValidarCadastro, TipoUsuario.BASIC);
            } else {
                usuarioService.cadastrarUsuario(usuarioValidarCadastro, TipoUsuario.STUDENT);
            }
            return true;
        }
        return false;
    }

    public void cadastroUsuarioEstudante(Usuario usuario) throws MessagingException, AppException {
        if (!Email.isStudent(usuario.getEmail())) {
            throw new AppException("O e-mail fornecido não é de uma instituição educacional.");
        }
        if(!Senha.isSenhaValida(usuario.getPassword())) {
            throw new AppException("Senha invalida");
        }
        String password = new BCryptPasswordEncoder().encode(usuario.getSenha());
        usuario.setSenha(password);
        usuario.setDataAceite(LocalDateTime.now());
        usuarioValidarCadastro = usuario;
        emailUsuario = usuarioValidarCadastro.getEmail();
        codigoGeradoEmail = GerarCodigo.gerarCodigoRecuperacao();
        String assunto = "Olá "+ usuarioValidarCadastro.getUsername() + " bem vindo ao GoParty";
        String mensagem = "Use o código a seguir para validar sua conta: " + codigoGeradoEmail;
        emailService.sendEmailToClient(emailUsuario, assunto, mensagem);
    }

    public boolean checkEmailExistsTroca(String emailDigitado) throws MessagingException, AppException{
        if(!Email.isValidEmail(emailDigitado)){
            throw new AppException("Email invalido");
        }
        boolean exists = usuarioRepository.existsByEmail(emailDigitado);
        if (exists) {
            emailUsuario = emailDigitado;
            codigoGeradoEmail = GerarCodigo.gerarCodigoRecuperacao();
            String assunto = "Recuperação de senha | GoParty";
            String mensagem = "Use o código a seguir para redefinir sua senha: " + codigoGeradoEmail;
            emailService.sendEmailToClient(emailDigitado, assunto, mensagem);
            return true;
        }
        return false;
    }

    public boolean verificarCodigoDigitado(String codigoDigitado) {
        return codigoDigitado.equals(codigoGeradoEmail);
    }

    public void trocaSenha(String senha) throws AppException {
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario).orElseThrow(() -> new AppException("Email não encontrado!"));
        String novaSenhaEncode = passwordEncoder.encode(senha);
        usuario.setSenha(novaSenhaEncode);
        usuarioRepository.save(usuario);
    }

}
