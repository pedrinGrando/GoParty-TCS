package go.party.tcs.dto;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.projection.IngressoPorEventoProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IngressoPorEventoDTO {
  private Long codigoIngresso;
  private String dataCompra;
  private String nomeComprador;
  private String nomeEvento;
  private TipoStatus status;

  public static IngressoPorEventoDTO convertProjection(IngressoPorEventoProjection projection) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
    return new IngressoPorEventoDTO(
            projection.getCodigoIngresso(),
            formatter.format(projection.getDataCompra()),
            projection.getComprador(),
            projection.getNomeEvento(),
            projection.getStatus()
    );
  }
}
