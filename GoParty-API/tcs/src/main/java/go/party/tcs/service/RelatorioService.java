package go.party.tcs.service;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.*;
import go.party.tcs.model.AppException;
import go.party.tcs.projection.EventoPorMembroProjection;
import go.party.tcs.projection.IngressoPorEventoProjection;
import go.party.tcs.repository.EventoPorMembroRepository;
import go.party.tcs.repository.IngressoPorEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class RelatorioService {

    @Autowired
    IngressoPorEventoRepository ingressoPorEventoRepository;

    @Autowired
    EventoPorMembroRepository eventoPorMembroRepository;

    public ResponseRelatorio gerarRelatorioEventoPorMembro(Long idFormatura, LocalDate dataInicio, LocalDate dataFim, PageRequest pageRequest) throws AppException {
        if (dataInicio.isBefore(dataFim)) {
            throw new AppException("Data fim é anterior a data de inicio");
        }
        Page<EventoPorMembroProjection> pageResponse = eventoPorMembroRepository.findEventosPorMembro(idFormatura, dataInicio, dataFim, pageRequest);
        List<EventoPorMembroDTO> relatorio = pageResponse.stream().map(EventoPorMembroDTO::convertProjection).toList();
        return new ResponseRelatorio(relatorio, PaginationDTO.fromPage(pageResponse));
    }

    public ResponseRelatorio gerarRelatorioIngressoPorEvento(Long idFormatura, String nomeEvento, TipoStatus status, PageRequest pageRequest) {
        String statusString = status == null ? null : status.toString().toUpperCase();
        nomeEvento = nomeEvento != null ? "%" + nomeEvento + "%" : null;
        Page<IngressoPorEventoProjection> pageResponse = ingressoPorEventoRepository.findIngressosPorEvento(idFormatura, nomeEvento, statusString, pageRequest);
        List<IngressoPorEventoDTO> relatorios = pageResponse.stream().map(IngressoPorEventoDTO::convertProjection).toList();
        return new ResponseRelatorio(relatorios, PaginationDTO.fromPage(pageResponse));
    }
}
