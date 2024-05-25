package go.party.tcs.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.Enums.NotificationType;
import go.party.tcs.model.Notification;
import go.party.tcs.model.User;
import go.party.tcs.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(String message, Long userId, NotificationType notificationType){
        User user = new User(userId);
        Notification notification = this.createNotificationInstance(message, user, notificationType);
        notificationRepository.save(notification);
    }

    public void changeVisualization(Long userId) {
        notificationRepository.updateVisualizedByUserId(userId);
    }

    public String calculateNotificationTimeExistence(LocalDateTime notificationDate) {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(notificationDate, now);

        long segundos = duration.toSeconds();
        if (segundos < 60) {
            return "agora";
        }

        long minutes = duration.toMinutes();
        if (minutes < 60) {
            return minutes + " min";
        }

        long hours = duration.toHours();
        if (hours < 24) {
            return hours + " h";
        }

        long days = duration.toDays();
        return days + " d";
    }

    private Notification createNotificationInstance(String message, User userId, NotificationType notificationType) {
        return new Notification(
            message,
            LocalDateTime.now(),
            userId,
            false,
            notificationType
        );
    }

    public List<Notification> getNotificationByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }
}
