package go.party.tcs.service;

import go.party.tcs.dto.UsuarioResponseDTO;
import go.party.tcs.model.AppException;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.validate.Senha;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private Usuario usuario;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private JWTService jwtService;

    @Mock
    private AuthenticationManager manager;

    @Mock
    private EmailService emailService;

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Teste de sucesso ao realizar login")
    void testLogin() {
        when(manager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(usuario, null, null));
        when(jwtService.generateToken(any(Usuario.class))).thenReturn("mock-jwt-token");
        when(usuario.isAtivo()).thenReturn(true);
        Map<String, Object> response = authService.login(usuario);
        assertNotNull(response);
        assertEquals("mock-jwt-token", response.get("token"));
        assertTrue(response.get("usuario") instanceof UsuarioResponseDTO);
    }

    @Test
    @DisplayName("Usuario inativo tenta logar no sistema")
    void testLoginInativo() {
        when(manager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(usuario, null, null));
        when(jwtService.generateToken(any(Usuario.class))).thenReturn("mock-jwt-token");
        when(usuario.isAtivo()).thenReturn(false);
        assertThrows(AppException.class, () -> authService.login(usuario));
    }

// TODO implementar esse teste corretamente
//    @Test
//    void testCadastroUsuario() throws MessagingException, AppException {
//        try (MockedStatic<Senha> mocked = mockStatic(Senha.class)) {
//            given(usuario.getEmail()).willReturn("teste@exemplo.com");
//            given(usuario.getSenha()).willReturn("SenhaV@l1da");
//            when(passwordEncoder.encode(anyString())).thenReturn("encodedpassword");
//            authService.cadastroUsuario(usuario);
//            verify(emailService, times(1)).sendEmailToClient(eq(usuario.getEmail()), anyString(), anyString());
//            assertNotNull(authService.getCodigoGeradoEmail());
//        }
    }

}