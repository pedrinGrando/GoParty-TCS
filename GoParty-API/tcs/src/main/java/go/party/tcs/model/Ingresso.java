package go.party.tcs.model;

import java.time.LocalDateTime;
import java.util.UUID;

import go.party.tcs.Enums.TipoStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table (name = "ingresso")
public class Ingresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User autor;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;

    @Column(name = "codigoEvento")
    private String codigoEvento;
     
    @Column(name = "status")
    private TipoStatus status;

    @Column(name = "dataCompra")
    private LocalDateTime dataCompra;

    public static String gerarCodigoAleatorio() {
        String uuid = UUID.randomUUID().toString().replaceAll("[^a-zA-Z0-9]", "").substring(0, 10);
        return uuid;
    }
    
}