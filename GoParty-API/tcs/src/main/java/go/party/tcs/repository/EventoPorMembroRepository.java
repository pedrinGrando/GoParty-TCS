package go.party.tcs.repository;

import go.party.tcs.model.Evento;
import go.party.tcs.projection.EventoPorMembroProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface EventoPorMembroRepository extends JpaRepository<Evento, Long> {

    @Query(nativeQuery = true, value = "SELECT " +
            "    u.nome AS nome, " +
            "    COUNT(e.id) AS quantidadeEventosCriados, " +
            "    SUM(e.qnt_ingressos) AS totalIngressosVendidos, " +
            "    SUM(e.valor) AS valorArrecadadoTotal " +
            "FROM " +
            "    evento e " +
            "    inner JOIN usuarios u ON " +
            "    e.usuario_id = u.id " +
            "WHERE " +
            "    e.formatura_id = (:formaturaId) AND " +
            "    e.data_postagem between COALESCE((:dataInicio), (select min(data_postagem) from evento)) and COALESCE((:dataFim), (select max(data_postagem) from evento)) " +
            "GROUP BY " +
            "    u.nome " +
            "ORDER BY " +
            "    MAX(e.data_postagem) DESC")
    Page<EventoPorMembroProjection> findEventosPorMembro(@Param("formaturaId") Long formaturaId, @Param("dataInicio") LocalDate dataInicio, @Param("dataFim") LocalDate dataFim, Pageable pageable);

}
