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
import jakarta.persistence.Lob;
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
    private Integer id;

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

    @Column(name = "url")
    private String url;

    @Column(name = "senha")
    private String senha;

    @Lob
    @Column(name = "fotoPerfil", columnDefinition = "LONGBLOB")
    private byte[] fotoPerfil;

    //SEGUIDORES E SEGUINDO
    private int seguidores;

    private int seguindo;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] chavePrivada;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] chavePublica;

    public byte[] getChavePrivada() {
        return chavePrivada;
    }

    public void setChavePrivada(byte[] chavePrivada) {
        this.chavePrivada = chavePrivada;
    }

    public byte[] getChavePublica() {
        return chavePublica;
    }

    public void setChavePublica(byte[] chavePublica) {
        this.chavePublica = chavePublica;
    }
    
    //METODO PARA VERIFICAR SE EXISTE FOTO DE PERFIL
    public boolean temImagemPerfil() {
        return fotoPerfil != null && fotoPerfil.length > 0;
    }
  
}
