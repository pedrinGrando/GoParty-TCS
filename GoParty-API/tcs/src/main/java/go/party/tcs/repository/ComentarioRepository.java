package go.party.tcs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.model.Comentario;
import go.party.tcs.model.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    List<Comentario> findByEventoIdOrderByCommentMomentDesc(Long eventoId);

    @Transactional
    void deleteByAutor(Usuario sessionUsuario);

    int countByEventoId(Long eventoId);
}
