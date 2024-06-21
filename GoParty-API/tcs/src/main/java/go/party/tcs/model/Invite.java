package go.party.tcs.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "invite")
@Table(name = "invite")
public class Invite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "invite_date")
    private LocalDateTime inviteDate;

    @ManyToOne
    @JoinColumn(name = "formatura_id", nullable = false)
    private Formatura formatura;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "accept")
    private boolean accept;

    @Column(name = "accept_date")
    private LocalDateTime acceptDate;

    @Column(name = "reject_date")
    private LocalDateTime rejectDate;
}