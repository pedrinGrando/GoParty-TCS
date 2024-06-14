package go.party.tcs.repository;

import go.party.tcs.model.Evento;
import go.party.tcs.projection.EventoPorMembroProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface EventoPorMembroRepository extends JpaRepository<Evento, Long> {

    @Query(nativeQuery = true, value = "SELECT " +
            "    u.nome AS nome, " +
            "    COUNT(e.id) AS quantidadeEventosCriados, " +
            "    SUM(e.qnt_ingressos) AS totalIngressosVendidos, " +
            "    SUM(e.valor) AS valorArrecadadoTotal " +
            "FROM " +
            "    evento e " +
            "    left JOIN usuarios u ON " +
            "    e.user_id = u.id " +
            "WHERE " +
            "    e.formatura_id = (:formaturaId) AND " +
            "    e.data_evento between COALESCE((:dataInicio), (select min(data_evento) from evento)) and COALESCE((:dataFim), (select max(data_evento) from evento)) " +
            "GROUP BY " +
            "    u.nome, " +
            "    e.data_evento " +
            "ORDER BY " +
            "    e.data_evento DESC")
    List<EventoPorMembroProjection> findEventosPorMembro(@Param("formaturaId") Long formaturaId, @Param("dataInicio") LocalDate dataInicio, @Param("dataFim") LocalDate dataFim);

}
