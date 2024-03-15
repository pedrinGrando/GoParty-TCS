package go.party.tcs.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import go.party.tcs.model.Usuario;
import go.party.tcs.service.UsuarioService;

@WebMvcTest(UsuarioController.class)
public class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioService usuarioService;

    @Test
    public void testCadastrarUsuario() throws Exception {
        // Criar um objeto de usuário para o teste
        Usuario usuario = new Usuario();
        usuario.setNome("Nome do Usuário");
        usuario.setEmail("email@example.com");
        usuario.setSenha("senha");

      doNothing().when(usuarioService).cadastrarUsuario(any(Usuario.class));

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
}
