package go.party.tcs.service;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.dto.EventoDTO;
import go.party.tcs.dto.IngressoDTO;
import go.party.tcs.model.*;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.FormaturaRepository;
import go.party.tcs.repository.IngressoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;

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
    private ArgumentCaptor<Formatura> formaturaCaptor;

    private EventoDTO eventoDTO;

    @BeforeEach
    public void setup() {
        usuario = new Usuario();
        usuario.setId(1L);

        evento = new Evento();
        evento.setId(1L);
        evento.setIngressosVendidos(0);
        evento.setEsgotado(false);

        formatura = new Formatura();
        formatura.setId(1L);
        formatura.setArrecacado(0.0);

        ingresso = new Ingresso(usuario, evento);
        ingresso.setId(1L);

        eventoDTO = new EventoDTO();
        eventoDTO.setId(1L);
    }

    @Test
    @DisplayName("Sucesso ao criar ingresso")
    void criarIngresso() {
        eventoDTO.setId(1L);
        Usuario usuarioMock = mock(Usuario.class);
        Evento eventoMock = mock(Evento.class);
        Formatura formaturaMock = mock(Formatura.class);
        Ingresso ingressoMock = mock(Ingresso.class);
        given(usuarioService.findById(1L)).willReturn(usuarioMock);
        given(eventoService.findById(1L)).willReturn(eventoMock);
        given(formaturaRepository.findById(1L)).willReturn(Optional.of(formaturaMock));
        given(ingressoRepository.save(any(Ingresso.class))).willReturn(ingressoMock);
        given(eventoMock.getFormatura()).willReturn(formaturaMock);
        given(formaturaMock.getId()).willReturn(1L);
        given(ingressoMock.getId()).willReturn(1L);
        given(ingressoMock.getCodigoEvento()).willReturn("12345");
        given(ingressoMock.getStatus()).willReturn(TipoStatus.PAGO);
        given(ingressoMock.getAutor()).willReturn(usuarioMock);
        given(usuarioMock.getNome()).willReturn("Usuario");
        given(ingressoMock.getEvento()).willReturn(eventoMock);
        given(eventoMock.getTitulo()).willReturn("Ads Apocalipse");
        given(ingressoMock.getDataCompra()).willReturn(LocalDateTime.now());
        given(eventoMock.getDataEvento()).willReturn(LocalDateTime.now());
        given(eventoMock.getRua()).willReturn("Avenida Governador Ivo silveira");
        given(eventoMock.getBairro()).willReturn("Capoeiras");
        IngressoDTO result =ingressoService.criarIngresso(1L, eventoDTO);
        then(eventoRepository).should().save(eventoCaptor.capture());
        then(formaturaRepository).should().save(formaturaCaptor.capture());
        Evento evento1 = eventoCaptor.getValue();
        Formatura formatura1 = formaturaCaptor.getValue();
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertNotNull(evento1);
        assertNotNull(formatura1);
    }

    @Test
    @DisplayName("Evento esgotado")
    void testEventoEsgotado() {
        evento.setEsgotado(true);
        evento.setFormatura(formatura);

        // Mock do eventoService para retornar o evento configurado acima
        given(eventoService.findById(1L)).willReturn(evento);

        // Mock do formaturaRepository para retornar a formatura
        given(formaturaRepository.findById(formatura.getId())).willReturn(Optional.of(formatura));

        // Verifica se a exceção é lançada ao tentar criar um ingresso para um evento esgotado
        Exception exception = assertThrows(AppException.class, () -> {
            ingressoService.criarIngresso(1L, eventoDTO);
        });

        // Verifica a mensagem da exceção
        assertEquals("Ingressos para este evento estão esgotados", exception.getMessage());
    }

    @Test
    @DisplayName("Listagem de ingressos por usuario")
    public void testListarIngressosDoUsuario() throws AppException {
        when(ingressoRepository.findByAutorId(any(Long.class))).thenReturn(List.of(ingresso));
        List<IngressoDTO> result = ingressoService.listarIngressosDoUsuario(1L);
        assertNotNull(result);
        assertFalse(((List<?>) result).isEmpty());
        assertEquals(1L, result.get(0).getId());
    }

    @Test
    @DisplayName("Usuario sem ingressos")
    public void testListarIngressosDoUsuarioSemConteudo() {
        when(ingressoRepository.findByAutorId(any(Long.class))).thenReturn(Collections.emptyList());
        Exception exception = assertThrows(AppException.class, () -> {
            ingressoService.listarIngressosDoUsuario(1L);
        });
        assertEquals("Sem conteudo", exception.getMessage());
    }

    @Test
    @DisplayName("Contagem de ingressos por usuario")
    public void testCountIngressosByUsuarioId() {
        when(ingressoRepository.countByUsuarioId(any(Long.class))).thenReturn(5);

        int count = ingressoService.countIngressosByUsuarioId(1L);

        assertEquals(5, count);
    }
}