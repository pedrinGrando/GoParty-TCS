package go.party.tcs.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import go.party.tcs.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.model.User;
import go.party.tcs.service.UsuarioService;

@RestController
@RequestMapping("/v1/usuarios")
@CrossOrigin(origins = "http://localhost:5173/")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${file.upload-dir}")
    private String uploadDir;

    User usuarioCadastro = new User();

    User usuarioPerfilVisitado = new User();

    @PostMapping("/{userId}/upload-profile-image")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {

        try {
            Optional<User> userOptional = usuarioRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            User usuario = userOptional.get();
            String filename = userId + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            usuario.setPhotoPath("/uploads/" + filename);
            usuarioRepository.save(usuario);

            return ResponseEntity.ok("Profile image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile image");
        }
    }

    @GetMapping("/find/{usuarioId}")
    public ResponseEntity<User> buscarUsuarioPorId(@PathVariable Long usuarioId) {
        Optional<User> usuarioOptional = usuarioRepository.findById(usuarioId);
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

    @GetMapping("/ativos-estudantes")
    public ResponseEntity<List<UsuarioDTO>> findAllStudentsAtive() {
        List<UsuarioDTO> ativeStudensUsers = usuarioService.getUsuariosAtivosEstudantes();
        return ResponseEntity.ok(ativeStudensUsers);
    }
    
    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String query) {
        return usuarioRepository.findByNameContaining(query);
    }

    @PutMapping("/update-username/{userId}/{newUsername}")
    public ResponseEntity<String> atualizarNomeUsuario(@PathVariable Long userId, @PathVariable String newUsername) {
        Optional<User> optionalUser = usuarioRepository.findById(userId);
        User usuario = new User();
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
        Optional<User> optionalUsuario = usuarioRepository.findById(userId);
        if (!optionalUsuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado!");
        }
        User usuario = optionalUsuario.get();
        if (!passwordEncoder.matches(senhaAtual, usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha atual não coincide!");
        }
        usuario.setPassword(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Senha alterada com sucesso!");
    }

    @PutMapping("/inativar/{userId}")
    public ResponseEntity<?> inativarUsuario(@PathVariable Long userId) {
        return usuarioRepository.findById(userId).map(usuario -> {
            usuario.setEnabled(false);
            usuarioRepository.save(usuario);
            return ResponseEntity.ok().body("Conta inativada com sucesso!");
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
