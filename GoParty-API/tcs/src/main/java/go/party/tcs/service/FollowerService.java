package go.party.tcs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Follower;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.FollowerRepository;

@Service
public class FollowerService {

    @Autowired
    private FollowerRepository followerRepository;

    @Autowired
    private UsuarioService usuarioService;

    public List<Follower> obterSeguidores(Integer userId) {
        // Aqui, você deve chamar o método do repositório para buscar os seguidores com base no ID do usuário.
        return followerRepository.findByFollowerId(userId);
    }

     public boolean isUserInFollowersList(Usuario userToCheck, Usuario user) {
        List<Usuario> followers = usuarioService.getFollowers(user);
    
        for (Usuario follower : followers) {
            if (follower.getId().equals(userToCheck.getId())) {
                return true;
            }
        }
    
        return false;
    }
    
}
