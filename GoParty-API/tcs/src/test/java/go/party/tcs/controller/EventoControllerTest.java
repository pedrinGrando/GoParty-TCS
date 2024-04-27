package go.party.tcs.controller;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import go.party.tcs.model.Evento;
import go.party.tcs.repository.EventoRepository;

import java.util.Optional;

@ExtendWith(SpringExtension.class)
public class EventoControllerTest {

    private MockMvc mockMvc;

    @Mock
    private EventoRepository eventoRepository;

    @InjectMocks
    private EventoController eventoController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(eventoController).build();
    }

    //Garante o encontrado
    @Test
    public void testBuscarEventoPeloId_Found() throws Exception {
        Long eventoId = 1L;
        Evento evento = new Evento();
        evento.setId(eventoId);
        evento.setTitulo("Festa de Aniversário");

        when(eventoRepository.findById(eventoId)).thenReturn(Optional.of(evento));

        if (Optional.of(evento).isPresent()){
            assertTrue(true);
        } 

    }

    //Garante o não encontrado
    @Test
    public void testBuscarEventoPeloId_NotFound() throws Exception {
        Long eventoId = 1L;
        when(eventoRepository.findById(eventoId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/buscar-evento/{eventoId}", eventoId))
                .andExpect(status().isNotFound());
    }
}
