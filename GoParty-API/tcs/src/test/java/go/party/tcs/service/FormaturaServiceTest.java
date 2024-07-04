package go.party.tcs.service;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.model.AppException;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Formatura;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.CurtidaRepository;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.FormaturaRepository;
import go.party.tcs.repository.UsuarioRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.then;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;


@ExtendWith(MockitoExtension.class)
class FormaturaServiceTest {

    @Mock
    private FormaturaRepository formaturaRepository;
    @Mock
    private UsuarioService usuarioService;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private CurtidaRepository curtidaRepository;
    @Mock
    private EventoService eventoService;
    @Mock
    private EventoRepository eventoRepository;
    @InjectMocks
    private FormaturaService formaturaService;
    @Captor
    private ArgumentCaptor<Formatura> formaturaCaptor;

    private Usuario usuario;
    private Formatura formatura;

    @Test
    @DisplayName("Cadastrar solicitação de Administrador - Usuário já é ADM")
    void usuarioJaEhADM() {
        usuario = new Usuario();
        usuario.setTipoUsuario(TipoUsuario.ADM);
        given(usuarioService.findById(1L)).willReturn(usuario);
        AppException exception = assertThrows(AppException.class, () -> {
            formaturaService.cadastrarAdm(1L, formatura);
        });
        assertEquals("Usuario já é ADM!", exception.getMessage());
    }

    @Test
    @DisplayName("Cadastrar solicitação de Administrador - Usuário não é estudante")
    void usuarioNaoEhEstudante() {
        usuario = new Usuario();
        usuario.setTipoUsuario(TipoUsuario.BASIC);
        given(usuarioService.findById(1L)).willReturn(usuario);
        AppException exception = assertThrows(AppException.class, () -> {
            formaturaService.cadastrarAdm(1L, formatura);
        });
        assertEquals("Usuario não é estudante", exception.getMessage());
    }

    @Test
    @DisplayName("Cadastrar solicitação de Adiministrador")
    void cadastrarSolicitacaoAdiministrador() {
        usuario = new Usuario();
        usuario.setId(1L);
        formatura = new Formatura();
        usuario.setTipoUsuario(TipoUsuario.STUDENT);
        given(usuarioService.findById(1L)).willReturn(usuario);
        formaturaService.cadastrarAdm(1L, formatura);
        then(formaturaRepository).should().save(formaturaCaptor.capture());
        Formatura formaturaSalva = formaturaCaptor.getValue();
        assertNotNull(formaturaSalva);
        assertEquals(usuario.getId(), formaturaSalva.getAdm().getId());
        assertEquals(usuario.getTipoUsuario(), TipoUsuario.ADM);
    }

    @Test
    @DisplayName("Achar a formatura por id da formatura")
    void acharFormaturaPorId() {
        formatura = new Formatura();
        given(formaturaRepository.findById(1L)).willReturn(Optional.of(formatura));
        Formatura formaturaEncontrada = formaturaService.findById(1L);
        then(formaturaRepository).should().findById(1L);
        assertNotNull(formaturaEncontrada);
        assertEquals(formatura.getId(), formaturaEncontrada.getId());
    }

    @Test
    @DisplayName("Não achar a formatra por id da formatura")
    void naoAcharFormaturaPorId() {
        given(formaturaRepository.findById(1L)).willReturn(Optional.empty());
        assertThrows(AppException.class, () -> formaturaService.findById(1L));
    }

    @Test
    @DisplayName("Achar chave pix por id do evento")
    void acharChavePixPorIdEvento() {
        String chavePix = "1234";
        given(eventoService.findChavePixByEventoId(1L)).willReturn(Optional.of(chavePix));
        String chaveRetorno = formaturaService.acharChavePixPorEventoId(1L);
        assertNotNull(chaveRetorno);
        assertEquals(chavePix, chaveRetorno);
    }

    @Test
    @DisplayName("Não deve achar chave pix por id do evento")
    void naoAcharChavePixPorIdEvento() {
        given(eventoService.findChavePixByEventoId(1L)).willReturn(Optional.empty());
        assertThrows(AppException.class, () -> formaturaService.acharChavePixPorEventoId(1L));
    }

}