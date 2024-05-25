package go.party.tcs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.model.Comentario;
import go.party.tcs.model.User;
import jakarta.transaction.Transactional;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    List<Comentario> findByEventoId(Integer eventoId);

    @Transactional
    void deleteByAutor(User sessionUsuario);
}
