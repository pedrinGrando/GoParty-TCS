package go.party.tcs.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import go.party.tcs.model.Evento;

@SpringBootTest
public class EventoServiceTest {

    @Autowired
    private EventoService eventoService;

    //Teste para metodo de busca de todos os eventos
    @Test
    public void testGetAllEventos() {
        List<Evento> eventos = eventoService.getAllEventos();
        assertNotNull(eventos);
        assertFalse(eventos.isEmpty()); 
        assertTrue(eventos.get(0).getDataPostagem() instanceof LocalDateTime); 
    }
}
