package go.party.tcs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import go.party.tcs.model.Curtida;
import go.party.tcs.model.Evento;
import go.party.tcs.model.User;

@Repository
public interface CurtidaRepository extends JpaRepository<Curtida, Long> {
    // Método para buscar uma curtida por evento e usuário
    Curtida findByEventoAndUser(Evento evento, User user);

    long countByEvento(Evento evento);

    void deleteByUserAndEvento(User user, Evento evento);

    @Query("SELECT c FROM Curtida c WHERE c.user = :user AND c.evento = :evento")
    Curtida findByUserAndEvento(@Param("user") User user, @Param("evento") Evento evento);

    @Query("SELECT COUNT(c) FROM Curtida c WHERE c.evento.id = :eventoId")
    int quantidadeCurtidasPorEvento(@Param("eventoId") Integer eventoId);
}