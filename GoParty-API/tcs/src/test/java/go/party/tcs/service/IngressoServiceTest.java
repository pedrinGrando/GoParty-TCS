package go.party.tcs.service;

import go.party.tcs.dto.EventoDTO;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Formatura;
import go.party.tcs.model.Ingresso;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.FormaturaRepository;
import go.party.tcs.repository.IngressoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
class IngressoServiceTest {

    @Mock
    private IngressoRepository ingressoRepository;
    @Mock
    private UsuarioService usuarioService;
    @Mock
    private EventoService eventoService;
    @Mock
    private EventoRepository eventoRepository;
    @Mock
    private FormaturaRepository formaturaRepository;
    @InjectMocks
    private IngressoService ingressoService;
    private Usuario usuario;
    private Evento evento;
    private Formatura formatura;
    private Ingresso ingresso;
    @Captor
    private ArgumentCaptor<Evento> eventoCaptor;
    @Captor
    private ArgumentCaptor<Ingresso> ingressoCaptor;

    @Test
    @DisplayName("Sucesso ao criar ingresso")
    void criarIngresso() {
        EventoDTO eventoDTO = new EventoDTO();
        eventoDTO.setId(1L);
        usuario = new Usuario();
        usuario.setId(1L);
        evento = new Evento();
        evento.setId(1L);
        formatura = new Formatura();
        formatura.setId(1L);
        evento.setFormatura(formatura);
        given(usuarioService.findById(1L)).willReturn(usuario);
        given(eventoService.findById(1L)).willReturn(evento);
        given(formaturaRepository.findById(1L)).willReturn(Optional.of(formatura));
        ingressoService.criarIngresso(1L, eventoDTO);
        then(eventoRepository).should().save(eventoCaptor.capture());
        then(ingressoRepository).should().save(ingressoCaptor.capture());
        ingresso = ingressoCaptor.getValue();
        Evento eventoSalvo = eventoCaptor.getValue();
        assertNotNull(eventoSalvo);
        assertEquals(evento.getId(), eventoSalvo.getId());
    }

}