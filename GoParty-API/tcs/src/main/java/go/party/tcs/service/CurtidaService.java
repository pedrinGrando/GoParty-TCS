package go.party.tcs.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Curtida;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.CurtidaRepository;
import go.party.tcs.repository.EventoRepository;

@Service
public class CurtidaService {

    @Autowired
    private CurtidaRepository curtidaRepository;


    public void curtirEvento(Usuario usuario, Evento evento) throws RuntimeException {
        if (evento != null) {
              Curtida curtida = new Curtida();
              curtida.setUsuario(usuario);
              curtida.setEvento(evento);
              curtidaRepository.save(curtida);
       }else{
            throw new RuntimeException("usuario ja curtiu este evento!");
        }
    }

    public void descurtirEvento(Usuario usuario, Evento evento) {
        Curtida curtida = curtidaRepository.findByUsuarioAndEvento(usuario, evento);
        if (curtida != null) {
            curtidaRepository.delete(curtida);
        }
    }

    public long contarCurtidasDoEvento(Evento evento) {
        return curtidaRepository.countByEvento(evento);
    }

    public void excluirCurtida(Curtida curtida) {
        curtidaRepository.delete(curtida);
    }


    public List<Curtida> getAllCurtidas() {
        return curtidaRepository.findAll();
    }

}
