package go.party.tcs.dto;

import java.time.LocalDateTime;

import go.party.tcs.Enums.TipoNotificacao;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NotificationDTO {
    private Long id;
    private TipoNotificacao tipoNotificacao;
    private String message;
    private LocalDateTime date;
    private boolean visualizado;
}
