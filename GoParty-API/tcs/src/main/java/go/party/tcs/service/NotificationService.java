package go.party.tcs.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import go.party.tcs.Enums.TipoNotificacao;
import go.party.tcs.dto.NotificationDTO;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Notification;
import go.party.tcs.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Notification addNotification(String message, Long userId, TipoNotificacao notificationType, String fotoCaminho) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(userId);
        if (!usuarioOptional.isPresent()) {
            throw new IllegalArgumentException("Usuário não encontrado com o ID: " + userId);
        }
        Usuario usuario = usuarioOptional.get();

        Notification notification = new Notification();
        notification.setDate(LocalDateTime.now());
        notification.setMessage(message);
        notification.setTipoNotificacao(notificationType);
        notification.setUsuario(usuario);
        notification.setVisualizado(false);
        notification.setFotoCaminho(fotoCaminho);

        return notificationRepository.save(notification);
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

    public List<NotificationDTO> getNotificationByUser(Long userId) {
        Usuario user = this.isPresent(usuarioRepository.findById(userId));
        List<Notification> notifications = notificationRepository.findByUsuarioIdOrderByDateDesc(user.getId());
        List<NotificationDTO> notificationsResponse = this.convertNotificationListToDTO(notifications);
        return notificationsResponse;
    }

    private <T> T isPresent(Optional<T> object) {
        if (object.isPresent()) {
            return object.get();
        }
        return null;
    }

    private List<NotificationDTO> convertNotificationListToDTO(List<Notification> notifications) {
        List<NotificationDTO> notificationResponseDTOs = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResponseDTOs.add(this.convertNotificationToNotificationDTO(notification));
        }
        return notificationResponseDTOs;
    }

    private NotificationDTO convertNotificationToNotificationDTO(Notification notification) {
        return new NotificationDTO(
                notification.getId(),
                notification.getTipoNotificacao(),
                notification.getMessage(),
                notification.getVisualizado(),
                calculateNotificationTimeExistence(notification.getDate()),
                notification.getFotoCaminho()
        );
    }

}
