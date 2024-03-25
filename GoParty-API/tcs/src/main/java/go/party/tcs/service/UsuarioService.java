package go.party.tcs.service;

import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import go.party.tcs.config.RSAKeyGenerator;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public void cadastrarUsuario(Usuario usuario) throws java.security.NoSuchProviderException {
       
       try {
            KeyPair keyPair = RSAKeyGenerator.generateKeyPair();
            byte[] chavePublica = keyPair.getPublic().getEncoded();
            byte[] chavePrivada = keyPair.getPrivate().getEncoded();

            usuario.setChavePublica(chavePublica);
            usuario.setChavePrivada(chavePrivada);

             usuarioRepository.save(usuario);

        } catch (NoSuchAlgorithmException | NoSuchProviderException e) {
            // Trate exceções adequadamente
            e.printStackTrace();
        }
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

    public Usuario findByUsername(String username){

        Optional<Usuario> usuarioOptional = usuarioRepository.findByUsername(username);

        Usuario usuario = usuarioOptional.get(); 

        if (usuario != null && usuario.getUsername().equals(username)){
            return usuario;
        } else {
            return null;
        } 
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
        // Verifica se o username existe no banco de dados
        Optional<Usuario> userOptional = usuarioRepository.findByUsername(username);
        return userOptional.isPresent();
    }
   
}

