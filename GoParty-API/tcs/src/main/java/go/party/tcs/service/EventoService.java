package go.party.tcs.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import go.party.tcs.dto.EventoDTO;
import go.party.tcs.repository.CurtidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Evento;
import go.party.tcs.model.Formatura;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.UsuarioRepository;

@Service
public class EventoService {

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

}
