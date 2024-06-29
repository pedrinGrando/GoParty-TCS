package go.party.tcs.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import go.party.tcs.model.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UsuarioService {

    @Value("${file.upload-dir}")
    private String uploadDir;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void cadastrarUsuario(Usuario usuario, TipoUsuario tipoUsuario) {
         usuario.setTipoUsuario(tipoUsuario);
         usuarioRepository.save(usuario);
    }

    public void uploadProfileImage(Long userId, MultipartFile file) throws IOException {
        Usuario usuario = usuarioRepository.findById(userId).orElseThrow(() -> new AppException("Usuario não encontrado!"));
        String filename = usuario.getId() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(this.uploadDir, filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        usuario.setFotoCaminho("/uploads/" + filename);
        usuarioRepository.save(usuario);
    }

    public Usuario buscarUsuarioPorId(Long id) throws AppException {
        return usuarioRepository.findById(id).orElseThrow(() -> new AppException("Usuario não encontrado"));
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }
    public void atualizaUsername(Long id, String username) throws AppException{
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new AppException("Usuario não encontrado"));
        if (this.checkUsernameExists(username)) {
            throw new AppException("Username em uso!");
        }
        usuario.setUsername(username);
        this.saveUser(usuario);
    }

    public boolean existsByCpf(String cpf) {
        return usuarioRepository.existsByCpf(cpf);
    }

    public void atualizarSenha(Long userId, Map<String, String> senhas) throws AppException {
        Usuario usuario = usuarioRepository.findById(userId).orElseThrow(() -> new AppException("Usuario não encontrado!"));
        String atual = senhas.get("senhaAtual");
        String nova = senhas.get("novaSenha");
        if(!passwordEncoder.matches(atual, usuario.getPassword())) {
            throw new AppException("Senha atual não coincide!");
        }
        usuario.setSenha(passwordEncoder.encode(nova));
        this.saveUser(usuario);
    }

    public void saveUser(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public List<UsuarioDTO> getUsuariosAtivosEstudantes() {
        List<Usuario> usuarios = usuarioRepository.findByAtivoTrueAndTipoUsuario(TipoUsuario.STUDENT);
        return usuarios.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<UsuarioDTO> searchActiveStudentsByTerm(String search) {
        List<Usuario> usuarios = usuarioRepository.findActiveStudentsBySearchTerm(TipoUsuario.STUDENT, search);
        return usuarios.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private UsuarioDTO convertToDTO(Usuario usuario) {
        return new UsuarioDTO(
            usuario.getId(),
            usuario.getNome(),
            usuario.getUsername(),
            usuario.getFotoCaminho(),
            usuario.getTipoUsuario()
        );
    }

    public boolean checkUsernameExists(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    public void inativarUsuario(Long id) throws AppException {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new AppException("Usuario não encontrado!"));
        usuario.setAtivo(false);
        this.saveUser(usuario);
    }

    public Usuario findById(Long id) throws AppException {
        return usuarioRepository.findById(id).orElseThrow(() -> new AppException("Usuario não encontrado!"));
    }

}

