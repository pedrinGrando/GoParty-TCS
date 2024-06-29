package go.party.tcs.projection;

import java.math.BigDecimal;

public interface EventoPorMembroProjection {

    String getNome();
    Long getQuantidadeEventosCriados();
    Long getTotalIngressosVendidos();
    BigDecimal getValorArrecadadoTotal();
}
