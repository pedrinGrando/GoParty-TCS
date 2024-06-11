package go.party.tcs.repository;

import go.party.tcs.dto.EventoPorMembroDTO;
import go.party.tcs.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface EventoPorMembroRepository extends JpaRepository<Evento, Long> {

    @Query("SELECT EventoPorMembroDTO(u.nome, " +
            "COUNT(DISTINCT e.id), " +
            "COALESCE(SUM(e.ingressosVendidos), 0), " +
            "COALESCE(SUM(e.ingressosVendidos * e.valor), 0)) " +
            "FROM Evento e " +
            "JOIN e.usuario u " +
            "WHERE e.formatura = COALESCE(:formaturaId, e.formatura) AND " +
            "e.dataEvento BETWEEN COALESCE(:dataInicio, (SELECT MIN(e.dataEvento) FROM Evento e)), COALESCE(:dataFim, CURRENT_DATE) " +
            "GROUP BY u.nome")
    List<EventoPorMembroDTO> findEventosPorMembro(Long formaturaId, LocalDate dataInicio, LocalDate dataFim);


}
