package go.party.tcs.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import go.party.tcs.model.Curtida;
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
import go.party.tcs.service.FollowerService;
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
    private FollowerService followerService;
    
    @Autowired
    private EventoService eventoService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    Usuario usuarioLogado = new Usuario();

    Usuario usuarioPerfilVisitado = new Usuario();

   @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody Usuario usuario) {
        try {
            // Criptrografia de Senha
            String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
            usuario.setSenha(senhaCriptografada);

            // Servico de cadastro de usuarios 
            usuarioService.cadastrarUsuario(usuario);

            return ResponseEntity.ok("Usuário cadastrado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário.");
        }
    }

    //Autenticação
    @PostMapping("/auth")
    public ResponseEntity<String> login(@RequestBody Map<String, String> requestBody) {
        
        String username = requestBody.get("username");
        String senha = requestBody.get("senha");

        try {
            Usuario usuario = usuarioService.findByUsername(username);

            if (usuario != null) {
                if (passwordEncoder.matches(senha, usuario.getSenha())) {
                    // Autenticação bem-sucedida
                    return ResponseEntity.ok("Login bem-sucedido!");
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nome de usuário ou senha inválidos.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a solicitação de login.");
        }
    }

    //Método para atribuir uma sessão ao usuario que fizer login
    @GetMapping("/home")
    public String paginaHome(Model model, HttpSession session, HttpServletRequest request) {
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");

        if (sessionUsuario == null) {
            return "redirect:/loginValida";
        }

        // Lista de Notificações do usuário(Sessão)
        List<Notification> notifications = notificationRepository.findByUserId(sessionUsuario.getId());

        // CONTADOR DE NOTIFICAÇÕES NÃO VISUALIZADAS
        int notificacoesNaoVisualizadas = notificationService.contarNotificacoesNaoVisualizadas(sessionUsuario.getId());

        // LISTA DE EVENTOS
        List<Evento> eventos = eventoService.getAllEventos();

        // Crie um mapa para armazenar a quantidade de curtidas por evento
        Map<Integer, Integer> quantidadeCurtidasPorEvento = new HashMap<>();

        // Crie um mapa para armazenar se o usuário já curtiu cada evento
        Map<Integer, Boolean> usuarioJaCurtiuEventoMap = new HashMap<>();

        for (Evento evento : eventos) {
            int numeroCurtidas = curtidaRepository.quantidadeCurtidasPorEvento(evento.getId());
            boolean usuarioJaCurtiuEvento = curtidaService.usuarioJaCurtiuEvento(evento.getId(), sessionUsuario);
            quantidadeCurtidasPorEvento.put(evento.getId(), numeroCurtidas);
            usuarioJaCurtiuEventoMap.put(evento.getId(), usuarioJaCurtiuEvento);
        }

        //EVENTOS EM ALTA(MAIS CURTIDOS)
       List<Curtida> curtidas = curtidaService.getAllCurtidas(); // Lista para buscar todos as curtidas do sistema
       List<Evento> eventosEmAlta = eventoService.getAllEventos(); // onde será armazenado os eventos em alta

       Map<Integer, Integer> curtidasPorEvento = new HashMap<>();

       for (Curtida curtida : curtidas) {
        Integer eventoId = curtida.getEvento().getId();
        curtidasPorEvento.put(eventoId, curtidasPorEvento.getOrDefault(eventoId, 0) + 1);
     }

        eventos.sort((evento1, evento2) -> Integer.compare(
            curtidasPorEvento.getOrDefault(evento2.getId(), 0),
            curtidasPorEvento.getOrDefault(evento1.getId(), 0)
        ));

        eventosEmAlta = eventos.subList(0, Math.min(eventos.size(), 5));

        return "home";
    }

    //Metodo para Editar a Conta do Usuario
    @PutMapping("/update")
    public ResponseEntity<String> editarUsuario(
        @RequestParam(name = "usuarioNome", required = false) String novoUsuarioNome,
        @RequestParam(name = "email", required = false) String novoEmail,
        @RequestParam(name = "descricao", required = false) String novaDescricao,
        @RequestParam(name = "idade", required = false) String novaIdade,
        @RequestParam(name = "senha", required = false) String novaSenha,
        HttpSession session
    ) {
        try {
            // Passo 1: Recupere o usuário da sessão.
            Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");

            // Passo 2: Obtenha o ID do usuário da sessão.
            Integer userId = sessionUsuario.getId();

            // Passo 3: Use o ID para carregar o usuário correspondente do banco de dados.
            Usuario usuarioNoBanco = usuarioService.encontrarId(userId); // Substitua 'usuarioService' pelo seu serviço de usuário.

            // Passo 4: Atualize as informações do usuário com os novos valores.
            if (novoUsuarioNome != null && !novoUsuarioNome.isEmpty()) {
                usuarioNoBanco.setUsername(novoUsuarioNome);
            }
            if (novoEmail != null && !novoEmail.isEmpty()) {
                usuarioNoBanco.setEmail(novoEmail);
            }
            if (novaDescricao != null && !novaDescricao.isEmpty()) {
                usuarioNoBanco.setDescricao(novaDescricao);
            }
            if (novaIdade != null && !novaIdade.isEmpty()) {
                LocalDate idade = LocalDate.parse(novaIdade);
                usuarioNoBanco.setIdade(idade);
            }
            if (novaSenha != null && !novaSenha.isEmpty()) {
                String senhaCriptografada = passwordEncoder.encode(novaSenha);
                usuarioNoBanco.setSenha(senhaCriptografada);
            }
            usuarioService.atualizarUsuario(usuarioNoBanco); 

            return ResponseEntity.ok("Usuário atualizado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar usuário.");
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
                    
                    // Associa a imagem de perfil ao usuário
                    sessionUsuario.setFotoPerfil(fotoBytes);
                    
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

    //Metodo para adicionar foto do Perfil do Usuario da Sessão
    @GetMapping("/perfil-imagem-session/{usuarioId}")
    public ResponseEntity<byte[]> getImagemPerfilSession(@PathVariable Integer usuarioId, HttpSession session) {
        
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
        
        if (sessionUsuario != null && sessionUsuario.getId().equals(usuarioId)) {

            byte[] imagemPerfil = sessionUsuario.getFotoPerfil();
            if (imagemPerfil != null && imagemPerfil.length > 0) {
                // Defina os cabeçalhos de resposta
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG); 

                // Retorna a imagem como uma resposta HTTP
                return new ResponseEntity<>(imagemPerfil, headers, HttpStatus.OK);
            }
        }
        
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    //Metodo para adicionar fotos de Perfil dos Usuarios
    @GetMapping("/perfil-imagem/{usuarioId}")
    public ResponseEntity<byte[]> getImagemPerfil(@PathVariable Integer usuarioId) {
        // Recupere os detalhes do usuário com base no ID do usuário
        Usuario usuario = usuarioService.encontrarId(usuarioId);
        usuarioPerfilVisitado = usuario;

        // Verifique se o usuário foi encontrado
        if (usuario != null) {
            // Recupere a imagem de perfil do usuário
            byte[] imagemPerfil = usuario.getFotoPerfil();

            if (imagemPerfil != null && imagemPerfil.length > 0) {
                
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG); // ou MediaType.IMAGE_PNG, dependendo do tipo de imagem

                // Retorna a imagem como uma resposta HTTP
                return new ResponseEntity<>(imagemPerfil, headers, HttpStatus.OK);
            }
        }
        // Se o usuário não for encontrado ou não tiver uma imagem de perfil, retorne uma resposta vazia ou um erro
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //Metodo para mostrar a foto do Perfil do Usuario que fez a notificação 
    @GetMapping("/perfil-imagem-notification/{id}")
    public ResponseEntity<byte[]> getImagemPerfilNotification(@PathVariable Long id) {

        Notification notification = notificationRepository.findById(id).orElse(null);
       
        // Verifica se a notificação foi encontrada
        if (notification == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Recupera o usuário com o id especificado
        Usuario usuario = usuarioRepository.findById(notification.getUserId()).orElse(null);

        // Verifica se o usuário foi encontrado
        if (usuario == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Recupera a imagem de perfil do usuário
        byte[] imagemPerfil = notification.getFotoPerfil();

        // Retorna a imagem de perfil
        return new ResponseEntity<>(imagemPerfil, HttpStatus.OK);
    }

    @PostMapping("/follow/{id}")
    public ResponseEntity<String> followUser(@PathVariable Integer id, HttpSession session) {
        try {
            Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");

            Usuario follower = usuarioService.getUserById(sessionUsuario.getId());
            Usuario following = usuarioService.getUserById(id);

            usuarioService.follow(follower, following);

            // NOTIFICAR O USUÀRIO
            // Crie uma notificação
            byte[] fotoPerfil = sessionUsuario.getFotoPerfil();
            String message = follower.getUsername() + " seguiu você";
            Integer userIdToNotify = id;

            notificationService.createNotification(message, userIdToNotify, fotoPerfil);

            return ResponseEntity.ok("Usuário seguido com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao seguir usuário.");
        }
    }

    @PostMapping("/unfollow/{id}")
    public ResponseEntity<String> unfollowUser(@PathVariable Integer id, HttpSession session) {
        try {
            Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");

            Usuario follower = usuarioService.getUserById(sessionUsuario.getId());
            Usuario following = usuarioService.getUserById(id);

            usuarioService.unfollow(follower, following);

            return ResponseEntity.ok("Usuário deixou de seguir com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao deixar de seguir usuário.");
        }
    }

    @GetMapping("/notifications")
    public String notificacoes(Model model, HttpSession session, HttpServletRequest request) {
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
    
        if (sessionUsuario != null) {
            // Obtenha as notificações do usuário logado
            List<Notification> notifications = notificationRepository.findNotificationsByUserIdOrderByDateDesc(sessionUsuario.getId());
            List<String> temposDecorridos = new ArrayList<>();

            // Marque as notificações como visualizadas
            for (Notification notification : notifications) {
                notification.setVisualizado(true);
                String tempoDecorrido = notificationService.calcularTempoDecorrido(notification.getDate());
                temposDecorridos.add(tempoDecorrido);
            }
            notificationRepository.saveAll(notifications);
    
            model.addAttribute("notifications", notifications);
            model.addAttribute("temposDecorridos", temposDecorridos);
            model.addAttribute("sessionUsuario", sessionUsuario);

            //model.addAttribute("calcularTempoDecorrido", notificationService.calcularTempoDecorrido(ontemInicioDoDia));
    
            List<Evento> eventos = eventoService.getAllEventos();
            model.addAttribute("eventos", eventos);
    
            return "notificacoes"; // Redirecione o usuário para a página de notificações
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

    @PostMapping("/enviarMensagem/{usuarioIdReceiver}/{message}")
    public ResponseEntity<String> enviarMensagem(@PathVariable Integer usuarioIdReceiver, @PathVariable String message, HttpSession session, HttpServletRequest request) {

        Usuario idUsuarioSessao = (Usuario) session.getAttribute("usuario");

        try {
            // Supondo que você tem um serviço para salvar a mensagem
            mensagemService.salvarMensagem(usuarioIdReceiver, message, idUsuarioSessao.getId());
            
            return ResponseEntity.ok("Mensagem enviada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro ao enviar a mensagem: " + e.getMessage());
        }
    }

    @GetMapping("/check-username/{username}")
    public ResponseEntity<Map<String, Boolean>> checkUsernameExists(@PathVariable String username) {
        boolean exists = usuarioService.checkUsernameExists(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> exibirPerfil(@PathVariable Integer id, HttpSession session) {
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");
        // Buscar o usuário com o ID especificado no banco de dados
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            
            // Buscar os eventos criados por esse usuário com base no ID do usuário
            List<Evento> eventosDoUsuario = eventoService.buscarEventosPorAutor(id);

            // MOSTRAR CONTADOR DE SEGUIDORES
            List<Usuario> followers = usuarioService.getFollowers(usuario);
            List<Usuario> following = usuarioService.getFollowing(usuario);

            // Verificar se o sessionUsuario está na lista de followers
            boolean isUserInFollowers = followerService.isUserInFollowersList(sessionUsuario, usuario);
            boolean isNotFollower = !isUserInFollowers;

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("usuario", usuario);
            responseData.put("eventos", eventosDoUsuario);
            responseData.put("followersCount", followers.size());
            responseData.put("followingCount", following.size());

            // Adicionar apenas se sessionUsuarioIsFollower for verdadeira
            if (isUserInFollowers) {
                responseData.put("sessionUsuarioIsFollower", "Você segue " + usuario.getUsername());
            } else {
                responseData.put("isNotFollower", isNotFollower);
            }

            //CONTADOR DE NOTIFICACOES NAO VISUALIZADAS
            int notificacoesNaoVisualizadas = notificationService.contarNotificacoesNaoVisualizadas(sessionUsuario.getId());
            responseData.put("notificacoesNaoVisualizadas", notificacoesNaoVisualizadas);

            return ResponseEntity.ok(responseData);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    @GetMapping("/usuarios")
    public ResponseEntity<?> listarUsuarios(HttpSession session) {
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");

        if (sessionUsuario != null) {
            //CONTADOR DE NOTIFICACOES NAO VISUALIZADAS
            int notificacoesNaoVisualizadas = notificationService.contarNotificacoesNaoVisualizadas(sessionUsuario.getId());

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
                // Verifica se o usuário da sessão está seguindo este usuário
                boolean isUserFollowing = followerService.isUserInFollowersList(sessionUsuario, usuario);
                usuarioInfo.put("isUserFollowing", isUserFollowing);
                usuariosResponse.add(usuarioInfo);
            }

            // Monta a resposta
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("notificacoesNaoVisualizadas", notificacoesNaoVisualizadas);
            responseData.put("usuarios", usuariosResponse);

            return ResponseEntity.ok(responseData);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
        }
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
            int notificacoesNaoVisualizadas = notificationService.contarNotificacoesNaoVisualizadas(sessionUsuario.getId());

            // Preencha o Map com informações sobre se o usuário da sessão está seguindo cada usuário
            Map<Integer, Boolean> seguirStatusMap = new HashMap<>();
            for (Usuario usuario : usuarios) {
                boolean isUserFollowing = followerService.isUserInFollowersList(sessionUsuario, usuario);
                seguirStatusMap.put(usuario.getId(), isUserFollowing);
            }

            // Montar a resposta
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("notificacoesNaoVisualizadas", notificacoesNaoVisualizadas);
            responseData.put("usuarios", usuarios);
            responseData.put("sessionUser", sessionUsuario);
            responseData.put("seguirStatusMap", seguirStatusMap);

            return ResponseEntity.ok(responseData);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
        }
    }

}
