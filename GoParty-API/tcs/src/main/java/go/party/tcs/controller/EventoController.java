package go.party.tcs.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import go.party.tcs.model.*;
import go.party.tcs.repository.*;
import go.party.tcs.service.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.dto.EventoDTO;
import go.party.tcs.service.ComentarioService;
import go.party.tcs.service.CurtidaService;
import go.party.tcs.service.EventoService;

@RestController
@RequestMapping("/v1/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @Autowired
    private CurtidaService curtidaService;

    @PostMapping("/criar-evento/{userId}")
    public ResponseEntity<?> cadastrarEvento(@PathVariable Long userId, @RequestBody Evento evento) {
        try {
            evento = eventoService.cadastrarEvento(userId, evento);
            return ResponseEntity.ok(Map.of("id", evento.getId(), "mensagem", "Evento criado com sucesso"));
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (RuntimeException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar evento.");
        }
    }

    @PutMapping("/upload-event-image/{eventoId}")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long eventoId,
                                                     @RequestParam("file") MultipartFile file) {
        try {
            eventoService.uploadEventImage(eventoId, file);
            return ResponseEntity.ok("Event image uploaded successfully");
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload event image");
        }
    }

    @GetMapping("/count-by-usuario/{usuarioId}")
    public ResponseEntity<Integer> countEventosByUsuarioId(@PathVariable Long usuarioId) {
        int numberOfEvents = eventoService.countEventosByUsuarioId(usuarioId);
        return ResponseEntity.ok(numberOfEvents);
    }

    @GetMapping("/buscar-eventos")
    public List<EventoDTO> getAllEventosAtivos() {
        return eventoService.getEventosAtivos();
    }

    @GetMapping("/count-likes-by-usuario/{usuarioId}")
    public ResponseEntity<Integer> countCurtidasByUsuarioId(@PathVariable Long usuarioId) {
        int numberOfLikes = curtidaService.countCurtidasByUsuarioId(usuarioId);
        return ResponseEntity.ok(numberOfLikes);
    }

    @GetMapping("/buscar-evento/{eventoId}")
    public ResponseEntity<?> buscarEventoPeloId(@PathVariable Long eventoId) {
       try {
           return ResponseEntity.ok(eventoService.buscarEventoPorId(eventoId));
       } catch (AppException exception) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
       }
    }

    @GetMapping("/buscar-por-usuario/{userId}")
    public ResponseEntity<?> buscarEventoPorUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(eventoService.buscarEventoPorUserId(userId));
    }

    @GetMapping("/buscar-por-formatura/{formaturaId}")
    public ResponseEntity<List<EventoDTO>> buscarEventosPorFormaturaId(@PathVariable Long formaturaId) {
        return ResponseEntity.ok(eventoService.buscarEventosPorFormaturaId(formaturaId));
    }

    @GetMapping("/consultar-eventos")
    public List<EventoDTO> searchEventos(@RequestParam(required = false) String search) {
        return eventoService.searchEventos(search);
    }

    @PutMapping("/inativar-evento/{userId}/{eventoId}")
    public ResponseEntity<?> inativarEvento(@PathVariable Long userId, @PathVariable Long eventoId) {
        try {
            eventoService.inativarEvento(userId, eventoId);
            return ResponseEntity.ok("Evento inativado com sucesso!");
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PutMapping("/atualizar-evento/{eventoId}")
    public ResponseEntity<?> atualizarEvento(@PathVariable Long eventoId, @RequestBody EventoDTO eventoDTO) {
        try {
            return ResponseEntity.ok(eventoService.atualizarEvento(eventoId, eventoDTO));
        } catch (AppException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @GetMapping("/find-comments/{eventoId}")
    public ResponseEntity<?> getComentariosByEventoId(@PathVariable Long eventoId) {
        try {
            return ResponseEntity.ok(eventoService.getComentariosByEventoId(eventoId));
        } catch (AppException exception) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(exception.getMessage());
        }
   }

    @PostMapping("/comment/{text}")
    public ResponseEntity<?> comment(@RequestParam Long eventoId, @RequestParam Long autorId, @PathVariable String text) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(eventoService.comment(eventoId, autorId, text));
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao adicionar comentário");
        }
    }

    @GetMapping("/isLiked/{eventoId}/{userId}")
    public ResponseEntity<Boolean> isEventoCurtido(@PathVariable Long eventoId, @PathVariable Long userId) {
        return ResponseEntity.ok(eventoService.isEventoCurtido(eventoId, userId));
    }

    @PostMapping("/like/{eventoId}/{usuarioId}")
    public ResponseEntity<String> likeEvent(@PathVariable Long eventoId, @PathVariable Long usuarioId) {
        try {
            eventoService.likeEvent(eventoId, usuarioId);
            return ResponseEntity.ok("Evento curtido com sucesso");
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @DeleteMapping("/like/{eventoId}/{usuarioId}")
    @Transactional
    public ResponseEntity<String> unlikeEvent(@PathVariable Long eventoId, @PathVariable Long usuarioId) {
        try {
            eventoService.unlikeEvent(eventoId, usuarioId);
            return ResponseEntity.ok("Evento descurtido com sucesso!");
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/top10Curtidas")
    public List<EventoDTO> getTop10EventosComMaisCurtidas() {
        return eventoService.findTop10EventosComMaisCurtidas();
    }
}
