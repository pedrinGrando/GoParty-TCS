package go.party.tcs.controller;

import go.party.tcs.model.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.dto.EventoDTO;
import go.party.tcs.dto.IngressoDTO;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.service.IngressoService;

@RestController
@RequestMapping("/v1/ingressos")
public class IngressoController {

    @Autowired
    EventoRepository eventoRepository;

    @Autowired
    IngressoService ingressoService;

    @PostMapping("/comprar-ingresso")
    public ResponseEntity<?> criarIngresso(@RequestParam Long userId, @RequestBody EventoDTO eventoDTO) {
        try {
            IngressoDTO ingressoDTO = ingressoService.criarIngresso(userId, eventoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(ingressoDTO);
        } catch (AppException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    @GetMapping("/seus-ingressos/{usuarioId}")
    public ResponseEntity<?> listarIngressosDoUsuario(@PathVariable Long usuarioId) {
        try {
            return ResponseEntity.ok(ingressoService.listarIngressosDoUsuario(usuarioId));
        } catch (AppException exception) {
            return ResponseEntity.internalServerError().body(exception.getMessage());
        }
    }

    @GetMapping("/count-by-usuario/{usuarioId}")
    public ResponseEntity<Integer> countIngressosByUsuarioId(@PathVariable Long usuarioId) {
        int numberOfTickets = ingressoService.countIngressosByUsuarioId(usuarioId);
        return ResponseEntity.ok(numberOfTickets);
    }

}
