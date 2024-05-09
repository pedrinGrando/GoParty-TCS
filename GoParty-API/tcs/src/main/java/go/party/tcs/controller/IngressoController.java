package go.party.tcs.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.EventoDTO;
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

    // Endpoint para criar um ingresso
    @PostMapping("/comprar-ingresso")
    public ResponseEntity<?> criarIngresso(@RequestParam Long userId, @RequestBody EventoDTO eventoDTO) {
        try {
            Optional<Usuario> userOptional = usuarioRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
            }
            Optional<Evento> eventoOptional = eventoRepository.findById(eventoDTO.getId());
            if (!eventoOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado.");
            }

            Usuario usuario = userOptional.get();
            Evento evento = eventoOptional.get();

            Ingresso ingresso = new Ingresso();
            ingresso.setAutor(usuario);
            ingresso.setEvento(evento);
            ingresso.setStatus(TipoStatus.PENDENTE);
            ingresso.setDataCompra(LocalDateTime.now());
            ingresso.setCodigoEvento(Ingresso.gerarCodigoAleatorio());
            ingressoRepository.save(ingresso);

            return ResponseEntity.status(HttpStatus.CREATED).body(ingresso);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar ingresso: " + e.getMessage());
        }
    }

    @GetMapping("/seus-ingressos/{usuarioId}")
    public ResponseEntity<List<Ingresso>> listarIngressosDoUsuario(@PathVariable Long usuarioId) {
        try {
            List<Ingresso> ingressos = ingressoRepository.findByAutorId(usuarioId);
            if (ingressos.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(ingressos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
