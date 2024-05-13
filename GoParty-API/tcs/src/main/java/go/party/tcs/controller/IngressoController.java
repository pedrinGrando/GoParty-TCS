package go.party.tcs.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import org.springframework.web.server.ResponseStatusException;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.EventoDTO;
import go.party.tcs.dto.IngressoDTO;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Ingresso;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.IngressoRepository;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.IngressoService;

@RestController
@RequestMapping("/v1/ingressos")
public class IngressoController {

    @Autowired
    EventoRepository eventoRepository;

    @Autowired
    IngressoService ingressoService;

    @Autowired
    private IngressoRepository ingressoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/comprar-ingresso")
    public ResponseEntity<?> criarIngresso(@RequestParam Long userId, @RequestBody EventoDTO eventoDTO) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        Evento evento = eventoRepository.findById(eventoDTO.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado"));

        if (evento.isEsgotado()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ingressos para este evento estão esgotados");
        }

        evento.setIngressosVendidos(evento.getIngressosVendidos() + 1);

        if (evento.getIngressosVendidos() >= evento.getQntIngressos()) {
            evento.setEsgotado(true);
        }

        eventoRepository.save(evento);

        Ingresso ingresso = new Ingresso();
        ingresso.setAutor(usuario);
        ingresso.setEvento(evento);
        ingresso.setStatus(TipoStatus.PENDENTE);
        ingresso.setDataCompra(LocalDateTime.now());
        ingresso.setCodigoEvento(Ingresso.gerarCodigoAleatorio());

        Ingresso savedIngresso = ingressoRepository.save(ingresso);

        IngressoDTO ingressoDTO = new IngressoDTO();
        ingressoDTO.setId(savedIngresso.getId());
        ingressoDTO.setCodigoEvento(savedIngresso.getCodigoEvento());
        ingressoDTO.setStatus(savedIngresso.getStatus().toString());
        ingressoDTO.setNomeUsuario(savedIngresso.getAutor().getNome());
        ingressoDTO.setNomeEvento(evento.getTitulo());
        ingressoDTO.setDataCompra(savedIngresso.getDataCompra());

        return ResponseEntity.status(HttpStatus.CREATED).body(ingressoDTO);
    }

    @GetMapping("/seus-ingressos/{usuarioId}")
    public ResponseEntity<List<IngressoDTO>> listarIngressosDoUsuario(@PathVariable Long usuarioId) {
        try {
            List<Ingresso> ingressos = ingressoRepository.findByAutorId(usuarioId);
            if (ingressos.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            List<IngressoDTO> ingressosDTO = ingressos.stream()
                    .map(ingresso -> new IngressoDTO(
                            ingresso.getId(),
                            ingresso.getCodigoEvento(),
                            ingresso.getStatus().toString(),
                            ingresso.getAutor().getNome(),
                            ingresso.getEvento().getTitulo(),
                            ingresso.getDataCompra()))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(ingressosDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
