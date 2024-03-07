package go.party.tcs.model;

import java.util.UUID;

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
    @Column(name = "id")
    private Integer id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "cpfComprador")
    private String cpfComprador;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario idUsuario;

    @ManyToOne
    @JoinColumn(name = "id_evento")
    private Evento evento;

    // Construtores, getters e setters...
    public Ingresso(String codigo, Usuario idUsuario, Evento evento, String cpfComprador, String status) {
        this.codigo = codigo;
        this.idUsuario = idUsuario;
        this.evento = evento;
        this.cpfComprador = cpfComprador;
        this.status = status;
    }

    public static String gerarCodigoAleatorio() {
        // Gerando um UUID aleatório e pegando os 10 primeiros caracteres
        String uuid = UUID.randomUUID().toString().replaceAll("[^a-zA-Z0-9]", "").substring(0, 10);
        return uuid;
    }
}
