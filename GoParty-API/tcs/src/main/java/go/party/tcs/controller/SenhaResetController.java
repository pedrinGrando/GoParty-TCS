package go.party.tcs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Random;

import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.EmailService;
import go.party.tcs.service.UsuarioService;
import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/v1/resetpassword")
@CrossOrigin(origins = "http://localhost:3000") // Permitindo requisições apenas do localhost:3000
public class SenhaResetController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private String codigoRecuperacao;

    private String emailRecuperado;

    @PostMapping("/passwordrecovery")
    public ResponseEntity<String> enviarEmailDeRecuperacao(@RequestParam("email") String email) {
        try {
            boolean emailExiste = usuarioService.emailExiste(email);
            // Gere um código de recuperação e envie-o por e-mail
            String codigoRecuperacao = gerarCodigoRecuperacao();
            String assunto = "Recuperação de senha | GoParty";
            String mensagem = "Use o código a seguir para redefinir sua senha: " + codigoRecuperacao;

            if (emailExiste) {
                emailService.sendEmailToClient(email, assunto, mensagem);
                return ResponseEntity.ok("Email de recuperação enviado com sucesso.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não existe um cadastro com este E-mail.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao enviar o email de recuperação.");
        }
    }

    @PostMapping("/type-Recovery-Code")
    public ResponseEntity<String> checarCodigoDigitado(@RequestParam("codigo") String codigoDigitado) {
        try {
            if (codigoDigitado.equalsIgnoreCase(codigoRecuperacao)) {
                return ResponseEntity.ok("Código válido. Redirecionando para a troca de senha.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Código inválido.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao verificar o código de recuperação.");
        }
      }

      @PutMapping("/trocaDeSenha")
      public ResponseEntity<String> realizarTrocaSenha(@RequestParam("email") String emailRecuperado, @RequestParam("novaSenha") String senhaNova) {
          try {
              // RECUPERANDO USUARIO
              Usuario usuario = usuarioService.buscarPorEmail(emailRecuperado);
  
              String senhaCriptografada = passwordEncoder.encode(senhaNova);
              usuario.setSenha(senhaCriptografada);
  
              usuarioRepository.save(usuario);
  
              return ResponseEntity.ok("Senha alterada com sucesso. Redirecionando para o login.");
          } catch (Exception e) {
              e.printStackTrace();
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao realizar a troca de senha.");
          }
      }

    // Método de geração de códigos aleatórios alfanuméricos
    public String gerarCodigoRecuperacao() {
        // Define os caracteres permitidos no código
        String caracteres = "0123456789";
        StringBuilder codigo = new StringBuilder();
        Random random = new Random();

        // Gera um código de 6 caracteres
        for (int i = 0; i < 5; i++) {
            int index = random.nextInt(caracteres.length());
            codigo.append(caracteres.charAt(index));
        }
        return codigo.toString();
    }

}
