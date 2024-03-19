package go.party.tcs.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import go.party.tcs.service.ComentarioService;
import go.party.tcs.service.CurtidaService;
import go.party.tcs.service.EventoService;
import go.party.tcs.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/v1/eventos")
@CrossOrigin(origins = "http://localhost:5173/") // Permitindo requisições apenas do localhost:3000
public class EventoController {
    
    @Autowired
    private EventoService eventoService;

    @Autowired
    private ComentarioService comentarioService;

    @Autowired
    private CurtidaService curtidaService;

    @Autowired
    private NotificationService notificationService;

    private Usuario usuarioLogado = new Usuario();
    
    // Método para Criar um Evento
    @PostMapping("/criar-evento")
    public String criarEvento(@RequestParam("titulo") String titulo,
                            @RequestParam("descricao") String descricao,
                            @RequestParam("imagemEvento") MultipartFile imagemEvento,
                            @RequestParam("estado") String estado,
                            @RequestParam("cidade") String cidade,
                            @RequestParam("bairro") String bairro,
                            @RequestParam("valor") String valor,
                            @RequestParam("horario") String horario,
                            HttpSession session) throws IOException {

        // Recupere o usuário da sessão
        // chave "usuario"
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        usuarioLogado = usuario;

        
        Evento evento = new Evento(titulo, descricao, usuario, valor, horario);
    
        evento.setEstado(estado);
        evento.setCidade(cidade);
        evento.setBairro(bairro);

        
        if (!imagemEvento.isEmpty()) {
            byte[] imagemBytes = imagemEvento.getBytes();
            evento.setFotoEvento(imagemBytes); // Supondo que você tenha um método setImagem para o evento
        }
        
        
        eventoService.criarEvento(evento, null);

        return "redirect:/home";
    }

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

            // NOTIFICAR O USUÀRIO
            // Crie uma notificação
            byte[] fotoPerfil = usuario.getFotoPerfil();
            String message = usuario.getUsername() + " fez um comentário no seu post: " + comentario.getTexto();
            Integer userIdToNotify = evento.getAutor().getId();

            if (userIdToNotify != usuario.getId()) {
                notificationService.createNotification(message, userIdToNotify, fotoPerfil);
            }

            return ResponseEntity.ok("Comentário criado com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar comentário.");
        }
    }

    
    //Método para mostrar os eventos do Usuario no seu perfil
    @GetMapping("/perfil")
    public String mostrarPerfil(Model model, HttpSession session, HttpServletRequest request) {
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");

        //CONTADOR DE NOTIFICACOES NAO VISUALIZADAS
        int notificacoesNaoVisualizadas = notificationService.contarNotificacoesNaoVisualizadas(sessionUsuario.getId());
        model.addAttribute("notificacoesNaoVisualizadas", notificacoesNaoVisualizadas);

        if (sessionUsuario != null) {
            // Obtenha o ID do usuário da sessão
            Integer userId = sessionUsuario.getId();

            // Use o ID do usuário para buscar eventos criados por esse usuário no banco de dados
            List<Evento> eventosDoUsuario = eventoService.buscarEventosPorAutor(userId);

            // Adicione a lista de eventos ao modelo para exibição na página
            model.addAttribute("eventos", eventosDoUsuario);

            // ... outras atribuições ao modelo
            model.addAttribute("sessionUsuario", sessionUsuario);
            // ...

            return "perfil";
        } else {
            // O usuário não está autenticado, redirecione para a página de login
            return "redirect:/login";
        }
    }
    
    //Metodo para adicionar imagem no post Evento
    @GetMapping("/evento-imagem/{eventoId}")
    public ResponseEntity<byte[]> getImagemEvento(@PathVariable Integer eventoId) {
        // Recupere os detalhes do evento com base no ID do evento
        Evento evento = eventoService.encontrarPorId(eventoId);

        // Verifique se o evento foi encontrado
        if (evento != null) {
            // Recupere a imagem do evento
            byte[] imagemEvento = evento.getFotoEvento();

            if (imagemEvento != null && imagemEvento.length > 0) {
                // Defina os cabeçalhos de resposta
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG); // ou MediaType.IMAGE_PNG, dependendo do tipo de imagem

                // Retorna a imagem como uma resposta HTTP
                return new ResponseEntity<>(imagemEvento, headers, HttpStatus.OK);
            }
        }

        // Se o evento não for encontrado ou não tiver uma imagem, retorne uma resposta vazia ou um erro
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
        if (novaImagemEvento != null && !novaImagemEvento.isEmpty()) {
            try {
                // Lógica para salvar a nova imagem do evento no seu sistema de arquivos ou banco de dados.
                byte[] novaImagemBytes = novaImagemEvento.getBytes();
                eventoNoBanco.setFotoEvento(novaImagemBytes);;
            } catch (IOException e) {
                
                e.printStackTrace();
            }
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
        byte[] fotoPerfil = sessionUsuario.getFotoPerfil();
        String message = sessionUsuario.getUsername()+" curtiu a sua publicação: "+ evento.getTitulo();
        Integer userIdToNotify =  evento.getAutor().getId();

        if(userIdToNotify != sessionUsuario.getId()){
            notificationService.createNotification(message, userIdToNotify, fotoPerfil);
         }

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
