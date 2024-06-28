package go.party.tcs.projection;

import go.party.tcs.Enums.TipoStatus;

import java.time.LocalDateTime;

public interface IngressoPorEventoProjection {

    Long getCodigoIngresso();
    LocalDateTime getDataCompra();
    String getComprador();
    String getNomeEvento();
    TipoStatus getStatus();
}
