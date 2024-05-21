package go.party.tcs.model;

import java.time.LocalDateTime;

import go.party.tcs.Enums.NotificationType;
import jakarta.persistence.Column;
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
    @Column(name = "notificatio_type")
    private NotificationType notificationType;
    @Column(name = "message")
    private String message;
    @Column(name = "notification_date")
    private LocalDateTime notificationDate;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "visualized")
    private Boolean visualized;

    public Notification(String message, LocalDateTime notificationDate, Long userId, boolean visualized, NotificationType notificationType) {
        this.message = message;
        this.notificationDate = notificationDate;
        this.userId = userId;
        this.visualized = visualized;
        this.notificationType = notificationType;
    }
}

