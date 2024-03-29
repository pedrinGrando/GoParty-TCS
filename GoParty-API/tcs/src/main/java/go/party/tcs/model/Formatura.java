package go.party.tcs.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
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
@Table(name = "formatura")
public class Formatura {

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

    @Column(name = "meta_arrecad")
    private String valor;

    @Column(name = "data_prevista")
    private LocalDate dataPrevista;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario adm;

    @Lob
    @Column(name = "foto_formatura", columnDefinition = "LONGBLOB")
    private byte[] fotoEvento;

    @ManyToMany
    @JoinTable(name = "formatura_grupo",
               joinColumns = @JoinColumn(name = "formatura_id"),
               inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    private Set<Usuario> grupo = new HashSet<>();
}
