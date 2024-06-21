package go.party.tcs.repository;

import go.party.tcs.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.model.Invite;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InviteRepository extends JpaRepository<Invite, Long> {

    List<Invite> findByUsuarioId(Long userId);
}