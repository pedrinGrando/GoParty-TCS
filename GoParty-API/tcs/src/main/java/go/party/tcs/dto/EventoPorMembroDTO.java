package go.party.tcs.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventoPorMembroDTO {
  private String nomeMembro;
  private int qtdeEventosCriados;
}