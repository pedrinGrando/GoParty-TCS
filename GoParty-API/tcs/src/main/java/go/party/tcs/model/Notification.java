package go.party.tcs.model;

import java.time.LocalDateTime;

import go.party.tcs.Enums.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "notification")
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "notificatio_type")
    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @Column(name = "message")
    private String message;

    @Column(name = "notification_date")
    private LocalDateTime notificationDate;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "visualized")
    private boolean visualized;

    public Notification(String message, LocalDateTime notificationDate, User user, boolean visualized, NotificationType notificationType) {
        this.message = message;
        this.notificationDate = notificationDate;
        this.user = user;
        this.visualized = visualized;
        this.notificationType = notificationType;
    }
}
