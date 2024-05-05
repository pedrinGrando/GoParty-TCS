package go.party.tcs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import go.party.tcs.model.Ingresso;
import go.party.tcs.repository.IngressoRepository;

@Service
public class IngressoService {
    private final IngressoRepository ingressoRepository;

    public IngressoService(IngressoRepository ingressoRepository) {
        this.ingressoRepository = ingressoRepository;
    }

    public List<Ingresso> getIngressosDoEvento(Long eventoId) {
        return ingressoRepository.findByEventoId(eventoId);
    }

    public void save(Ingresso ingresso) {
        ingressoRepository.save(ingresso);
    }

}
