package go.party.tcs.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import go.party.tcs.Enums.TipoNotificacao;
import go.party.tcs.dto.CommentDTO;
import go.party.tcs.model.*;
import go.party.tcs.repository.*;
import go.party.tcs.service.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.EventoDTO;
import go.party.tcs.service.ComentarioService;
import go.party.tcs.service.CurtidaService;
import go.party.tcs.service.EventoService;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/v1/eventos")
@CrossOrigin(origins = "http://localhost:5173/")
public class EventoController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EventoService eventoService;

    @Autowired
    private ComentarioService comentarioService;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private FormaturaRepository formaturaRepository;

    @Autowired
    private CurtidaService curtidaService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private IngressoRepository ingressoRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;
    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private CurtidaRepository curtidaRepository;

    // Método para Criar um Evento
    @PostMapping("/criar-evento/{userId}")
    public ResponseEntity<?> cadastrarEvento(@PathVariable Long userId, @RequestBody Evento evento) {
        try {

            // encontrar usuario que fez a postagem
            Optional<Usuario> userOptional = usuarioRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            Usuario usuarioAutor = userOptional.get();
            if (!usuarioAutor.getTipoUsuario().equals(TipoUsuario.MEMBER)
                    && !usuarioAutor.getTipoUsuario().equals(TipoUsuario.ADM)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não é membro!");
            } else {
                evento.setFormatura(usuarioAutor.getFormatura());
                evento.setUsuario(usuarioAutor);
                // Momento da Postagem
                evento.setDataPostagem(LocalDateTime.now());
                Evento eventoSalvo = eventoRepository.save(evento);
                return ResponseEntity.ok(Map.of("id", eventoSalvo.getId(), "mensagem", "Evento criado com sucesso"));
            }
        } catch (RuntimeException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar evento.");
        }
    }

    @PutMapping("/upload-event-image/{eventoId}")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long eventoId,
                                                     @RequestParam("file") MultipartFile file) {
        try {
            Optional<Evento> eventoOpcional = eventoRepository.findById(eventoId);
            if (!eventoOpcional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
            }

            Evento evento = eventoOpcional.get();
            String filename = eventoId + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            evento.setEventoCaminho("/uploads/" + filename);
            eventoRepository.save(evento);

            return ResponseEntity.ok("Event image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload event image");
        }
    }

    @GetMapping("/buscar-eventos")
    public List<EventoDTO> getAllEventosAtivos() {
        List<Evento> eventosAtivos = eventoRepository.findByAtivoTrueAndEsgotadoFalse();
        LocalDate now = LocalDate.now();
        eventosAtivos.forEach(evento -> {
            if (evento.getDataEvento().isBefore(now)) {
                evento.setDataExpiracao(now);
                eventoRepository.save(evento);
            }
        });

        return eventosAtivos.stream()
                .filter(evento -> evento.getDataEvento().isAfter(now))
                .map(evento -> {
                    int totalCurtidas = curtidaRepository.countByEventoId(evento.getId());
                    int totalComentarios = comentarioRepository.countByEventoId(evento.getId());
                    return new EventoDTO(evento, totalCurtidas, totalComentarios);
                })
                .collect(Collectors.toList());
    }

    // Id evento
    @GetMapping("/buscar-evento/{eventoId}")
    public ResponseEntity<?> buscarEventoPeloId(@PathVariable Long eventoId) {
        int totalCurtidas = curtidaRepository.countByEventoId(eventoId);
        int totalComentarios = comentarioRepository.countByEventoId(eventoId);
        return eventoRepository.findById(eventoId)
                .map(evento -> new ResponseEntity<>(new EventoDTO(evento, totalCurtidas, totalComentarios), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/buscar-por-usuario/{userId}")
    public ResponseEntity<?> buscarEventoPorUserId(@PathVariable Long userId) {
        Optional<Usuario> userOptional = usuarioRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Usuário não encontrado!");
        }

        List<Evento> eventos = eventoRepository.findByUsuarioId(userId);
        if (eventos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        int totalCurtidas = 0;
        int totalComentarios = 0;
        List<EventoDTO> eventosDTO = eventos.stream()
                .map(evento -> new EventoDTO(evento, totalCurtidas, totalComentarios))
                .collect(Collectors.toList());

        return ResponseEntity.ok(eventosDTO);
    }

    @GetMapping("/consultar-eventos")
    public List<EventoDTO> searchEventos(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return eventoRepository.findByTituloOrDescricaoContainingIgnoreCase(search);
        } else {
            return eventoRepository.findByAtivoTrueAndEsgotadoFalse().stream()
                    .map(e -> new EventoDTO(
                            e.getId(),
                            e.isAtivo(),
                            e.getTitulo(),
                            e.getDescricao(),
                            e.getEventoCaminho(),
                            e.getCidade(),
                            e.getEstado(),
                            e.getDataEvento(),
                            e.getValor(),
                            e.getQntIngressos(),
                            e.getRua(),
                            e.getBairro(),
                            e.getCep(),
                            e.isEsgotado(),
                            e.getFormatura().getTitulo(),
                            curtidaRepository.countByEventoId(e.getId()),
                            comentarioRepository.countByEventoId(e.getId())
                            ))
                    .collect(Collectors.toList());
        }
    }

    @PutMapping("/inativar-evento/{userId}/{eventoId}")
    public ResponseEntity<?> inativarEvento(@PathVariable Long userId, @PathVariable Long eventoId) {
        Optional<Usuario> userOptional = usuarioRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Usuário não encontrado!");
        }
        return eventoRepository.findById(eventoId)
                .map(evento -> {
                    if (!evento.getUsuario().getId().equals(userId)) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não criou este evento!");
                    }
                    if (!ingressoRepository.findByEventoId(evento.getId()).isEmpty()) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("Já existem ingressos comprados para este evento!");
                    }
                    evento.setAtivo(false);
                    evento.setDataExpiracao(LocalDate.now());
                    eventoRepository.save(evento);
                    return ResponseEntity.ok().body("Evento inativado com sucesso!");
                })
                .orElseGet(() -> ResponseEntity.badRequest().body("Evento não encontrado!"));
    }

    @PutMapping("/atualizar-evento/{eventoId}")
    public ResponseEntity<?> atualizarEvento(@PathVariable Long eventoId, @RequestBody EventoDTO eventoDTO) {
        return eventoRepository.findById(eventoId).map(evento -> {
            evento.setTitulo(eventoDTO.getTitulo());
            evento.setDescricao(eventoDTO.getDescricao());
            evento.setCep(eventoDTO.getCep());
            evento.setEstado(eventoDTO.getEstado());
            evento.setCidade(eventoDTO.getCidade());
            evento.setBairro(eventoDTO.getBairro());
            evento.setRua(eventoDTO.getRua());
            evento.setValor(eventoDTO.getValor());
            evento.setDataEvento(eventoDTO.getDataEvento());

            eventoRepository.save(evento);
            return ResponseEntity.ok(new EventoDTO(evento, eventoDTO.getTotalCurtidas(), eventoDTO.getTotalComentarios()));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/find-comments/{eventoId}")
    public ResponseEntity<List<CommentDTO>> getComentariosByEventoId(@PathVariable Long eventoId) {
        List<Comentario> comentarios = comentarioRepository.findByEventoIdOrderByCommentMomentDesc(eventoId);
        if (comentarios.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<CommentDTO> comentarioDTOs = comentarios.stream()
                .map(comentario -> new CommentDTO(
                        comentario.getId(),
                        comentario.getTexto(),
                        comentario.getAutor().getId(),
                        comentario.getEvento().getId(),
                        comentario.getAutor().getFotoCaminho(),
                        comentario.getAutor().getUsername(),
                        comentario.getCommentMoment() != null ? calculateTimeDifference(comentario.getCommentMoment()) : "Momento do comentário não disponível"
                ))
                .collect(Collectors.toList());
        return new ResponseEntity<>(comentarioDTOs, HttpStatus.OK);
    }

    @PostMapping("/comment/{text}")
    public ResponseEntity<?> comment(@RequestParam Long eventoId, @RequestParam Long autorId, @PathVariable String text) {
        try {
            Optional<Evento> eventoOptional = eventoRepository.findById(eventoId);
            if (!eventoOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado");
            }

            Optional<Usuario> usuarioOptional = usuarioRepository.findById(autorId);
            if (!usuarioOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
            }

            Comentario comentario = new Comentario();
            comentario.setTexto(text);
            comentario.setCommentMoment(LocalDateTime.now());
            comentario.setEvento(eventoOptional.get());
            comentario.setAutor(usuarioOptional.get());

            Evento evento = eventoOptional.get();
            Usuario usuario = usuarioOptional.get();

            comentarioRepository.save(comentario);
            notificationService.addNotification(
                    usuario.getUsername() + " comentou em seu evento: " + comentario.getTexto(),
                    evento.getUsuario().getId(),
                    TipoNotificacao.COMENTARIO,
                    comentario.getAutor().getFotoCaminho()
            );
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Comentário adicionado com sucesso!");
            response.put("comentario", new CommentDTO(  comentario.getId(),
                    comentario.getTexto(),
                    comentario.getAutor().getId(),
                    comentario.getEvento().getId(),
                    comentario.getAutor().getFotoCaminho(),
                    comentario.getAutor().getUsername(),
                    comentario.getCommentMoment() != null ? calculateTimeDifference(comentario.getCommentMoment()) : "Momento do comentário não disponível"));

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao adicionar comentário");
        }
    }

    @GetMapping("/isLiked/{eventoId}/{userId}")
    public ResponseEntity<Boolean> isEventoCurtido(@PathVariable Long eventoId, @PathVariable Long userId) {
        Optional<Usuario> userOptional = usuarioRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
        Usuario usuario = userOptional.get();
        boolean curtido = curtidaRepository.existsByEventoIdAndUsuarioId(eventoId, userId);
        return ResponseEntity.ok(curtido);
    }

    @PostMapping("/like/{eventoId}/{usuarioId}")
    public ResponseEntity<String> likeEvent(@PathVariable Long eventoId, @PathVariable Long usuarioId) {
        Optional<Evento> eventoOptional = eventoRepository.findById(eventoId);
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);

        if (!eventoOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado");
        }

        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        Evento evento = eventoOptional.get();
        Usuario usuario = usuarioOptional.get();

        boolean curtido = curtidaRepository.existsByEventoIdAndUsuarioId(eventoId, usuarioId);
        if (curtido) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário já curtiu este evento");
        }

        Curtida curtida = new Curtida();
        curtida.setEvento(evento);
        curtida.setUsuario(usuario);
        curtidaRepository.save(curtida);
        notificationService.addNotification(
                usuario.getUsername() + " curtiu seu evento.",
                evento.getUsuario().getId(),
                TipoNotificacao.CURTIDA,
                usuario.getFotoCaminho()
        );

        return ResponseEntity.ok("Evento curtido com sucesso");
    }

    @DeleteMapping("/like/{eventoId}/{usuarioId}")
    @Transactional
    public ResponseEntity<String> unlikeEvent(@PathVariable Long eventoId, @PathVariable Long usuarioId) {
        Optional<Evento> eventoOptional = eventoRepository.findById(eventoId);
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);

        if (!eventoOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado");
        }

        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        Evento evento = eventoOptional.get();
        Usuario usuario = usuarioOptional.get();

        curtidaRepository.deleteByUsuarioAndEvento(usuario, evento);

        return ResponseEntity.ok("Evento descurtido com sucesso!");
    }

    private String calculateTimeDifference(LocalDateTime commentMoment) {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(commentMoment, now);

        if (duration.getSeconds() < 60) {
            return duration.getSeconds() + " seg";
        } else if (duration.toMinutes() < 60) {
            return duration.toMinutes() + " min";
        } else if (duration.toHours() < 24) {
            return duration.toHours() + " h";
        } else {
            return duration.toDays() + " d";
        }
    }

}

