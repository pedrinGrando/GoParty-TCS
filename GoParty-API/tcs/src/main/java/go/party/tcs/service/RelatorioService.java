package go.party.tcs.service;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.*;
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

    public List<EventoPorMembroDTO> gerarRelatorioEventoPorMembro(Long idFormatura, LocalDate dataInicio, LocalDate dataFim, PageRequest pageRequest) {
        List<EventoPorMembroDTO> relatorio = eventoPorMembroRepository.findEventosPorMembro(idFormatura, dataInicio, dataFim, pageRequest).stream().map(
                projection -> new EventoPorMembroDTO(
                        projection.getNome(),
                        projection.getQuantidadeEventosCriados(),
                        projection.getTotalIngressosVendidos(),
                        projection.getValorArrecadadoTotal())
        ).toList();
        return relatorio;
    }

    public ResponseRelatorio gerarRelatorioEventoPorMembro2(Long idFormatura, LocalDate dataInicio, LocalDate dataFim, PageRequest pageRequest) {
        Page<EventoPorMembroProjection> pageResponse = eventoPorMembroRepository.findEventosPorMembro(idFormatura, dataInicio, dataFim, pageRequest);
        List<EventoPorMembroDTO> relatorio = pageResponse.stream().map(
                projection -> new EventoPorMembroDTO(
                        projection.getNome(),
                        projection.getQuantidadeEventosCriados(),
                        projection.getTotalIngressosVendidos(),
                        projection.getValorArrecadadoTotal())
        ).toList();
        return new ResponseRelatorio(relatorio, PaginationDTO.fromPage(pageResponse));
    }

    public ResponseRelatorio gerarRelatorioIngressoPorEvento(Long idFormatura, Long idEvento, TipoStatus status, PageRequest pageRequest) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String statusString = status == null ? null : status.toString().toUpperCase();
        Page<IngressoPorEventoProjection> pageResponse = ingressoPorEventoRepository.findIngressosPorEvento(idFormatura, idEvento, statusString, pageRequest);
        List<IngressoPorEventoDTO> relatorios = pageResponse.stream().map(
                projection -> new IngressoPorEventoDTO(
                        projection.getCodigoIngresso(),
                        formatter.format(projection.getDataCompra()),
                        projection.getComprador(),
                        projection.getNomeEvento(),
                        projection.getStatus()
                )
        ).toList();
        return new ResponseRelatorio(relatorios, PaginationDTO.fromPage(pageResponse));
    }
}
