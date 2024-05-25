package go.party.tcs.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.Enums.UserType;
import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.model.User;
import go.party.tcs.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public void cadastrarUsuario(User usuario) {
          //Regra de permissao
         usuario.setUserType(UserType.BASIC);
         usuarioRepository.save(usuario);
    }

    public void cadastrarUsuarioEstudante(User usuario) {  
        //Regra de permissao
        usuario.setUserType(UserType.STUDENT);
        usuarioRepository.save(usuario);
       }

    public void atualizarUsuario(User usuario){
        usuarioRepository.save(usuario);
    }

    public List<User> findAll(){
        return usuarioRepository.findAll();
    }

    public List<UsuarioDTO> getUsuariosAtivosEstudantes() {
        return usuarioRepository.findByEnabledTrueAndUserType(UserType.STUDENT).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UsuarioDTO convertToDTO(User usuario) {
        return new UsuarioDTO(
            usuario.getId(),
            usuario.getName(),
            usuario.getUsername(),
            usuario.getFotoCaminho(),
            usuario.getUserType()
        );
    }
    
    public User findByUsuario(String usuarioNome){
        return usuarioRepository.findByName(usuarioNome);
    }

    public User encontrarId(Integer userId){
        return usuarioRepository.getById(userId);
    }

    public boolean emailExiste(String email) {
        Optional<User> usuario = usuarioRepository.findByEmail(email);
        return usuario.isPresent();
    }

    public User buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado para o email: " + email));
    }

    public boolean checkUsernameExists(String username) {
        return usuarioRepository.existsByUsername(username);
    }
   
}

