package go.party.tcs.service;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.IngressoPorEventoDTO;
import go.party.tcs.projection.IngressoPorEventoProjection;
import go.party.tcs.repository.IngressoPorEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IngressoPorEventoService {

    @Autowired
    IngressoPorEventoRepository ingressoPorEventoRepository;

    public List<IngressoPorEventoDTO> gerarRelatorio(Long idFormatura, Long idEvento, TipoStatus status) {
        List<IngressoPorEventoDTO> relatorios = new ArrayList<>();
        List<IngressoPorEventoProjection> resultado = ingressoPorEventoRepository.findIngressosPorEvento(idFormatura, idEvento, status);
        for (IngressoPorEventoProjection projection : resultado) {
            IngressoPorEventoDTO dto = new IngressoPorEventoDTO(projection.getCodigoIngresso(), projection.getDataCompra(), projection.getComprador(), projection.getNomeEvento(), projection.getStatus());
            relatorios.add(dto);
        }
        return relatorios;
    }
}
