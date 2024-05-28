package go.party.tcs.dto;

import go.party.tcs.model.Comentario;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDTO {
    private Long id;
    private String texto;
    private Long autorId;
    private Long eventoId;
    private String autorCaminho;

    public CommentDTO(Comentario comentario) {
        this.id = comentario.getId();
        this.texto = comentario.getTexto();
        this.autorId = comentario.getAutor().getId();
        this.eventoId = comentario.getEvento().getId();
    }
}