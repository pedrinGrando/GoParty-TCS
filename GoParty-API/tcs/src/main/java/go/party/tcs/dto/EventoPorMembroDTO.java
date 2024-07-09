package go.party.tcs.dto;

import go.party.tcs.projection.EventoPorMembroProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventoPorMembroDTO {
  private String nome;
  private Long quantidadeEventosCriados;
  private Long totalIngressosVendidos;
  private String valorArrecadadoTotal;

  public static EventoPorMembroDTO convertProjection(EventoPorMembroProjection projection) {
    return new EventoPorMembroDTO(
            projection.getNome(),
            projection.getQuantidadeEventosCriados(),
            projection.getTotalIngressosVendidos(),
            formatarParaReais(projection.getValorArrecadadoTotal())
    );
  }

  private static String formatarParaReais(BigDecimal valor) {
    NumberFormat formatoBrasil = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
    return formatoBrasil.format(valor);
  }
}