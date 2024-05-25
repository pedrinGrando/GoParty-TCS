package go.party.tcs.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "formatura")
public class Formatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ativo")
    private boolean ativo = true;

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

    @Column(name = "cep")
    private String cep;

    @Column(name = "meta_arrecad")
    private double metaArrecad;

    @Column(name = "arrecacado")
    private double arrecacado;

    @Column(name = "chave_pix")
    private String chavePix;

    @Column(name = "data_prevista")
    private LocalDate dataPrevista;

    @Column(name = "data_solicitacao")
    private LocalDateTime dataSolicitacao;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User adm;

    @Column(name = "formatura_caminho")
    private String formaturaCaminho;

    @Column(name = "matricula_caminho")
    private String matriculaCaminho;

    @OneToMany(mappedBy = "formatura", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> usuarios;

    @OneToMany(mappedBy = "formatura", cascade = CascadeType.ALL)
    private List<Evento> eventos;
}
