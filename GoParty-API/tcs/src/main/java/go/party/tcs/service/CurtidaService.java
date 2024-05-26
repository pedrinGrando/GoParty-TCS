package go.party.tcs.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Curtida;
import go.party.tcs.model.Evento;
import go.party.tcs.model.User;
import go.party.tcs.repository.CurtidaRepository;
import go.party.tcs.repository.EventoRepository;

@Service
public class CurtidaService {
    @Autowired
    private CurtidaRepository curtidaRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private EventoService eventoService;


    public void curtirEvento(User usuario, Evento evento) throws RuntimeException {
        if (evento != null) {
              Curtida curtida = new Curtida();
              curtida.setUser(usuario);
              curtida.setEvento(evento);
              curtidaRepository.save(curtida);
       }else{
            throw new RuntimeException("usuario ja curtiu este evento!");
        }
    }

    public void descurtirEvento(User usuario, Evento evento) {
        Curtida curtida = curtidaRepository.findByUserAndEvento(usuario, evento);
        if (curtida != null) {
            curtidaRepository.delete(curtida);
        }
    }

    public long contarCurtidasDoEvento(Evento evento) {
        return curtidaRepository.countByEvento(evento);
    }

    public CurtidaService(CurtidaRepository curtidaRepository) {
        this.curtidaRepository = curtidaRepository;
    }


    public void excluirCurtida(Curtida curtida) {
        curtidaRepository.delete(curtida);
    }


    public List<Curtida> getAllCurtidas() {
        return curtidaRepository.findAll();
    }
}
