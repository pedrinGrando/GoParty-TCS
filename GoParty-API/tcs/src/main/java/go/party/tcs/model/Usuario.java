package go.party.tcs.model;

import java.time.LocalDate;

import go.party.tcs.Enums.TipoUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name ="usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "idade")
    private LocalDate idade;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "fotoCaminho")
    private String fotoCaminho;

    @Column(name = "senha")
    private String senha;
  
}
