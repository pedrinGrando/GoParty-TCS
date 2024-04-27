package go.party.tcs.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UsuarioDTO {
    private Long id;
    private String nome;
    private String username;
    private String usuarioCaminho;
}
