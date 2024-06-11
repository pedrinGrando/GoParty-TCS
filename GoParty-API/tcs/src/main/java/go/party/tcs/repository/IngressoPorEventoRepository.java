package go.party.tcs.repository;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.IngressoPorEventoDTO;
import go.party.tcs.model.Ingresso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IngressoPorEventoRepository extends JpaRepository<Ingresso, Long> {

    @Query("SELECT IngressoPorEventoDTO(" +
            "i.id, " +
            "i.dataCompra, " +
            "u.nome, " +
            "e.titulo, " +
            "i.status) " +
            "FROM Ingresso i " +
            "JOIN i.autor u " +
            "JOIN i.evento e " +
            "WHERE e.formatura = COALESCE(:formaturaId, e.formatura) AND " +
            "e.id = COALESCE(:eventoId, e.id) AND " +
            "i.status = COALESCE(:status, i.status) " +
            "ORDER BY i.dataCompra DESC")
    List<IngressoPorEventoDTO> findIngressosPorEvento(@Param("formaturaId") Long formaturaId, @Param("eventoId") Long eventoId, @Param("status") TipoStatus status);
}
