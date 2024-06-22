package go.party.tcs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.model.Usuario;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.formatura.id = :formaturaId")
    long countUsersByFormaturaId(@Param("formaturaId") Long formaturaId);

    List<Usuario> findByAtivoTrue();

    List<Usuario> findByAtivoTrueAndTipoUsuario(TipoUsuario tipoUsuario);

    @Query("SELECT u FROM Usuario u WHERE u.ativo = true AND u.tipoUsuario = :tipoUsuario AND LOWER(u.nome) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Usuario> findActiveStudentsBySearchTerm(@Param("tipoUsuario") TipoUsuario tipoUsuario, @Param("search") String search);

    Usuario findByNome(String nome);

    boolean existsByEmail(String email);

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findById(Long id);

    List<Usuario> findByNomeContaining(String query);

    UserDetails findByUsername(String username);

    boolean existsByUsername(String username);

    void deleteById(Long userId);

}
