package go.party.tcs.controller;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.IngressoPorEventoDTO;
import go.party.tcs.repository.IngressoPorEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.dto.RelatorioEventoPorMembroDTO;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/v1/relatorio")
public class RelatoriosController {

    @Autowired
    IngressoPorEventoRepository ingressoPorEventoRepository;

    @GetMapping("/ingresso")
    public ResponseEntity<List<IngressoPorEventoDTO>> ingresso(
            @RequestParam(required = true) Long idFormatura,
            @RequestParam(required = false) Long idEvento,
            @RequestParam(required = false) String status) {
        TipoStatus tipoStatus = TipoStatus.valueOf(status);
        return ResponseEntity.ok(ingressoPorEventoRepository.findIngressosPorEvento(idFormatura, idEvento, tipoStatus));
    }
    // * Listar: Quantidade de evento por integrante.
    @GetMapping("/relatorio-evento-por-membro")
    public RelatorioEventoPorMembroDTO eventoPorMembro(@RequestParam Long idFormatura,
                                  @RequestParam(required = false) String membroFormatura, 
                                  @RequestParam(required = false) LocalDate dataInicio,
                                  @RequestParam(required = false) LocalDate dataFim) {

        return new RelatorioEventoPorMembroDTO();
    }
}



// Relatório de criação de evento por membrxo.
// Membro e data.

