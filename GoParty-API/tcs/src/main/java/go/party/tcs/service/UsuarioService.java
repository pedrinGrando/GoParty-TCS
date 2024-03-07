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
import go.party.tcs.model.Follower;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.FollowerRepository;
import go.party.tcs.repository.UsuarioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FollowerRepository followerRepository;

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

    //TESTE DE SEGUIDORES NO SISTEMA
    public void follow(Usuario follower, Usuario following) {
        // Verifique se o usuário já está seguindo o outro usuário
        Follower existingFollower = followerRepository.findByFollowerAndFollowing(follower, following);

        if (existingFollower == null) {
            // Se não existir uma relação de seguidor, crie uma nova
            Follower newFollower = new Follower();
            newFollower.setFollower(follower);
            newFollower.setFollowing(following);
            followerRepository.save(newFollower);
        } 
    }

    public void unfollow(Usuario follower, Usuario following) {
        // Verifique se o usuário está seguindo o outro usuário
        Follower existingFollower = followerRepository.findByFollowerAndFollowing(follower, following);

        if (existingFollower != null) {
            // Se existir uma relação de seguidor, remova-a
            followerRepository.delete(existingFollower);
        }
    }
    

    //OBTER NUMEROS DE SEGUIDORES 
    public List<Usuario> getFollowers(Usuario user) {
        // Obtenha os seguidores do usuário
        List<Follower> followers = followerRepository.findByFollowing(user);

        List<Usuario> followerUsers = followers.stream()
            .map(Follower::getFollower)
            .collect(Collectors.toList());

        return followerUsers;
    }

    // Obtenha quem o usuário está seguindo
    public List<Usuario> getFollowing(Usuario user) {
        
        List<Follower> following = followerRepository.findByFollower(user);

        List<Usuario> followingUsers = following.stream()
            .map(Follower::getFollowing)
            .collect(Collectors.toList());

        return followingUsers;
    }

    public int getFollowersCount(Usuario user) {
        List<Usuario> followers = getFollowers(user);
        return followers.size();
    }

    public int getFollowingCount(Usuario user) {
        List<Usuario> following = getFollowing(user);
        return following.size();
    }

    public boolean checkUsernameExists(String username) {
        // Verifica se o username existe no banco de dados
        Optional<Usuario> userOptional = usuarioRepository.findByUsername(username);
        return userOptional.isPresent();
    }
   
}

