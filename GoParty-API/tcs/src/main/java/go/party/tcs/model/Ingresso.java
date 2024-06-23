package go.party.tcs.model;

import java.time.LocalDateTime;
import java.util.UUID;

import go.party.tcs.Enums.TipoStatus;
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
@Table (name = "ingresso")
public class Ingresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario autor;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;

    @Column(name = "codigoEvento")
    private String codigoEvento;
     
    @Enumerated(EnumType.STRING)
    private TipoStatus status;

    @Column(name = "dataCompra")
    private LocalDateTime dataCompra;

    public Ingresso(Usuario autor, Evento evento) {
        this.autor = autor;
        this.evento = evento;
        this.status = TipoStatus.PAGO;
        this.dataCompra = LocalDateTime.now();
        this.codigoEvento = gerarCodigoAleatorio();
    }

    public static String gerarCodigoAleatorio() {
        return UUID.randomUUID().toString().replaceAll("[^a-zA-Z0-9]", "").substring(0, 10);
    }
    
}