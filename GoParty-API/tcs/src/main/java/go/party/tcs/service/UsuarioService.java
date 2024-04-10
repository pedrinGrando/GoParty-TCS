package go.party.tcs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public void cadastrarUsuario(Usuario usuario) {
          //Regra de permissao
         usuario.setTipoUsuario(TipoUsuario.USER);
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
    
    public Usuario findByUsuario(String usuarioNome){
        return usuarioRepository.findByNome(usuarioNome);
    }

    public Usuario encontrarId(Integer userId){
        return usuarioRepository.getById(userId);
    }

    public String getUsernameById(Integer id) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            return usuario.getUsername();
        } else {
            // Lide com o caso em que o usuário não foi encontrado (lançar exceção ou retornar um valor padrão)
            return "Usuário não encontrado";
        }
    }

    public boolean emailExiste(String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        return usuario.isPresent();
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado para o email: " + email));
    }

     public Usuario getUserById(Integer userId) {
        Optional<Usuario> userOptional = usuarioRepository.findById(userId);

        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            // Você pode tratar o caso em que o usuário não é encontrado, por exemplo, lançando uma exceção.
            return null;
        }

    }

    public boolean checkUsernameExists(String username) {
        return usuarioRepository.existsByUsername(username);
    }

   
}

