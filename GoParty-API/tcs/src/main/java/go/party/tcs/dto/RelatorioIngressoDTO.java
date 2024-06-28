package go.party.tcs.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
// * Relação entre Usuario, Formatura, Evento e Ingresso
public class RelatorioIngressoDTO {
  private List<RelatorioIngressoDTO> ingressoPorEvento;
}
