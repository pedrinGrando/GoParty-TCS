package go.party.tcs.dto;

import java.time.LocalDateTime;

import go.party.tcs.Enums.TipoNotificacao;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
public class NotificationDTO {
    private Long id;
    private TipoNotificacao tipoNotificacao;
    private String message;
    private boolean visualizado;
    private String notificationMoment;

    public NotificationDTO() {
    }

    public NotificationDTO(Long id, TipoNotificacao tipoNotificacao, String message, boolean visualizado, String notificationMoment) {
        this.id = id;
        this.tipoNotificacao = tipoNotificacao;
        this.message = message;
        this.visualizado = visualizado;
        this.notificationMoment = notificationMoment;
    }
}
