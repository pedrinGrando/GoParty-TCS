package go.party.tcs.repository;

import go.party.tcs.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.model.Invite;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InviteRepository extends JpaRepository<Invite, Long> {

    @Query("SELECT i FROM invite i WHERE i.usuario.id = :userId AND i.accept = false AND i.rejectDate IS NULL")
    List<Invite> findPendingInvitesByUserId(@Param("userId") Long userId);
}