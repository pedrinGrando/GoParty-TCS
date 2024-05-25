package go.party.tcs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.Enums.UserType;
import go.party.tcs.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<User, Integer> {

    List<User> findByEnabledTrue();

    List<User> findByEnabledTrueAndUserType(UserType userType);

    User findByName(String nome);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    List<User> findByNameContaining(String query);

    UserDetails findByUsername(String username);

    boolean existsByUsername(String username);

    void deleteById(Long userId);

}
