package go.party.tcs.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.model.Usuario;
import go.party.tcs.service.JWTService;
import go.party.tcs.service.UsuarioService;

@RestController
@RequestMapping("/v1/auth") 
public class AuthController {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private UsuarioService service;

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
            usuario.setTipoUsuario(TipoUsuario.USER);
            service.cadastrarUsuario(usuario);
            return  ResponseEntity.ok("Usuario cadastrado com sucesso!");
        } catch (RuntimeException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário.");
        }
    }


}
