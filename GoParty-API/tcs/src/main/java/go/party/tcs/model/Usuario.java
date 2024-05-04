package go.party.tcs.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import go.party.tcs.Enums.TipoUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name ="usuarios")
public class Usuario implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ativo")
    private boolean ativo = true; 

    @Column(name = "nome")
    private String nome;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "idade")
    private LocalDate idade;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    @Column(name = "cpf", unique = true, nullable = false)
    private String cpf;

    @Column(name = "fotoCaminho")
    private String fotoCaminho;

    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;

    @Column(name = "senha")
    private String senha;

    @ManyToOne
    @JoinColumn(name = "formatura_id")
    private Formatura formatura;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.tipoUsuario == TipoUsuario.ADM) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADM"));
        }
        if(this.tipoUsuario == TipoUsuario.MEMBER) {
            return List.of(new SimpleGrantedAuthority("ROLE_MEMBER"));
        }
        else {
            return List.of(new SimpleGrantedAuthority("ROLE_BASIC"));
        }
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
  
}
