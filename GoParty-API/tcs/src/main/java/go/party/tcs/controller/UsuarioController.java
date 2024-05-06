package go.party.tcs.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import go.party.tcs.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.model.Usuario;
import go.party.tcs.service.CurtidaService;
import go.party.tcs.service.EmailService;
import go.party.tcs.service.EventoService;
import go.party.tcs.service.NotificationService;
import go.party.tcs.service.UsuarioService;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/v1/usuarios")
@CrossOrigin(origins = "http://localhost:5173/")
public class UsuarioController {

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CurtidaService curtidaService;

    @Autowired
    private CurtidaRepository curtidaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private EventoService eventoService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${file.upload-dir}")
    private String uploadDir;

    Usuario usuarioCadastro = new Usuario();

    Usuario usuarioPerfilVisitado = new Usuario();

    @PostMapping("/{userId}/upload-profile-image")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {

        try {
            Optional<Usuario> userOptional = usuarioRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            Usuario usuario = userOptional.get();
            String filename = userId + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            usuario.setFotoCaminho("/uploads/" + filename);
            usuarioRepository.save(usuario);

            return ResponseEntity.ok("Profile image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile image");
        }
    }

    @GetMapping("/find/{usuarioId}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Integer usuarioId) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);
        if (usuarioOptional.isPresent()) {
            return ResponseEntity.ok(usuarioOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<String> checkUsernameExists(@RequestParam String username) {

        boolean exists = usuarioService.checkUsernameExists(username);

        if (exists) {
            return ResponseEntity.ok("Username já cadastrado!");
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username não cadastrado!");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username não cadastrado!");
    }

    @GetMapping("/check-email")
    public ResponseEntity<String> checkEmailExists(@RequestParam String email) {

        boolean exists = usuarioRepository.existsByEmail(email);
        if (exists) {
            return ResponseEntity.ok("Email já cadastrado!");
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
    }

    @GetMapping("/search")
    public List<Usuario> searchUsers(@RequestParam String query) {
        return usuarioRepository.findByNomeContaining(query);
    }

    @PutMapping("/update-username/{userId}/{newUsername}")
    public ResponseEntity<String> atualizarNomeUsuario(@PathVariable Long userId, @PathVariable String newUsername) {
        Optional<Usuario> optionalUser = usuarioRepository.findById(userId);
        Usuario usuario = new Usuario();
        if (optionalUser.isPresent() && !usuarioService.checkUsernameExists(newUsername)) {
            usuario = optionalUser.get();
            usuario.setUsername(newUsername);
            usuarioService.atualizarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.OK).body("Usuario atualizado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username em uso!");
        }
    }
    @PutMapping("/update-senha/{userId}")
    public ResponseEntity<?> atualizarSenha(@PathVariable Long userId, @RequestBody Map<String, String> passwords) {
        String senhaAtual = passwords.get("senhaAtual");
        String novaSenha = passwords.get("novaSenha");
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(userId);
        if (!optionalUsuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado!");
        }
        Usuario usuario = optionalUsuario.get();
        if (!passwordEncoder.matches(senhaAtual, usuario.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha atual não coincide!");
        }
        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Senha alterada com sucesso!");
    }

    @PutMapping("/inativar/{userId}")
    public ResponseEntity<?> inativarUsuario(@PathVariable Long userId) {
        return usuarioRepository.findById(userId).map(usuario -> {
            usuario.setAtivo(false);
            usuarioRepository.save(usuario);
            return ResponseEntity.ok().body("Conta inativada com sucesso!");
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
