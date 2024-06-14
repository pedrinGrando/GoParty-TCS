package go.party.tcs.service;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.IngressoPorEventoDTO;
import go.party.tcs.projection.IngressoPorEventoProjection;
import go.party.tcs.repository.IngressoPorEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class IngressoPorEventoService {

    @Autowired
    IngressoPorEventoRepository ingressoPorEventoRepository;

    public List<IngressoPorEventoDTO> gerarRelatorio(Long idFormatura, Long idEvento, TipoStatus status, PageRequest pageRequest) {
        List<IngressoPorEventoDTO> relatorios = new ArrayList<>();
        List<IngressoPorEventoProjection> resultado = ingressoPorEventoRepository.findIngressosPorEvento(idFormatura, idEvento, status, pageRequest);
        for (IngressoPorEventoProjection projection : resultado) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String data = formatter.format(projection.getDataCompra());
            IngressoPorEventoDTO dto = new IngressoPorEventoDTO(projection.getCodigoIngresso(), data, projection.getComprador(), projection.getNomeEvento(), projection.getStatus());
            relatorios.add(dto);
        }
        return relatorios;
    }
}
