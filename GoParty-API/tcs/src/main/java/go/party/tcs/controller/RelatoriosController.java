package go.party.tcs.controller;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.EventoPorMembroDTO;
import go.party.tcs.dto.IngressoPorEventoDTO;
import go.party.tcs.repository.EventoPorMembroRepository;
import go.party.tcs.repository.IngressoPorEventoRepository;
import go.party.tcs.service.EventoPorMembroService;
import go.party.tcs.service.IngressoPorEventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.dto.RelatorioEventoPorMembroDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/v1/relatorio")
public class RelatoriosController {

    @Autowired
    IngressoPorEventoService ingressoPorEventoService;

    @Autowired
    EventoPorMembroService eventoPorMembroService;

    @GetMapping("/ingresso")
    public ResponseEntity<List<IngressoPorEventoDTO>> ingresso(
            @RequestParam Long idFormatura,
            @RequestParam int pagina,
            @RequestParam int qtdItens,
            @RequestParam(required = false) Long idEvento,
            @RequestParam(required = false) String status) {
        TipoStatus tipoStatus = status != null ? TipoStatus.valueOf(status) : null;
        List<IngressoPorEventoDTO> relatorios = ingressoPorEventoService.gerarRelatorio(idFormatura, idEvento, tipoStatus, PageRequest.of(pagina, qtdItens));
        return ResponseEntity.ok(relatorios);
    }
    
    @GetMapping("/relatorio-evento-por-membro")
    public ResponseEntity<List<EventoPorMembroDTO>> eventoPorMembro(@RequestParam Long idFormatura,
                                                                    @RequestParam int pagina,
                                                                    @RequestParam int qtdItens,
                                                                  @RequestParam(required = false) LocalDate dataInicio,
                                                                  @RequestParam(required = false) LocalDate dataFim) {
        List<EventoPorMembroDTO> relatorio = eventoPorMembroService.gerarRelatorio(idFormatura, dataInicio, dataFim, PageRequest.of(pagina, qtdItens));
        return ResponseEntity.ok(relatorio);
    }
}
