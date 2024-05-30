package go.party.tcs.repository;

import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import go.party.tcs.model.Curtida;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;

@Repository
public interface CurtidaRepository extends JpaRepository<Curtida, Long> {
    // Método para buscar uma curtida por evento e usuário
    Curtida findByEventoAndUsuario(Evento evento, Usuario usuario);

    long countByEvento(Evento evento);

    int countByEventoId(Long eventoId);

    void deleteByUsuarioAndEvento(Usuario usuario, Evento evento);

    @Query("SELECT c FROM Curtida c WHERE c.usuario = :usuario AND c.evento = :evento")
    Curtida findByUsuarioAndEvento(@Param("usuario") Usuario usuario, @Param("evento") Evento evento);

    @Query("SELECT COUNT(c) FROM Curtida c WHERE c.evento.id = :eventoId")
    int quantidadeCurtidasPorEvento(@Param("eventoId") Integer eventoId);

    boolean existsByEventoIdAndUsuarioId(Long eventoId, Long usuarioId);
}