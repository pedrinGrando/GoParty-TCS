package go.party.tcs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.Enums.UserType;
import go.party.tcs.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<User, Long> {

    List<User> findByEnabledTrue();

    List<User> findByEnabledTrueAndUserType(UserType userType);

    User findByName(String nome);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    List<User> findByNameContaining(String query);

    UserDetails findByUsername(String username);

    boolean existsByUsername(String username);

}
