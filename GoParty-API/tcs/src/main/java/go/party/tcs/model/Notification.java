package go.party.tcs.model;

import java.time.LocalDateTime;

import go.party.tcs.Enums.TipoNotificacao;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private TipoNotificacao tipoNotificacao;
    private String message;
    private LocalDateTime date;
    private Long userId; // O ID do usuário que receberá a notificação
    private Boolean visualizado;
}

