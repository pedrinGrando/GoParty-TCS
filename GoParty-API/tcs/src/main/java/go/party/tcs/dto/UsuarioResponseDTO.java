package go.party.tcs.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import go.party.tcs.Enums.UserType;

public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String username;
    private String email;
    private LocalDate idade;
    private UserType userType;
    private String cpf;
    private String fotoCaminho;
    private LocalDateTime dataCadastro;

    public UsuarioResponseDTO(Long id, String nome, String username, String email, LocalDate idade,
                              UserType userType, String cpf, String fotoCaminho,
                              LocalDateTime dataCadastro) {
        this.id = id;
        this.nome = nome;
        this.username = username;
        this.email = email;
        this.idade = idade;
        this.userType = userType;
        this.cpf = cpf;
        this.fotoCaminho = fotoCaminho;
        this.dataCadastro = dataCadastro;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public LocalDate getIdade() { return idade; }
    public void setIdade(LocalDate idade) { this.idade = idade; }
    public UserType getTipoUsuario() { return userType; }
    public void setTipoUsuario(UserType tipoUsuario) { this.userType = tipoUsuario; }
    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }
    public String getFotoCaminho() { return fotoCaminho; }
    public void setFotoCaminho(String fotoCaminho) { this.fotoCaminho = fotoCaminho; }
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
}
