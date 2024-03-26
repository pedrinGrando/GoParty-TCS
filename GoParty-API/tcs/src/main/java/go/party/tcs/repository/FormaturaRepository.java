package go.party.tcs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.model.Formatura;

public interface FormaturaRepository extends JpaRepository<Formatura, Long> {
    
}
