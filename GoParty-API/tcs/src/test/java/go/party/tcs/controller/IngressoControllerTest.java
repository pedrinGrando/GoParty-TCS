package go.party.tcs.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import go.party.tcs.model.Evento;
import go.party.tcs.model.Ingresso;
import go.party.tcs.model.User;
import go.party.tcs.repository.IngressoRepository;
import go.party.tcs.repository.UsuarioRepository;

@WebMvcTest(IngressoController.class)
public class IngressoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IngressoRepository ingressoRepository;

    @MockBean
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ObjectMapper objectMapper;

    //teste para criar um ingresso
    @Test
    public void criarIngressoTest() throws Exception {
        Long userId = 1L;
        User usuario = new User();
        usuario.setId(userId);
        Evento evento = new Evento();
        evento.setId(2L);

        Ingresso ingresso = new Ingresso();
        ingresso.setAutor(usuario);
        ingresso.setEvento(evento);
        ingresso.setDataCompra(LocalDateTime.now());

        when(usuarioRepository.findById(userId)).thenReturn(Optional.of(usuario));
        when(ingressoRepository.save(any(Ingresso.class))).thenReturn(ingresso);

        mockMvc.perform(post("/api/ingressos/comprar-ingresso/")
                .param("userId", userId.toString())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(evento)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.autor.id").value(userId));
    }

    //teste para listar todos os ingressos de um usuário
    @Test
    public void listarIngressosDoUsuarioTest() throws Exception {
        Long usuarioId = 1L;
        List<Ingresso> ingressos = Arrays.asList(new Ingresso(), new Ingresso());

        when(ingressoRepository.findByAutorId(usuarioId)).thenReturn(ingressos);

        mockMvc.perform(get("/api/ingressos/seus-ingressos/{usuarioId}", usuarioId)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(ingressos.size()));
    }
}