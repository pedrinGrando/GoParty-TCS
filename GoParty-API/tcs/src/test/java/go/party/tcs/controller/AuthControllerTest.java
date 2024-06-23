package go.party.tcs.controller;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import go.party.tcs.Enums.TipoUsuario;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.EmailService;
import go.party.tcs.service.UsuarioService;
import jakarta.mail.MessagingException;

@WebMvcTest(UsuarioController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioService usuarioService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private EmailService emailService;


    @Test
    public void testCadastrarUsuario() throws Exception {
        // cria um objeto de usuário para o teste
        Usuario usuario = new Usuario();
        usuario.setNome("Nome do Usuário");
        usuario.setEmail("email@example.com");
        usuario.setSenha("senha");

      doNothing().when(usuarioService).cadastrarUsuario(any(Usuario.class), TipoUsuario.BASIC);

        mockMvc.perform(post("/cadastro")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(usuario))) // Converte o objeto para JSON
            .andExpect(status().isOk())
            .andExpect(content().string("Usuário cadastrado com sucesso!"));
    }

    // Método auxiliar para converter objeto para JSON
    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Teste para o metodo de checar se existe email
    @Test
    public void testCheckEmailExistsTroca_EmailExists() throws MessagingException {

        // Setup
        String email = "email@example.com";
        when(usuarioRepository.existsByEmail(email)).thenReturn(true);

        //Action
        boolean existsEmail = usuarioRepository.existsByEmail(email);

        // Assert
        assertTrue(existsEmail);
        verify(emailService).sendEmailToClient(eq(email), anyString(), anyString());
    }

    //Teste para o metodo de checar se nao existe email
    @Test
    public void testCheckEmailExistsTroca_EmailNotExists() throws MessagingException {
        // Setup
        String email = "test@example.com";
        when(usuarioRepository.existsByEmail(email)).thenReturn(false);

        // Action
        boolean existsEmail = usuarioRepository.existsByEmail(email);

        // Assert
        assertFalse(existsEmail);
        verify(emailService, never()).sendEmailToClient(anyString(), anyString(), anyString());
    }
}
