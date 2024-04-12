package go.party.tcs.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Notification;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.NotificationRepository;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(String message, Integer userId, byte[] fotoPerfil) {
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setDate(LocalDateTime.now()); 
        notification.setUserId(userId);
        notification.setVisualizado(false);
        notification.setFotoPerfil(fotoPerfil);
        notificationRepository.save(notification);

    }

    public void marcarNotificacoesComoVisualizadas(Integer userId) {
        List<Notification> notificacoes = notificationRepository.findByUserId(userId);
        for (Notification notification : notificacoes) {
            notification.setVisualizado(true);
        }
        notificationRepository.saveAll(notificacoes);
    }

    public int contarNotificacoesNaoVisualizadas(Integer userId) {
        return notificationRepository.countByUserIdAndVisualizadoFalse(userId);
    }

    public Optional<Notification> findById(Long id) {
        return notificationRepository.findById(id);
    }

    // METODO PARA CALCULAR O TEMPO DA ANOTIFICAÇÃO
    public String calcularTempoDecorrido(LocalDateTime notificationDate) {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(notificationDate, now);

        long segundos = duration.toSeconds();
        if (segundos < 60){
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

    //LIMPAR AS NOTIFICACOES DO USUARIO
    public void apagarTodasNotificacoes(Usuario user) {
        // Certifique-se de que o usuário não é nulo.
        if (user != null) {
            // Encontre todas as notificações associadas a esse usuário.
            //List<Notification> userNotifications = notificationRepository.findByUserId(user.getId());

            // Apague as notificações encontradas.
            //notificationRepository.deleteAll(userNotifications);
        }
    }

    //LIMPAR AS NOTIFICACOES POR ID 
    public void excluirNotificacao(Long id) {
        notificationRepository.deleteById(id);
    }

    }

