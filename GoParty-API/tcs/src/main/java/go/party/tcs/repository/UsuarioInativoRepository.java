package go.party.tcs.repository;

import java.util.List;
import java.util.Optional;

import go.party.tcs.model.UsuarioInativo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import go.party.tcs.model.Usuario;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioInativoRepository extends JpaRepository<UsuarioInativo, Long> {


}
