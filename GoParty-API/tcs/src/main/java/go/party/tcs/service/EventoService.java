package go.party.tcs.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.EventoDTO;
import go.party.tcs.model.AppException;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.ComentarioRepository;
import go.party.tcs.repository.CurtidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Evento;
import go.party.tcs.model.Formatura;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.UsuarioRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class EventoService {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    public EventoService(@Lazy CurtidaService curtidaService) {
        this.curtidaService = curtidaService;
    }

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    CurtidaService curtidaService;

    @Autowired
    CurtidaRepository curtidaRepository;

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Evento cadastrarEvento(Long userId, Evento evento) throws AppException {
        Usuario usuario = usuarioService.findById(userId);
        if (usuario.isNotStudent() || usuario.isNotAdm()) {
            throw new AppException("Usuario não é membro!");
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

    public List<EventoDTO> getEventosAtivos() {
        List<Evento> eventos = eventoRepository.findByAtivoTrueAndEsgotadoFalse().stream().filter(
                evento -> evento.getDataEvento().isBefore(LocalDate.now())
        ).toList();
        eventos.forEach(
                evento -> {
                    evento.setDataExpiracao(LocalDate.now());
                    eventoRepository.save(evento);
                }
        );
        return eventos.stream()
                .filter(evento -> evento.getDataEvento().isAfter(LocalDate.now()))
                .map(evento -> {
                    int totalCurtidas = curtidaRepository.countByEventoId(evento.getId());
                    int totalComentarios = comentarioRepository.countByEventoId(evento.getId());
                    return new EventoDTO(evento, totalCurtidas, totalComentarios);
                }).toList();
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
        //TODO continuar a logica desse método
    }

    public List<Evento> getAllEventos() {
        //Ordena pela data/horario da postagem
        return eventoRepository.findAll(Sort.by(Sort.Direction.DESC, "dataPostagem"));
    }

    public void atualizarEvento(Evento evento){
        eventoRepository.save(evento);
    }

    public EventoService(EventoRepository eventoRepository, CurtidaService curtidaService) {
        this.eventoRepository = eventoRepository;
        this.curtidaService = curtidaService;
    }

    public void editarEvento(Integer id) {
        eventoRepository.save(null);
    }

    public int obterQuantidadeCurtidas(Integer eventoId) {
        return 0;
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
}
