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
        List<IngressoPorEventoDTO> relatorios = ingressoPorEventoRepository.findIngressosPorEvento(idFormatura, idEvento, status, pageRequest).stream().map(
                projection -> new IngressoPorEventoDTO(
                        projection.getCodigoIngresso(),
                        projection.getDataCompra(),
                        projection.getComprador(),
                        projection.getNomeEvento(),
                        projection.getStatus()
                )
        ).toList();
        return relatorios;
    }
}
