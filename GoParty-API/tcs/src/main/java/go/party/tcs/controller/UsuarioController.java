package go.party.tcs.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import go.party.tcs.model.AppException;
import go.party.tcs.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.model.Usuario;
import go.party.tcs.service.UsuarioService;

@RestController
@RequestMapping("/v1/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/{userId}/upload-profile-image")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long userId,
                                                     @RequestParam("file") MultipartFile file) {
        try {
            usuarioService.uploadProfileImage(userId, file);
            return ResponseEntity.ok("Profile image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile image");
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/find/{usuarioId}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Long usuarioId) {
        try {
            return ResponseEntity.ok(usuarioService.buscarUsuarioPorId(usuarioId));
        } catch(AppException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<String> checkUsernameExists(@RequestParam String username) {
        if (usuarioService.checkUsernameExists(username)) {
            return ResponseEntity.ok("Username já cadastrado!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username não cadastrado!");
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<String> checkEmailExists(@RequestParam String email) {
        if (usuarioService.existsByEmail(email)) {
            return ResponseEntity.ok("Email já cadastrado!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
        }
    }

    @GetMapping("/check-cpf")
    public ResponseEntity<Boolean> checkCpf(@RequestParam String cpf) {
        boolean exists = usuarioService.existsByCpf(cpf);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/ativos-estudantes")
    public ResponseEntity<List<UsuarioDTO>> findAllStudentsAtive(
            @RequestParam(value = "search", required = false) String search) {

        List<UsuarioDTO> ativeStudents;
        if (search == null || search.isEmpty()) {
            ativeStudents = usuarioService.getUsuariosAtivosEstudantes();
        } else {
            ativeStudents = usuarioService.searchActiveStudentsByTerm(search);
        }
        return ResponseEntity.ok(ativeStudents);
    }
    
    @GetMapping("/search")
    public List<Usuario> searchUsers(@RequestParam String query) {
        return usuarioRepository.findByNomeContaining(query);
    }

    @PutMapping("/update-username/{userId}/{newUsername}")
    public ResponseEntity<String> atualizarNomeUsuario(@PathVariable Long userId, @PathVariable String newUsername) {
        try {
            usuarioService.atualizaUsername(userId, newUsername);
            return ResponseEntity.status(HttpStatus.OK).body("Usuario atualizado com sucesso!");
        } catch (AppException exception){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exception.getMessage());
        }
    }

    @PutMapping("/update-senha/{userId}")
    public ResponseEntity<?> atualizarSenha(@PathVariable Long userId, @RequestBody Map<String, String> passwords) {
        try {
            usuarioService.atualizarSenha(userId, passwords);
            return ResponseEntity.ok("Senha alterada com sucesso!");
        } catch (AppException exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PutMapping("/inativar/{userId}")
    public ResponseEntity<?> inativarUsuario(@PathVariable Long userId) {
        try {
            usuarioService.inativarUsuario(userId);
            return ResponseEntity.ok().body("Conta inativada com sucesso!");
        } catch (AppException exception) {
            return ResponseEntity.notFound().build();
        }
    }
}
