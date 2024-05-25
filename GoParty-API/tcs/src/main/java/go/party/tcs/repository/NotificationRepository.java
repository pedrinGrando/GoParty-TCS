package go.party.tcs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import go.party.tcs.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByUserId(Long userId);

    int countByUserIdAndVisualizadoFalse(Integer userId);

    @Query("SELECT n FROM Notification n WHERE n.userId = :userId ORDER BY n.date DESC")
    List<Notification> findNotificationsByUserIdOrderByDateDesc(@Param("userId") Integer userId);

    Notification findById(Integer id);

    @Transactional
    @Modifying
    @Query("UPDATE notification n SET n.visualized = TRUE WHERE n.userId = :userId AND visualized = FALSE")
    int updateVisualizedByUserId(Long userId);
}