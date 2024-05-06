package go.party.tcs.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import go.party.tcs.Enums.TipoNotificacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Notification;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.NotificationRepository;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(String message, Long userId) {
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setDate(LocalDateTime.now());
        notification.setUserId(userId);
        notification.setVisualizado(false);
        notificationRepository.save(notification);
    }

    public void criarNotificacaoCurtida(String message, Long userId){
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setDate(LocalDateTime.now());
        notification.setUserId(userId);
        notification.setTipoNotificacao(TipoNotificacao.CURTIDA);
        notification.setVisualizado(false);
        notificationRepository.save(notification);
    }

    public void criarNotificacaoComentario(String message, Long userId){
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setDate(LocalDateTime.now());
        notification.setUserId(userId);
        notification.setTipoNotificacao(TipoNotificacao.COMENTARIO);
        notification.setVisualizado(false);
        notificationRepository.save(notification);
    }

    public void criarNotificacaoCompra(String message, Long userId){
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setDate(LocalDateTime.now());
        notification.setUserId(userId);
        notification.setVisualizado(false);
        notification.setTipoNotificacao(TipoNotificacao.COMPRA);
        notificationRepository.save(notification);
    }

    // METODO PARA CALCULAR O TEMPO DA A NOTIFICAÇÃO
    public String calcularTempoDecorrido(LocalDateTime notificationDate) {
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

}
