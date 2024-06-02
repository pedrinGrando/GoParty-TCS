package go.party.tcs.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.dto.RelatorioEventoPorMembroDTO;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/v1/relatorio")
public class RelatoriosController {
    // * Listar: Código ingresso, data da compra, nome do comprador e nome do evento. Por default, trazer ingressos que tem status = pago.
    @GetMapping("/ingresso")
    public RelatorioEventoPorMembroDTO ingresso(@RequestParam Long idFormatura,
                          @RequestParam(required = false) LocalDate dataInicio,
                          @RequestParam(required = false) LocalDate dataFim,
                          @RequestParam(required = false) double valorIngresso,
                          @RequestParam(required = false) Long idEvento) {
        return new RelatorioEventoPorMembroDTO();
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



// Relatório de criação de evento por membro.
// Membro e data.

