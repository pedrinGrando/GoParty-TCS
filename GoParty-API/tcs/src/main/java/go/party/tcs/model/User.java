package go.party.tcs.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import go.party.tcs.Enums.UserType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name ="user_gp")
@Entity(name = "user_gp")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enabled")
    private boolean enabled; 

    @Column(name = "name")
    private String name;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Column(name = "cpf", unique = false, nullable = false)
    private String cpf;

    @Column(name = "photo_path")
    private String photoPath;

    @Column(name = "accept_date")
    private LocalDateTime acceptDate;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user")
    private List<Notification> notifications;

    @ManyToOne
    @JoinColumn(name = "formatura_id")
    private Formatura formatura;

    public User(Long id) {
        this.id = id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.userType == UserType.ADM) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADM"));
        }
        if(this.userType == UserType.MEMBER) {
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
        return this.password;
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
