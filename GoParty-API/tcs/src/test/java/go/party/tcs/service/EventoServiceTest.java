package go.party.tcs.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import go.party.tcs.Enums.TipoNotificacao;
import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.CommentDTO;
import go.party.tcs.dto.EventoDTO;
import go.party.tcs.model.*;
import go.party.tcs.repository.ComentarioRepository;
import go.party.tcs.repository.CurtidaRepository;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.IngressoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

@ExtendWith(MockitoExtension.class)
public class EventoServiceTest {

    @InjectMocks
    private EventoService eventoService;

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private IngressoRepository ingressoRepository;

    @Mock
    private EventoRepository eventoRepository;

    @Mock
    private CurtidaService curtidaService;

    @Mock
    private CurtidaRepository curtidaRepository;

    @Mock
    private ComentarioRepository comentarioRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private MultipartFile file;

    @Captor
    private ArgumentCaptor<Evento> eventoCaptor;

    @Value("${file.upload-dir}")
    private String uploadDir = "/uploads";

    private Evento evento;
    private final Long eventoId = 1L;

    private EventoDTO eventoDTO;

    @BeforeEach
    public void setUp() {
        evento = new Evento();
        evento.setId(eventoId);
        evento.setAtivo(true);
        evento.setTitulo("Título do Evento");
        evento.setDescricao("Descrição do Evento");
        evento.setEventoCaminho("Caminho do Evento");
        evento.setCidade("Cidade");
        evento.setBairro("Bairro");
        evento.setRua("Rua");
        evento.setEstado("Estado");
        evento.setDataEvento(LocalDateTime.now());
        evento.setValor(100.0);
        evento.setQntIngressos(100);
        evento.setEsgotado(false);
        Formatura formatura = new Formatura();
        formatura.setTitulo("Título da Formatura");
        evento.setFormatura(formatura);
        MockitoAnnotations.openMocks(this);

        eventoDTO = new EventoDTO(evento, 0, 0, false);
        eventoDTO.setTitulo("Novo Título do Evento");
        eventoDTO.setDescricao("Nova Descrição do Evento");
        eventoDTO.setCep("87654321");
        eventoDTO.setEstado("Novo Estado");
        eventoDTO.setCidade("Nova Cidade");
        eventoDTO.setBairro("Novo Bairro");
        eventoDTO.setRua("Nova Rua");
        eventoDTO.setValor(150.0);
        eventoDTO.setDataEvento(LocalDateTime.now().plusDays(1));
    }

    @Test
    @DisplayName("Cadastro de evento")
    public void testCadastrarEvento() throws AppException {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setTipoUsuario(TipoUsuario.MEMBER);

        Evento evento = new Evento();
        evento.setId(1L);

        when(usuarioService.findById(1L)).thenReturn(usuario);
        when(eventoRepository.save(any(Evento.class))).thenReturn(evento);

        Evento result = eventoService.cadastrarEvento(1L, evento);

        assertNotNull(result);
        verify(eventoRepository).save(evento);
    }

    @Test
    @DisplayName("Usuario invalido cadastrando evento")
    public void testCadastrarEventoUsuarioInvalido() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setTipoUsuario(TipoUsuario.STUDENT);
        given(usuarioService.findById(1L)).willReturn(usuario);
        Evento evento = new Evento();
        assertThrows(AppException.class, () -> eventoService.cadastrarEvento(1L, evento));
    }

    @Test
    @DisplayName("Upload de imgame de evento")
    public void testUploadImagemEvento() throws IOException, AppException {
        ReflectionTestUtils.setField(eventoService, "uploadDir", "./uploads");
        Evento evento = new Evento();
        evento.setId(1L);
        MockMultipartFile mockFile = new MockMultipartFile(
                "file",
                "image.png",
                "image/png",
                "teste conteudo".getBytes()
        );
        given(eventoRepository.findById(1L)).willReturn(Optional.of(evento));
        eventoService.uploadEventImage(1L, mockFile);
        then(eventoRepository).should().save(eventoCaptor.capture());
        Evento eventoCapturado = eventoCaptor.getValue();
        assertNotNull(eventoCapturado);
        assertEquals("/uploads/1_image.png", eventoCapturado.getEventoCaminho());
    }

    @Test
    @DisplayName("Buscar o evento por id")
    public void testBuscarEventoPorId() throws AppException {
        when(curtidaRepository.countByEventoId(eventoId)).thenReturn(10);
        when(comentarioRepository.countByEventoId(eventoId)).thenReturn(5);
        when(eventoRepository.findById(eventoId)).thenReturn(Optional.of(evento));

        EventoDTO eventoDTO = eventoService.buscarEventoPorId(eventoId);

        assertNotNull(eventoDTO);
        assertEquals(eventoId, eventoDTO.getId());
        assertEquals(10, eventoDTO.getTotalCurtidas());
        assertEquals(5, eventoDTO.getTotalComentarios());
    }

    @Test
    @DisplayName("Buscando evento por id que não existe")
    public void testBuscarEventoPorIdNaoEncontrado() {
        when(eventoRepository.findById(eventoId)).thenReturn(Optional.empty());

        assertThrows(AppException.class, () -> {
            eventoService.buscarEventoPorId(eventoId);
        });
    }

    @Test
    public void testAtualizarEvento_Sucesso() throws AppException {
        when(eventoRepository.findById(eventoId)).thenReturn(Optional.of(evento));
        when(eventoRepository.save(any(Evento.class))).thenReturn(evento);
        when(curtidaRepository.countByEventoId(eventoId)).thenReturn(10);
        when(comentarioRepository.countByEventoId(eventoId)).thenReturn(5);

        EventoDTO atualizadoDTO = eventoService.atualizarEvento(eventoId, eventoDTO);

        assertNotNull(atualizadoDTO);
        assertEquals("Novo Título do Evento", atualizadoDTO.getTitulo());
        assertEquals("Nova Descrição do Evento", atualizadoDTO.getDescricao());
        assertEquals("Novo Estado", atualizadoDTO.getEstado());
        assertEquals("Nova Cidade", atualizadoDTO.getCidade());
        assertEquals("Novo Bairro", atualizadoDTO.getBairro());
        assertEquals("Nova Rua", atualizadoDTO.getRua());
        assertEquals(150.0, atualizadoDTO.getValor());
        assertEquals(10, atualizadoDTO.getTotalCurtidas());
        assertEquals(5, atualizadoDTO.getTotalComentarios());
    }

    @Test
    public void testAtualizarEvento_EventoNaoEncontrado() {
        when(eventoRepository.findById(eventoId)).thenReturn(Optional.empty());
        assertThrows(AppException.class, () -> {
            eventoService.atualizarEvento(eventoId, eventoDTO);
        });
    }

}
