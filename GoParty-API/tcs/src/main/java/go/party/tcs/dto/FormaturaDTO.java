package go.party.tcs.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class FormaturaDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private String formaturaCaminho;
    private String cidade;
    private String estado;
    private LocalDateTime rua;
    private double arrecad;
    private String nomeUsuario;
}
