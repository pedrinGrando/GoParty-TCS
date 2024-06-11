package go.party.tcs.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventoPorMembroDTO {
  private String nome;
  private Long quantidadeEventosCriados;
  private Long totalIngressosVendidos;
  private BigDecimal valorArrecadadoTotal;
}