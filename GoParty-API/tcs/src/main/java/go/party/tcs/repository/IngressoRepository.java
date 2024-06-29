package go.party.tcs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import go.party.tcs.model.Ingresso;

public interface IngressoRepository  extends JpaRepository<Ingresso, Long>{

    @Query("SELECT COUNT(i) FROM Ingresso i WHERE i.autor.id = :usuarioId")
    int countByUsuarioId(@Param("usuarioId") Long usuarioId);

    List<Ingresso> findByAutorId(Long usuarioId);

    List<Ingresso> findByEventoId(Long eventoId);

}
