package go.party.tcs.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "evento")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "estado")
    private String estado;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "valor")
    private String valor;

    @Column(name = "horario")
    private String horario;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Usuario autor;

    @Lob
    @Column(name = "foto_evento", columnDefinition = "LONGBLOB")
    private byte[] fotoEvento;

    @ManyToOne
    @JoinColumn(name = "comentario_id")
    private Comentario comentario;

    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL)
    private List<Comentario> comentarios = new ArrayList<>();

    @OneToMany(mappedBy = "evento")
    private List<Curtida> curtidas;

    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingresso> ingressos;


    // Construtor com parâmetros
    public Evento(String titulo, String descricao, Usuario autor, String valor, String horario) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.autor = autor;
        this.valor = valor;
        this.horario = horario;
    }
    
}
