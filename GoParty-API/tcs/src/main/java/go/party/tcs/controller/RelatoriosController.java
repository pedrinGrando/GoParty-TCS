package go.party.tcs.controller;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.ResponseRelatorio;
import go.party.tcs.model.AppException;
import go.party.tcs.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/v1/relatorio")
public class RelatoriosController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/ingresso")
    public ResponseEntity<ResponseRelatorio> ingresso(
            @RequestParam Long idFormatura,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int qtdItens,
            @RequestParam(required = false) String nomeEvento,
            @RequestParam(required = false) String status) {
        TipoStatus tipoStatus = status != null ? TipoStatus.valueOf(status.toUpperCase()) : null;
        ResponseRelatorio relatorios = relatorioService.gerarRelatorioIngressoPorEvento(idFormatura, nomeEvento, tipoStatus, PageRequest.of(pagina, qtdItens));
        return ResponseEntity.ok(relatorios);
    }
    
    @GetMapping("/relatorio-evento-por-membro")
    public ResponseEntity<?> eventoPorMembro(@RequestParam Long idFormatura,
                                                             @RequestParam(defaultValue = "0") int pagina,
                                                             @RequestParam(defaultValue = "10") int qtdItens,
                                                             @RequestParam(required = false) LocalDate dataInicio,
                                                             @RequestParam(required = false) LocalDate dataFim) {
        try {
            ResponseRelatorio relatorio = relatorioService.gerarRelatorioEventoPorMembro(idFormatura, dataInicio, dataFim, PageRequest.of(pagina, qtdItens));
            return ResponseEntity.ok(relatorio);
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
