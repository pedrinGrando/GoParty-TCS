package go.party.tcs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import go.party.tcs.model.Evento;
import go.party.tcs.model.Ingresso;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.IngressoRepository;
import go.party.tcs.service.IngressoService;
import go.party.tcs.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;


// Importações omitidas por brevidade

@Controller
public class IngressoController {
    
    @Autowired
    IngressoRepository ingressoRepository;

    @Autowired
    EventoRepository eventoRepository; 

    @Autowired
    IngressoService ingressoService;


    @GetMapping("/ingressos")
    public String ingressos(Model model, HttpSession session, HttpServletRequest request){
        Usuario sessionUsuario = (Usuario) session.getAttribute("usuario");

        if (sessionUsuario != null) {
            //List<Ingresso> ingressos = ingressoRepository.findByIdUsuario(sessionUsuario.getId());
            //model.addAttribute("ingressos", ingressos);
        }
        model.addAttribute("sessionUsuario", sessionUsuario);
        return "ingressos";
    }


    // @PostMapping("/comprar-ingresso")
    // private String comprarIngresso(@RequestParam("eventoId") Long eventoId,
    //                             @RequestParam("cpfComprador") String cpfComprador,
    //                             Model model,
    //                             HttpSession session){

    //     Usuario usuario = (Usuario) session.getAttribute("usuario");
    //     Long idUsuario = usuario.getId();
        
    //     // Buscar o evento no banco de dados com base no eventoId
    //     //Evento evento = eventoRepository.findById(eventoId);
        
    //     if (evento != null) {
    //         // Gerar o código aleatório para o ingresso
    //         String codigoIngresso = Ingresso.gerarCodigoAleatorio();
    //         String status = "Ativo";
    //         // Criar o objeto Ingresso com os IDs já obtidos
    //         Ingresso ingresso = new Ingresso(codigoIngresso, usuario, evento, cpfComprador, status);

    //         ingressoRepository.save(ingresso);

    //         String message = usuario.getUsername()+ " comprou um ingresso para o seu evento: "+evento.getTitulo();

    //         model.addAttribute("sessionUsuario", usuario);
    //         return "redirect:/ingressos";
    //     } else {
    //         // Lógica para lidar com o evento não encontrado
    //         return "eventoNaoEncontrado";
    //     }
    // }

    // Método para exibir a página do evento com os usuários confirmados
    @GetMapping("/perfil/{eventoId}")
    public String exibirUsuariosConfirmados(@PathVariable("eventoId") Integer eventoId, Model model) {
        List<Ingresso> ingressos = ingressoRepository.findByEventoId(eventoId);
        model.addAttribute("ingressos", ingressos); // Adicione a lista de ingressos ao modelo
        return "perfil";
    }

    @PutMapping("/atualizarStatus") 
    public String atualizarStatus(@RequestParam(name ="ingressoId") Integer id, Model model, HttpSession session) {
        Ingresso ingresso = ingressoService.encontra(id);
        
        if (ingresso != null) {
            ingresso.setStatus("Inativo");
            ingressoService.save(ingresso);
            
            Usuario sessionUsuario = (Usuario) session.getAttribute("sessionUsuario");
            if (sessionUsuario != null) {
                session.setAttribute("sessionUsuario", sessionUsuario);
            }
        }
        
        return "redirect:/perfil"; 
    }

}


