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

    @Query(nativeQuery = true, value = "SELECT "+
            "u.nome AS nome, " +
            " COUNT(DISTINCT e.id) AS quantidadeEventosCriados, "+
    "COUNT(i.id) AS totalIngressosVendidos, " +
    "count(i.id)  * e.valor AS valorArrecadadoTotal "+
    "FROM " +
    "usuarios u " +
    "LEFT JOIN evento e ON e.usuario_id = u.id AND e.formatura_id = :formaturaId " +
    "LEFT JOIN ingresso i ON i.evento_id = e.id " +
     "       WHERE " +
    "e.formatura_id = :formaturaId " +
    "AND e.data_postagem BETWEEN COALESCE(:dataInicio, (SELECT MIN(data_postagem) FROM evento)) " +
    "AND COALESCE(:dataFim, (SELECT MAX(data_postagem) FROM evento)) " +
    "GROUP BY " +
    "u.nome, " +
    "e.valor " +
    "ORDER BY " +
    "MAX(e.data_postagem) DESC;")
    Page<EventoPorMembroProjection> findEventosPorMembro(@Param("formaturaId") Long formaturaId, @Param("dataInicio") LocalDate dataInicio, @Param("dataFim") LocalDate dataFim, Pageable pageable);

}
