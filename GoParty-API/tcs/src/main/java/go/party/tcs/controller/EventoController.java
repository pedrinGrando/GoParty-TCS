package go.party.tcs.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import go.party.tcs.repository.IngressoRepository;
import go.party.tcs.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.Enums.NotificationType;
import go.party.tcs.Enums.UserType;
import go.party.tcs.dto.EventoDTO;
import go.party.tcs.model.Evento;
import go.party.tcs.model.User;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.CurtidaService;
@RestController
@RequestMapping("/v1/eventos")
@CrossOrigin(origins = "http://localhost:5173/")
public class EventoController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private CurtidaService curtidaService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private IngressoRepository ingressoRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Método para Criar um Evento
    @PostMapping("/criar-evento/{userId}")
    public ResponseEntity<?> cadastrarEvento(@PathVariable Long userId, @RequestBody Evento evento) {
        try {

            // encontrar usuario que fez a postagem
            Optional<User> userOptional = usuarioRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            User usuarioAutor = userOptional.get();
            if (!usuarioAutor.getUserType().equals(UserType.MEMBER)
                    && !usuarioAutor.getUserType().equals(UserType.ADM)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não é membro!");
            } else {
                evento.setFormatura(usuarioAutor.getFormatura());
                evento.setUser(usuarioAutor);
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
                .map(EventoDTO::new)
                .collect(Collectors.toList());
    }

    // Id evento
    @GetMapping("/buscar-evento/{eventoId}")
    public ResponseEntity<?> buscarEventoPeloId(@PathVariable Long eventoId) {
        return eventoRepository.findById(eventoId)
                .map(evento -> new ResponseEntity<>(new EventoDTO(evento), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/buscar-por-usuario/{userId}")
    public ResponseEntity<?> buscarEventoPorUserId(@PathVariable Long userId) {
        Optional<User> userOptional = usuarioRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Usuário não encontrado!");
        }

        List<Evento> eventos = eventoRepository.findByUserId(userId);
        if (eventos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<EventoDTO> eventosDTO = eventos.stream()
                .map(evento -> new EventoDTO(evento))
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
                           e.getFormatura().getTitulo()))
                    .collect(Collectors.toList());
        }
    }

    @PostMapping("/curtir-evento/{userId}/{eventoId}")
    public ResponseEntity<?> curtirEvento(@PathVariable Long userId, @PathVariable Long eventoId) {
        Optional<Evento> eventoOptional = eventoRepository.findById(eventoId);
        Optional<User> userOptional = usuarioRepository.findById(userId);
        Evento evento = new Evento();
        User usuario = new User();
        if (eventoOptional.isPresent() && userOptional.isPresent()) {
            evento = eventoOptional.get();
            usuario = userOptional.get();
            curtidaService.curtirEvento(usuario, evento);
            notificationService.createNotification(
                usuario.getUsername() + " curtiu seu evento.",
                evento.getUser().getId(),
                NotificationType.CURTIDA
            );
            return ResponseEntity.ok().body("Evento curtido com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento ou usuario nao encontrado!");
        }
    }

    @PutMapping("/inativar-evento/{userId}/{eventoId}")
    public ResponseEntity<?> inativarEvento(@PathVariable Long userId, @PathVariable Long eventoId) {
        Optional<User> userOptional = usuarioRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Usuário não encontrado!");
        }
        return eventoRepository.findById(eventoId)
                .map(evento -> {
                    if (!evento.getUser().getId().equals(userId)) {
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
            return ResponseEntity.ok(new EventoDTO(evento));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
