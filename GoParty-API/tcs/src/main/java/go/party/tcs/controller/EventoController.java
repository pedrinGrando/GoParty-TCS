package go.party.tcs.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.model.Comentario;
import go.party.tcs.model.Curtida;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.ComentarioService;
import go.party.tcs.service.CurtidaService;
import go.party.tcs.service.EventoService;
import go.party.tcs.service.NotificationService;
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

    @Autowired
    private NotificationService notificationService;

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
              evento.setAutor(usuarioAutor);
            //Momento da Postagem
            evento.setDataPostagem(LocalDateTime.now());
            Evento eventoSalvo = eventoRepository.save(evento);
            return ResponseEntity.ok(Map.of("id", eventoSalvo.getId(), "mensagem", "Evento criado com sucesso"));
        } catch (RuntimeException exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar evento.");
        }
    }


    @PostMapping("/upload-event-image/{eventoId}")
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
    

    @CrossOrigin(origins = "http://http:/localhost:5173/") 
    @GetMapping("/buscar-eventos")
    public ResponseEntity<List<Evento>> getAllEvents() {
        List<Evento> events = eventoService.getAllEventos();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PostMapping("/comments/{eventoId}/comment")
    public ResponseEntity<String> criarComentario(@PathVariable Integer eventoId,
                                                   @RequestBody Comentario comentario,
                                                   HttpSession session) {
        try {
            // Recupera o usuário da sessão
            Usuario usuario = (Usuario) session.getAttribute("usuario");

            // Recupera o evento pelo ID
            Evento evento = eventoService.encontrarPorId(eventoId); // Substitua eventoService pelo serviço apropriado

            // Associa o usuário e o evento ao comentário
            comentario.setAutor(usuario);
            comentario.setEvento(evento);

            // Salva o comentário no banco de dados
            comentarioService.save(comentario);

            String message = usuario.getUsername() + " fez um comentário no seu post: " + comentario.getTexto();
          
            return ResponseEntity.ok("Comentário criado com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar comentário.");
        }
    }


    //Metodo para Excluir o Post Evento
    @DeleteMapping("/excluir-evento/{id}")
    public String excluirEvento(@PathVariable Integer id, HttpSession session) {
        Evento evento = eventoService.encontrarPorId(id);
        // Lógica para excluir o evento com base no ID
        if (evento != null) {
            // Exclua as curtidas associadas ao evento
            List<Curtida> curtidas = evento.getCurtidas();
            for (Curtida curtida : curtidas) {
                curtidaService.excluirCurtida(curtida);
            }
            
            // Exclua o evento
            eventoService.excluirEvento(id);
        }
        // Obtém o usuário da sessão atual
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
        // Reinsira o usuário na sessão (isso pode ser ajustado com base na lógica da sua aplicação)
        session.setAttribute("usuario", sessionUsuario);
        // Redirecione para a página perfil
        return "redirect:/perfil";
    }

    //Metodo para Editar o Post Evento
    @PutMapping("/editar-evento/{id}")
    public String editarEvento(@PathVariable Integer id, Model model,
                               @RequestParam(name = "titulo", required = false) String novoTitulo,
                               @RequestParam(name = "descricao", required = false) String novaDescricao,
                               @RequestParam(name = "imagemEvento", required = false) MultipartFile novaImagemEvento,
                               HttpSession session) {
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");

        // Passo 1: Recupere o evento com base no ID.
        Evento eventoNoBanco = eventoService.encontrarPorId(id);

        // Passo 2: Atualize as informações do evento com os novos valores.
        if (novoTitulo != null && !novoTitulo.isEmpty()) {
            eventoNoBanco.setTitulo(novoTitulo);
        }
        if (novaDescricao != null && !novaDescricao.isEmpty()) {
            eventoNoBanco.setDescricao(novaDescricao);
        }
       
        // Passo 3: Atualize as alterações no banco de dados.
        eventoService.atualizarEvento(eventoNoBanco); 

        // Passo 4: Atualizar a sessão com o Post atualizado 
        session.setAttribute("usuario", sessionUsuario);

        return "redirect:/perfil";  
    }

    @PostMapping("/curtirEvento/{eventoId}")
    public String curtirEvento(@PathVariable Integer eventoId, HttpSession session) {
        Evento evento = eventoService.encontrarPorId(eventoId);
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
        curtidaService.curtirEvento(sessionUsuario, evento);
        //Pega a Foto de perfil de quem fez a curtida
        String message = sessionUsuario.getUsername()+" curtiu a sua publicação: "+ evento.getTitulo();
    

        return "redirect:/home";
    }

    @PostMapping("/descurtiEvento/{eventoId}")
    public String descurtirEvento(@PathVariable Integer eventoId, HttpSession session) {
        Evento evento = eventoService.encontrarPorId(eventoId);
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
        curtidaService.descurtirEvento(sessionUsuario, evento);

        return "redirect:/home";
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
