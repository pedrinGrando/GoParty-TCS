package go.party.tcs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import go.party.tcs.model.Curtida;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;

import java.util.List;

@Repository
public interface CurtidaRepository extends JpaRepository<Curtida, Long> {

    long countByEvento(Evento evento);

    int countByEventoId(Long eventoId);

    void deleteByUsuarioAndEvento(Usuario usuario, Evento evento);

    @Query("SELECT c FROM Curtida c WHERE c.usuario = :usuario AND c.evento = :evento")
    Curtida findByUsuarioAndEvento(@Param("usuario") Usuario usuario, @Param("evento") Evento evento);

    @Query("SELECT COUNT(c) FROM Curtida c WHERE c.evento.id = :eventoId")
    int quantidadeCurtidasPorEvento(@Param("eventoId") Integer eventoId);

    boolean existsByEventoIdAndUsuarioId(Long eventoId, Long usuarioId);

    @Query("SELECT c.evento.id, COUNT(c) as totalCurtidas FROM Curtida c GROUP BY c.evento.id ORDER BY totalCurtidas DESC")
    List<Object[]> findTop10EventosMaisCurtidos();
}