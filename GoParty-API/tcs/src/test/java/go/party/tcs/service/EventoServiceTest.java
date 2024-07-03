package go.party.tcs.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
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
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.mock.web.MockMultipartFile;
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

    @Value("${file.upload-dir}")
    private String uploadDir = "/uploads";

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
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

}
