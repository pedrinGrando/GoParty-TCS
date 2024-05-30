package go.party.tcs.model;

import java.time.LocalDateTime;

import go.party.tcs.Enums.TipoNotificacao;
import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario; // O usuário que receberá a notificação

    private String fotoCaminho; // autor

    private Boolean visualizado;
}