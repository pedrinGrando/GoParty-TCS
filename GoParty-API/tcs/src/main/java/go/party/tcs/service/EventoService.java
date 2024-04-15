package go.party.tcs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import go.party.tcs.model.Curtida;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.CurtidaRepository;
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

    @Autowired CurtidaService curtidaService;

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

}
