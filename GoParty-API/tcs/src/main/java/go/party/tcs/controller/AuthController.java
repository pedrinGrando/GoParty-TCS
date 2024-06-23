package go.party.tcs.controller;

import java.util.Map;

import go.party.tcs.model.AppException;
import go.party.tcs.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.model.Usuario;
import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        try {
            Map<String, Object> response = authService.login(usuario);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nome de usuário e senha inválidos");
        } catch (AppException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exception.getMessage());
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody Usuario usuario) {
        try {
            authService.cadastroUsuario(usuario);
            return  ResponseEntity.ok("Validacao solicitada com sucesso!");
        } catch (MessagingException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário.");
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/validar-email-cadastro")
    public ResponseEntity<String> validarEmailCadastro(@RequestParam String codigoDigitado) {
        if (authService.validarEmailCadastro(codigoDigitado)) {
            return ResponseEntity.ok("Usuario cadastrado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Codigo Invalido!");
       }
    }

    @PostMapping("/cadastro-usuario-estudante")
    public ResponseEntity<String> cadastrarUsuarioEstudante(@RequestBody Usuario usuario) {
        try {
            authService.cadastroUsuarioEstudante(usuario);
            return ResponseEntity.ok("Validacao solicitada com sucesso!");
        }catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (MessagingException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário.");
        }
    }

    @GetMapping("/check-email-change")
    public ResponseEntity<String> checkEmailExistsTroca(@RequestParam String emailDigitado) {
        try {
            if (authService.checkEmailExistsTroca(emailDigitado)) {
                return ResponseEntity.ok("Email já cadastrado!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
            }
        } catch (MessagingException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não existe!");
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/check-code")
    public ResponseEntity<String> verificarCodigoDigitado(@RequestParam String codigoDigitado) {
        if (authService.verificarCodigoDigitado(codigoDigitado)){
            return ResponseEntity.ok("codigo verificado com sucesso!");
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Código digitado incorreto!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> trocaDeSenha(@RequestParam String senha) {
        try {
            authService.trocaSenha(senha);
            return ResponseEntity.ok("Senha alterada com sucesso!");
        } catch (AppException exception){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

}
