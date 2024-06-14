package go.party.tcs.service;

import go.party.tcs.dto.EventoPorMembroDTO;
import go.party.tcs.projection.EventoPorMembroProjection;
import go.party.tcs.repository.EventoPorMembroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventoPorMembroService {

    @Autowired
    EventoPorMembroRepository eventoPorMembroRepository;

    public List<EventoPorMembroDTO> gerarRelatorio(Long idFormatura, LocalDate dataInicio, LocalDate dataFim, PageRequest pageRequest) {
        List<EventoPorMembroDTO> relatorio = new ArrayList<>();
        List<EventoPorMembroProjection> resultados = eventoPorMembroRepository.findEventosPorMembro(idFormatura, dataInicio, dataFim, pageRequest);
        for (EventoPorMembroProjection projection : resultados) {
            EventoPorMembroDTO dto = new EventoPorMembroDTO(projection.getNome(), projection.getQuantidadeEventosCriados(), projection.getTotalIngressosVendidos(), projection.getValorArrecadadoTotal());
            relatorio.add(dto);
        }
        return relatorio;
    }
}
