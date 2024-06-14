package go.party.tcs.dto;

import java.time.LocalDateTime;

import go.party.tcs.Enums.TipoStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IngressoPorEventoDTO {
  private Long codigoIngresso;
  private LocalDateTime dataCompra;
  private String nomeComprador;
  private String nomeEvento;
  private TipoStatus status;
}
