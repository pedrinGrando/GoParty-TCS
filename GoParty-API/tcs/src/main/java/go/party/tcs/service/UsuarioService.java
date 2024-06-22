package go.party.tcs.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public void cadastrarUsuario(Usuario usuario) {
          //Regra de permissao
         usuario.setTipoUsuario(TipoUsuario.BASIC);
         usuarioRepository.save(usuario);
    }

    public void cadastrarUsuarioEstudante(Usuario usuario) {  
        //Regra de permissao
        usuario.setTipoUsuario(TipoUsuario.STUDENT);
        usuarioRepository.save(usuario);
       }

    public void atualizarUsuario(Usuario usuario){
        usuarioRepository.save(usuario);
    }

    public List<Usuario> findAll(){
        return usuarioRepository.findAll();
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
    
    public Usuario findByUsuario(String usuarioNome){
        return usuarioRepository.findByNome(usuarioNome);
    }

    public Usuario encontrarId(Integer userId){
        return usuarioRepository.getById(userId);
    }

    public boolean emailExiste(String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        return usuario.isPresent();
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado para o email: " + email));
    }

    public boolean checkUsernameExists(String username) {
        return usuarioRepository.existsByUsername(username);
    }
   
}

