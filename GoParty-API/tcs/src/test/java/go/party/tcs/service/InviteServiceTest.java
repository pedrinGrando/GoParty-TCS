package go.party.tcs.service;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.InviteDTO;
import go.party.tcs.model.Formatura;
import go.party.tcs.model.Invite;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.FormaturaRepository;
import go.party.tcs.repository.InviteRepository;
import go.party.tcs.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InviteServiceTest {

    @InjectMocks
    private InviteService inviteService;

    @Mock
    private InviteRepository inviteRepository;

    @Mock
    private UsuarioRepository userRepository;

    @Mock
    private FormaturaRepository formaturaRepository;

    @Mock
    private NotificationService notificationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Salvar convite")
    public void testSalvarInvite() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setTipoUsuario(TipoUsuario.STUDENT);
        Formatura formatura = new Formatura();
        formatura.setId(1L);
        formatura.setAdm(usuario);
        Invite invite = new Invite();
        invite.setUsuario(usuario);
        invite.setFormatura(formatura);
        when(userRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(formaturaRepository.findById(1L)).thenReturn(Optional.of(formatura));
        inviteService.save(invite);
        verify(inviteRepository).save(invite);
        verify(notificationService).addNotification(
                formatura.getAdm().getUsername() + " Invite realizado: ",
                usuario.getId(), null
        );
    }

    @Test
    @DisplayName("Erro ao salvar convite pois usuario já é ADM")
    public void testSalvarConviteUsuarioInvalido() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setTipoUsuario(TipoUsuario.ADM);
        Formatura formatura = new Formatura();
        formatura.setId(1L);
        Invite invite = new Invite();
        invite.setUsuario(usuario);
        invite.setFormatura(formatura);
        when(userRepository.findById(1L)).thenReturn(Optional.of(usuario));
        assertThrows(RuntimeException.class, () -> inviteService.save(invite));
    }

    @Test
    @DisplayName("Aceitar convite")
    public void testAceitaConvite() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setTipoUsuario(TipoUsuario.STUDENT);
        Formatura formatura = new Formatura();
        formatura.setId(1L);
        Invite invite = new Invite();
        invite.setId(1L);
        invite.setUsuario(usuario);
        invite.setFormatura(formatura);
        when(inviteRepository.findById(1L)).thenReturn(Optional.of(invite));
        when(userRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(formaturaRepository.findById(1L)).thenReturn(Optional.of(formatura));
        inviteService.acceptInvite(1L);
        assertTrue(invite.isAccept());
        assertNotNull(invite.getAcceptDate());
        assertEquals(TipoUsuario.MEMBER, usuario.getTipoUsuario());
        verify(inviteRepository).save(invite);
        verify(userRepository).save(usuario);
    }

    @Test
    @DisplayName("Buscando os convites pelo id do usuario")
    public void testGetConviteByUserId() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        Formatura formatura = new Formatura();
        formatura.setId(1L);
        Invite invite1 = new Invite();
        invite1.setUsuario(usuario);
        invite1.setFormatura(formatura);
        Invite invite2 = new Invite();
        invite2.setUsuario(usuario);
        invite2.setFormatura(formatura);
        when(inviteRepository.findPendingInvitesByUserId(1L)).thenReturn(Arrays.asList(invite1, invite2));
        List<InviteDTO> result = inviteService.getInvitesByUserId(1L);
        assertEquals(2, result.size());
    }

    @Test
    @DisplayName("Rejeitando um convite")
    public void testRejeitarConvite() {
        Usuario user = new Usuario();
        user.setId(1L);
        Formatura formatura = new Formatura();
        formatura.setId(1L);
        Invite invite = new Invite();
        invite.setId(1L);
        invite.setUsuario(user);
        invite.setFormatura(formatura);
        when(inviteRepository.findById(1L)).thenReturn(Optional.of(invite));
        inviteService.rejectInvite(1L);
        assertFalse(invite.isAccept());
        assertNotNull(invite.getRejectDate());
        verify(inviteRepository).save(invite);
    }

}