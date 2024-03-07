package go.party.tcs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import go.party.tcs.model.Message;
import go.party.tcs.model.Usuario;
import go.party.tcs.service.MensagemService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class ChatController {

    //CADASTRAR UMA MENSAGEM 
    private final MensagemService mensagemService;

    @Autowired
    public ChatController(MensagemService mensagemService) {
        this.mensagemService = mensagemService;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message sendMessage(Message message) {
        return message;
    }

}
