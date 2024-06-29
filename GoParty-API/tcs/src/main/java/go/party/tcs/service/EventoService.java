package go.party.tcs.service;

import java.io.IOException;
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
import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.CommentDTO;
import go.party.tcs.dto.EventoDTO;
import go.party.tcs.model.*;
import go.party.tcs.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

@Service
public class EventoService {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private IngressoRepository ingressoRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    CurtidaService curtidaService;

    @Autowired
    CurtidaRepository curtidaRepository;

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;
    @Autowired
    private NotificationService notificationService;

    public Evento cadastrarEvento(Long userId, Evento evento) throws AppException {
        Usuario usuario = usuarioService.findById(userId);

        if (!usuario.getTipoUsuario().equals(TipoUsuario.MEMBER) && !usuario.getTipoUsuario().equals(TipoUsuario.ADM)) {
            throw new AppException("Usuario não é membro ou administrador!");
        }
        evento.setUsuario(usuario);
        evento.setFormatura(usuario.getFormatura());
        evento.setDataPostagem(LocalDateTime.now());
        evento = eventoRepository.save(evento);
        return evento;
    }

    public void uploadEventImage(Long eventId, MultipartFile file) throws IOException, AppException {
        Evento evento = this.findById(eventId);
        String fileName = evento.getId() + "_" + file.getOriginalFilename();
        Path path = Paths.get(this.uploadDir, fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        evento.setEventoCaminho("/uploads/" + fileName);
        eventoRepository.save(evento);
    }

    public int countEventosByUsuarioId(Long usuarioId) {
        return eventoRepository.countByUsuarioId(usuarioId);
    }

    public List<EventoDTO> getEventosAtivos() {
        List<Evento> eventosAtivos = eventoRepository.findActiveAndAvailableEventsOrderByDateDesc();
        LocalDateTime now = LocalDateTime.now();
        eventosAtivos.forEach(evento -> {
            if (evento.getDataEvento().isBefore(now)) {
                evento.setDataExpiracao(now.toLocalDate());
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

    public EventoDTO buscarEventoPorId(Long eventoId) throws AppException {
        int totalCurtidas = curtidaRepository.countByEventoId(eventoId);
        int totalComentarios = comentarioRepository.countByEventoId(eventoId);
        Evento evento = this.findById(eventoId);
        return new EventoDTO(evento, totalCurtidas, totalComentarios);
    }

    public List<EventoDTO> buscarEventoPorUserId(Long userId) throws AppException {
        Usuario usuario = usuarioService.findById(userId);
        List<Evento> eventos = eventoRepository.findByUsuarioId(usuario.getId());
       return eventos.stream().map(
               evento -> new EventoDTO(
                       evento,
                       curtidaRepository.countByEventoId(evento.getId()),
                       comentarioRepository.countByEventoId(evento.getId())
               )
       ).toList();
    }

    public List<EventoDTO> buscarEventosPorFormaturaId(Long formaturaId) throws AppException {
        List<Evento> eventos = eventoRepository.findByFormaturaId(formaturaId);
        return eventos.stream().map(
                evento -> new EventoDTO(
                        evento,
                        curtidaRepository.countByEventoId(evento.getId()),
                        comentarioRepository.countByEventoId(evento.getId())
                )
        ).collect(Collectors.toList());
    }

    public List<EventoDTO> searchEventos(String search) throws AppException {
        if(search != null || !search.isEmpty()) {
            return eventoRepository.findByTituloOrDescricaoContainingIgnoreCase(search);
        } else {
            return eventoRepository.findActiveAndAvailableEventsOrderByDateDesc().stream().map(
                    evento -> new EventoDTO(
                            evento,
                            curtidaRepository.countByEventoId(evento.getId()),
                            comentarioRepository.countByEventoId(evento.getId())
                    )
            ).toList();
        }
    }

    public void inativarEvento(Long userId, Long eventoId) throws AppException {
        Usuario usuario = usuarioService.findById(userId);
        Evento evento = this.findById(eventoId);
        if (!evento.getUsuario().getId().equals(userId)) {
            throw new AppException("Usuario não criou a formatura!");
        }
        if (!ingressoRepository.findByEventoId(evento.getId()).isEmpty()) {
            throw new AppException("Já existem ingressos comprados para este evento!");
        }
        evento.setAtivo(false);
        evento.setDataExpiracao(LocalDate.now());
        eventoRepository.save(evento);
    }

    public EventoDTO atualizarEvento(Long eventoId, EventoDTO eventoDTO) throws AppException {
        Evento evento = this.findById(eventoId);
        evento.setTitulo(eventoDTO.getTitulo());
        evento.setDescricao(eventoDTO.getDescricao());
        evento.setCep(eventoDTO.getCep());
        evento.setEstado(eventoDTO.getEstado());
        evento.setCidade(eventoDTO.getCidade());
        evento.setBairro(eventoDTO.getBairro());
        evento.setRua(eventoDTO.getRua());
        evento.setValor(eventoDTO.getValor());
        evento.setDataEvento(eventoDTO.getDataEvento());
        evento = eventoRepository.save(evento);
        return new EventoDTO(
                evento,
                curtidaRepository.countByEventoId(evento.getId()),
                comentarioRepository.countByEventoId(evento.getId())
        );
    }

    public List<CommentDTO> getComentariosByEventoId(Long eventoId) {
        List<Comentario> comentarios = comentarioRepository.findByEventoIdOrderByCommentMomentDesc(eventoId);
        if (comentarios.isEmpty()) {
            throw new AppException("Sem conteudo");
        }
        return comentarios.stream().map(
                comentario -> new CommentDTO(
                        comentario.getId(),
                        comentario.getTexto(),
                        comentario.getAutor().getId(),
                        comentario.getEvento().getId(),
                        comentario.getAutor().getFotoCaminho(),
                        comentario.getAutor().getUsername(),
                        comentario.getCommentMoment() != null ? this.calculateTimeDifference(comentario.getCommentMoment()) : "Momento do comentário não disponível"
                )).toList();
    }

    public Map<String, Object> comment(Long eventoId, Long autorId, String text) throws AppException {
        Evento evento = this.findById(eventoId);
        Usuario autor = usuarioService.findById(autorId);
        Comentario comentario = new Comentario(
                text,
                autor,
                evento
        );
        comentarioRepository.save(comentario);
        notificationService.addNotification(
                autor.getUsername() + " comentou em seu evento: " + comentario.getTexto(),
                evento.getUsuario().getId(),
                TipoNotificacao.COMENTARIO
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
        return response;
    }

    public boolean isEventoCurtido(Long eventoId, Long usuarioId) throws AppException {
        return curtidaRepository.existsByEventoIdAndUsuarioId(eventoId, usuarioId);
    }

    public void likeEvent(Long eventoId, Long usuarioId) throws AppException {
        Evento evento = this.findById(eventoId);
        Usuario usuario = usuarioService.findById(usuarioId);
        boolean curtido = curtidaRepository.existsByEventoIdAndUsuarioId(eventoId, usuarioId);
        if (curtido) {
            throw new AppException("Usuário já curtiu este evento");
        }
        Curtida curtida = new Curtida(usuario, evento);
        curtidaRepository.save(curtida);
        notificationService.addNotification(
                usuario.getUsername() + " curtiu seu evento.",
                evento.getUsuario().getId(),
                TipoNotificacao.CURTIDA
        );
    }

    public void unlikeEvent(Long eventoId, Long usuarioId) throws AppException {
        Evento evento = this.findById(eventoId);
        Usuario usuario = usuarioService.findById(usuarioId);
        curtidaRepository.deleteByUsuarioAndEvento(usuario, evento);
    }

    public List<Evento> getAllEventos() {
        return eventoRepository.findAll(Sort.by(Sort.Direction.DESC, "dataPostagem"));
    }

    public EventoService(EventoRepository eventoRepository, CurtidaService curtidaService) {
        this.eventoRepository = eventoRepository;
        this.curtidaService = curtidaService;
    }

     public Optional<String> findChavePixByEventoId(Long eventoId) {
        return eventoRepository.findById(eventoId)
                               .map(Evento::getFormatura)
                               .map(Formatura::getChavePix);
    }

    public List<EventoDTO> findTop10EventosComMaisCurtidas() {
        List<Object[]> results = curtidaRepository.findTop10EventosMaisCurtidos();

        return results.stream().map(result -> {
            Long eventoId = (Long) result[0];
            int totalCurtidas = ((Long) result[1]).intValue();
            Evento evento = eventoRepository.findById(eventoId).orElse(null);
            if (evento != null) {
                int totalComentarios = evento.getComentarios().size();
                return new EventoDTO(evento, totalCurtidas, totalComentarios);
            }
            return null;
        }).filter(dto -> dto != null).collect(Collectors.toList());
    }

    public Evento findById(Long eventoId) throws AppException {
        return eventoRepository.findById(eventoId).orElseThrow(() -> new AppException("Evento não encontrado!"));
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
