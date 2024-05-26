package go.party.tcs.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "invite")
@Table(name = "invite")
public class Invite {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "invite_date")
    private LocalDateTime inviteDate;
    @OneToOne
    @JoinColumn(name = "formatura_id", nullable = false)
    private Formatura graduation;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Column(name = "accept")
    private boolean accept;
    @Column(name = "accept_date")
    private LocalDateTime acceptDate;

    public Invite(Long graduationId, Long studentId, LocalDateTime inviteDate) {
        this.graduation = new Formatura(graduationId);
        this.user = new User(studentId);
        this.inviteDate = inviteDate;
        this.accept = false;
    }

    public Invite(Long graduationId, Long studentId) {
        this.graduation = new Formatura(graduationId);
        this.user = new User(studentId);
    }
}
