package go.party.tcs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    
}
