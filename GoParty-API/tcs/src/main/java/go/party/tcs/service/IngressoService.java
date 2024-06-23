package go.party.tcs.service;

import java.util.List;
import java.util.Optional;

import go.party.tcs.dto.EventoDTO;
import go.party.tcs.dto.IngressoDTO;
import go.party.tcs.model.AppException;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Ingresso;
import go.party.tcs.repository.IngressoRepository;

@Service
public class IngressoService {

    @Autowired
    private IngressoRepository ingressoRepository;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private EventoService eventoService;
    @Autowired
    private EventoRepository eventoRepository;

    public IngressoDTO criarIngresso(Long userId, EventoDTO eventoDTO) throws AppException {
        Usuario usuario = usuarioService.findById(userId);
        Evento evento = eventoService.findById(eventoDTO.getId());
        if (evento.isEsgotado()) {
            throw new AppException("Ingressos para este evento estão esgotados");
        }
        evento.setIngressosVendidos(evento.getIngressosVendidos() + 1);
        eventoRepository.save(evento);
        Ingresso ingresso = new Ingresso(usuario, evento);
        ingresso = ingressoRepository.save(ingresso);
        return new IngressoDTO(
                ingresso.getId(),
                ingresso.getCodigoEvento(),
                ingresso.getStatus().toString(),
                ingresso.getAutor().getNome(),
                ingresso.getEvento().getTitulo(),
                ingresso.getDataCompra()
        );
    }

    public List<IngressoDTO> listarIngressosDoUsuario(Long userId) throws AppException {
        List<Ingresso> ingressos = ingressoRepository.findByAutorId(userId);
        if (ingressos.isEmpty()) {
            throw new AppException("Sem conteudo");
        }
        return ingressos.stream()
                .map(ingresso -> new IngressoDTO(
                        ingresso.getId(),
                        ingresso.getCodigoEvento(),
                        ingresso.getStatus().toString(),
                        ingresso.getAutor().getNome(),
                        ingresso.getEvento().getTitulo(),
                        ingresso.getDataCompra())
                ).toList();
    }
}
