package go.party.tcs.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.dto.EventoDTO;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.ComentarioService;
import go.party.tcs.service.CurtidaService;
import go.party.tcs.service.EventoService;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/v1/eventos")
@CrossOrigin(origins = "http://localhost:5173/") 
public class EventoController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private EventoService eventoService;

    @Autowired
    private ComentarioService comentarioService;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private CurtidaService curtidaService;

    @Value("${file.upload-dir}")
    private String uploadDir;
    
    // Método para Criar um Evento
    @PostMapping("/criar-evento/{userId}")
    public ResponseEntity<?> cadastrarEvento(@PathVariable Long userId, @RequestBody Evento evento) {
        try {

              //encontrar usuario que fez a postagem
              Optional<Usuario> userOptional = usuarioRepository.findById(userId);
              if (!userOptional.isPresent()) {
                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
              }
 
              Usuario usuarioAutor = userOptional.get();
              evento.setUsuario(usuarioAutor);
            //Momento da Postagem
            evento.setDataPostagem(LocalDateTime.now());
            Evento eventoSalvo = eventoRepository.save(evento);
            return ResponseEntity.ok(Map.of("id", eventoSalvo.getId(), "mensagem", "Evento criado com sucesso"));
        } catch (RuntimeException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar evento.");
        }
    }


    @PutMapping("/upload-event-image/{eventoId}")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long eventoId, @RequestParam("file") MultipartFile file) {
        try {
            Optional<Evento> eventoOpcional = eventoRepository.findById(eventoId);
            if (!eventoOpcional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
            }
    
            Evento evento = eventoOpcional.get();
            String filename = eventoId + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    
            evento.setEventoCaminho("/uploads/" + filename);
            eventoRepository.save(evento);
    
            return ResponseEntity.ok("Event image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload event image");
        }
    }
    
    @GetMapping("/buscar-eventos")
    public List<EventoDTO> getAllEventos() {
        List<Evento> eventos = eventoRepository.findAll();
        return eventos.stream()
                      .map(EventoDTO::new)
                      .collect(Collectors.toList());
    }

    //Busca pelo id
    @GetMapping("/buscar-evento/{eventoId}")
    public ResponseEntity<Evento> buscarEventoPeloId(@PathVariable Long eventoId) {
        
        Optional<Evento> eventoOptional =  eventoRepository.findById(eventoId);
        if (eventoOptional.isPresent()){
            Evento evento = eventoOptional.get();
            return new ResponseEntity<>(evento, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }

    @GetMapping("/curtidas/{eventoId}")
    public int obterQuantidadeCurtidas(@PathVariable Integer eventoId, Model model, HttpSession session) {

        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
        // Aqui você deve implementar a lógica para obter a quantidade de curtidas do evento com o ID fornecido
        // Substitua o código abaixo pela lógica real de obtenção de curtidas
        int quantidadeCurtidas = eventoService.obterQuantidadeCurtidas(eventoId);
        model.addAttribute("quantidadeCurtidas", quantidadeCurtidas);

        return quantidadeCurtidas;
    }
}
