package go.party.tcs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.model.Invite;
import org.springframework.stereotype.Repository;

@Repository
public interface InviteRepository extends JpaRepository<Invite, Long> {
    
}
