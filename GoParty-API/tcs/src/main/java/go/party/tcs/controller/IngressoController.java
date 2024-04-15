package go.party.tcs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

    @Autowired
    private NotificationService notificationService;

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


    // Método para exibir a página do evento com os usuários confirmados
    @GetMapping("/perfil/{eventoId}")
    public String exibirUsuariosConfirmados(@PathVariable("eventoId") Integer eventoId, Model model) {
        List<Ingresso> ingressos = ingressoRepository.findByEventoId(eventoId);
        model.addAttribute("ingressos", ingressos); // Adicione a lista de ingressos ao modelo
        return "perfil";
    }


}


