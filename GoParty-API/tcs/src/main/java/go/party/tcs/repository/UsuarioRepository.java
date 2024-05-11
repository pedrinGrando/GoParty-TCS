package go.party.tcs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.model.Usuario;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    List<Usuario> findByAtivoTrue();

    List<Usuario> findByAtivoTrueAndTipoUsuario(TipoUsuario tipoUsuario);

    Usuario findByNome(String nome);

    boolean existsByEmail(String email);

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findById(Long id);

    List<Usuario> findByNomeContaining(String query);

    UserDetails findByUsername(String username);

    boolean existsByUsername(String username);

    void deleteById(Long userId);

}
