package go.party.tcs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import go.party.tcs.dto.EventoDTO;
import go.party.tcs.model.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    List<Evento> findByUsuarioId(Long userId);

    List<Evento> findByAtivoTrueAndEsgotadoFalse();

    List<Evento> findByFormaturaId(Long formaturaId);

    Optional<Evento> findById(Long id);

    @Query("SELECT new go.party.tcs.dto.EventoDTO(e.id, e.ativo, e.titulo, e.descricao, e.eventoCaminho, e.cidade, e.estado, e.dataEvento, e.valor, e.qntIngressos, e.rua, e.bairro, e.cep, e.esgotado, e.formatura.titulo, 0, 0) "
            +
            "FROM Evento e WHERE (lower(e.titulo) LIKE lower(concat('%', :search, '%')) OR lower(e.descricao) LIKE lower(concat('%', :search, '%'))) AND e.ativo = true")
    List<EventoDTO> findByTituloOrDescricaoContainingIgnoreCase(String search);

    Long countByFormaturaId(Long id);
}
