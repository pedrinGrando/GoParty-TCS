package go.party.tcs.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// * Relação entre Usuário, Formatura e Evento.
public class RelatorioEventoPorMembroDTO {
  private List<EventoPorMembroDTO> eventoPorMembro;
}