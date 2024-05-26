package go.party.tcs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import go.party.tcs.model.Notification;
import go.party.tcs.model.User;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByUser(User userId);

    int countByUserAndVisualizedFalse(User userId);

    List<Notification> findByUserOrderByNotificationDateDesc(User user);

    Notification findById(Integer id);

    @Transactional
    @Modifying
    @Query("UPDATE notification n SET n.visualized = true WHERE n.user.id = :userId AND n.visualized = false")
    void markNotificationsAsVisualized(@Param("userId") Long userId);
}