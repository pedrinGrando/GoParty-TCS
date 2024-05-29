package go.party.tcs.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import go.party.tcs.dto.NotificationResponseDTO;
import go.party.tcs.repository.UsuarioRepository;
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

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void createNotification(String message, Long userId, NotificationType notificationType){
        User user = this.isPresent(usuarioRepository.findById(userId));
        Notification notification = this.createNotificationInstance(message, user, notificationType);
        notificationRepository.save(notification);
    }

    public void markNotificationsAsVisualized(Long user) {
        notificationRepository.markNotificationsAsVisualized(user);
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

    public List<NotificationResponseDTO> getNotificationByUser(Long userId) {
        User user = this.isPresent(usuarioRepository.findById(userId));
        List<Notification> notifications = notificationRepository.findByUserAndVisualizedIsFalse(user);
        List<NotificationResponseDTO> notificationsResponse = this.convertNotificationListToDTO(notifications);
        return notificationsResponse;
    }

    private <T> T isPresent(Optional<T> object) {
        if (object.isPresent()) {
            return object.get();
        }
        return null;
    }

    private List<NotificationResponseDTO> convertNotificationListToDTO(List<Notification> notifications) {
        List<NotificationResponseDTO> notificationResponseDTOs = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResponseDTOs.add(this.convertNotificationToNotificationDTO(notification));
        }
        return notificationResponseDTOs;
    }

    private NotificationResponseDTO convertNotificationToNotificationDTO(Notification notification) {
        return new NotificationResponseDTO(
                notification.getId(),
                notification.getMessage(),
                notification.getNotificationDate(),
                notification.getUser().getId(),
                notification.isVisualized()
        );
    }
}
