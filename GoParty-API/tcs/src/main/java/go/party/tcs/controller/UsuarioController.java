package go.party.tcs.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.model.Evento;
import go.party.tcs.model.Notification;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.ComentarioRepository;
import go.party.tcs.repository.CurtidaRepository;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.NotificationRepository;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.CurtidaService;
import go.party.tcs.service.EmailService;
import go.party.tcs.service.EventoService;
import go.party.tcs.service.MensagemService;
import go.party.tcs.service.NotificationService;
import go.party.tcs.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/v1/usuarios")
@CrossOrigin(origins = "http://localhost:5173/") // Permitindo requisições apenas do localhost:3000
public class UsuarioController {

    @Autowired
    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

     //CADASTRAR UMA MENSAGEM 
     @Autowired
    private MensagemService mensagemService;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CurtidaService curtidaService;

    @Autowired
    private CurtidaRepository curtidaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EventoRepository eventoRepository;
    
    @Autowired
    private EventoService eventoService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${file.upload-dir}")
    private String uploadDir;

    Usuario usuarioCadastro = new Usuario();

    Usuario usuarioPerfilVisitado = new Usuario();
   
    @PostMapping("/{userId}/upload-profile-image")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {

        try {
            Optional<Usuario> userOptional = usuarioRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            Usuario usuario = userOptional.get();
            String filename = userId + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            usuario.setFotoCaminho("/uploads/" + filename);
            usuarioRepository.save(usuario);

            return ResponseEntity.ok("Profile image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile image");
        }
    }


    @DeleteMapping("/deletar")
    public ResponseEntity<String> deletarUsuario(HttpSession session) {
        try {
            Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
            
            if (sessionUsuario != null) {
                // Exclui todos os eventos associados ao usuário
                eventoRepository.deleteByAutor(sessionUsuario);
                comentarioRepository.deleteByAutor(sessionUsuario);

                // Em seguida, excluir o usuário
                usuarioRepository.delete(sessionUsuario);
                
                session.removeAttribute("usuario");
                
                //ENVIO DE EMAIL QUANDO O USUÁRIO EXCLUI CONTA
                String assunto = "Exclusão de conta | GoParty";
                String mensagem = "Você deletou sua conta no GoParty! Esperamos que você volte em breve.";
                emailService.sendEmailToClient(sessionUsuario.getEmail(), assunto, mensagem);       
                
                return ResponseEntity.ok("Conta de usuário excluída com sucesso.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não autenticado.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir conta de usuário.");
        }
    }
    
    //Metodo para adicionar foto do Perfil
    @PostMapping("/upload")
    public String uploadFotoPerfil(@RequestParam("fotoPerfil") MultipartFile fotoPerfil, Model model, HttpSession session) {
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
        
        if (sessionUsuario != null) {
            try {
                // validação da imagem, se necessário
                if (!fotoPerfil.isEmpty()) {
                    // Converte a imagem para um array de bytes
                    byte[] fotoBytes = fotoPerfil.getBytes();
                    
                    // Salva o usuário no banco de dados
                    usuarioService.atualizarUsuario(sessionUsuario);;
                    
                    // Atualiza a sessão com o usuário atualizado
                    session.setAttribute("usuario", sessionUsuario);
                }
                
                model.addAttribute("sessionUsuario", sessionUsuario);
                return "perfil";
            } catch (IOException e) {
                e.printStackTrace();
                return "redirect:/error";
            }
        } else {
            return "redirect:/loginValida";
        }
    }

    @DeleteMapping("/notifications/delete")
    public ResponseEntity<String> excluirNotificacao(@RequestParam("id") Long id) {
        try {
            notificationService.excluirNotificacao(id);
            return ResponseEntity.ok("Notificação excluída com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir notificação.");
        }
    }
    
    @GetMapping("/find/{usuarioId}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Integer usuarioId) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);
        if (usuarioOptional.isPresent()) {
            return ResponseEntity.ok(usuarioOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<String> checkUsernameExists(@RequestParam String username) {
        boolean exists = usuarioService.checkUsernameExists(username);
       
        if (exists){
            return ResponseEntity.ok("Username já cadastrado!");
        }else{
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username não cadastrado!");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username não cadastrado!");
    }

    @GetMapping("/check-email")
    public ResponseEntity<String> checkEmailExists(@RequestParam String email) {

        boolean exists = usuarioRepository.existsByEmail(email);
        if (exists){
            return ResponseEntity.ok("Email já cadastrado!");
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não cadastrado!");
    }

    @GetMapping("/usuarios")
    public ResponseEntity<?> listarUsuarios(HttpSession session) {
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");

        if (sessionUsuario != null) {
            //CONTADOR DE NOTIFICACOES NAO VISUALIZADAS
           // int notificacoesNaoVisualizadas = notificationService.contarNotificacoesNaoVisualizadas(sessionUsuario.getId());

            // Obtem a lista de todos os usuários do sistema
            List<Usuario> usuariosSistema = usuarioService.findAll();

            // Remove o usuário da sessão da lista
            usuariosSistema.remove(sessionUsuario);

            // Cria uma lista de usuários para retornar
            List<Map<String, Object>> usuariosResponse = new ArrayList<>();

            // Preenche a lista de resposta com informações sobre cada usuário
            for (Usuario usuario : usuariosSistema) {
                Map<String, Object> usuarioInfo = new HashMap<>();
                usuarioInfo.put("id", usuario.getId());
                usuarioInfo.put("username", usuario.getUsername());
               
                usuariosResponse.add(usuarioInfo);
            }

            // Monta a resposta
            Map<String, Object> responseData = new HashMap<>();
            //responseData.put("notificacoesNaoVisualizadas", notificacoesNaoVisualizadas);
            responseData.put("usuarios", usuariosResponse);

            return ResponseEntity.ok(responseData);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
        }
    }


    @GetMapping("/search")
    public List<Usuario> searchUsers(@RequestParam String query) {
        // Realiza a pesquisa com base na consulta e retorne os resultados
        return usuarioRepository.findByNomeContaining(query);
    }

    @GetMapping("/explorar")
    public ResponseEntity<?> pesquisarUsuarios(@RequestParam("nomeDigitado") String nomeDigitado, HttpSession session) {
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
        List<Usuario> usuarios;
        if (nomeDigitado == null || nomeDigitado.isEmpty()) {
            usuarios = usuarioService.findAll();
        } else {
            usuarios = usuarioRepository.findByNomeContaining(nomeDigitado);
        }

        if (sessionUsuario != null) {
            //CONTADOR DE NOTIFICACOES NAO VISUALIZADAS
            //int notificacoesNaoVisualizadas = notificationService.contarNotificacoesNaoVisualizadas(sessionUsuario.getId());
            // Montar a resposta
            Map<String, Object> responseData = new HashMap<>();
            //responseData.put("notificacoesNaoVisualizadas", notificacoesNaoVisualizadas);
            responseData.put("usuarios", usuarios);
            responseData.put("sessionUser", sessionUsuario);

            return ResponseEntity.ok(responseData);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
        }
    }

}
