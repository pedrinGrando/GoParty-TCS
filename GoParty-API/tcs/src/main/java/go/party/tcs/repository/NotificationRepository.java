package go.party.tcs.repository;

import java.util.List;

import go.party.tcs.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import go.party.tcs.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT n FROM Notification n WHERE n.usuario.id = :userId AND n.tipoNotificacao IS NOT NULL ORDER BY n.date DESC")
    List<Notification> findByUsuarioIdWithTipoNotificacaoNotNullOrderByDateDesc(@Param("userId") Long userId);
    @Transactional
    @Modifying
    @Query("UPDATE Notification n SET n.visualizado = true WHERE n.usuario.id = :userId AND n.visualizado = false")
    void markNotificationsAsVisualized(@Param("userId") Long userId);
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.visualizado = false AND n.usuario.id = :userId")
    int countByVisualizadoFalseAndUsuarioId(@Param("userId") Long userId);
    void deleteByUsuarioId(Long userId);
}

