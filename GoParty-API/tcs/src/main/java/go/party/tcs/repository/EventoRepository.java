package go.party.tcs.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;
import jakarta.transaction.Transactional;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
    List<Evento> findByAutorId(Integer userId);

    @Transactional
    void deleteByAutor(Usuario autor);

    Evento findById(Long id);
}
