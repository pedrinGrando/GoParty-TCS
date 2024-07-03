package go.party.tcs.service;

import java.util.List;
import java.util.Optional;

import go.party.tcs.dto.EventoDTO;
import go.party.tcs.dto.IngressoDTO;
import go.party.tcs.model.*;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.FormaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    @Autowired
    private FormaturaRepository formaturaRepository;

    public IngressoDTO criarIngresso(Long userId, EventoDTO eventoDTO) throws AppException {
        Usuario usuario = usuarioService.findById(userId);
        Evento evento = eventoService.findById(eventoDTO.getId());
        Optional<Formatura> formaturaOpt = formaturaRepository.findById(evento.getFormatura().getId());
        Formatura formatura = formaturaOpt.get();
        if (evento.isEsgotado()) {
            throw new AppException("Ingressos para este evento estão esgotados");
        }
        evento.setIngressosVendidos(evento.getIngressosVendidos() + 1);
        eventoRepository.save(evento);
        Ingresso ingresso = new Ingresso(usuario, evento);
        ingresso = ingressoRepository.save(ingresso);
        formatura.setArrecacado(formatura.getArrecacado() + evento.getValor());
        formaturaRepository.save(formatura);
        return new IngressoDTO(
                ingresso.getId(),
                ingresso.getCodigoEvento(),
                ingresso.getStatus().toString(),
                ingresso.getAutor().getNome(),
                ingresso.getEvento().getTitulo(),
                ingresso.getDataCompra(),
                ingresso.getEvento().getDataEvento(),
                ingresso.getEvento().getRua(),
                ingresso.getEvento().getBairro(),
                ingresso.getStatus().toString());
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
                        ingresso.getDataCompra(),
                        ingresso.getEvento().getDataEvento(),
                        ingresso.getEvento().getRua(),
                        ingresso.getEvento().getBairro(),
                        ingresso.getStatus().toString())
                ).toList();
    }

    public int countIngressosByUsuarioId(Long usuarioId) {
        return ingressoRepository.countByUsuarioId(usuarioId);
    }

}
