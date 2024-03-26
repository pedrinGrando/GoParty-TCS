package go.party.tcs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.model.Formatura;
import go.party.tcs.service.FormaturaService;
import go.party.tcs.service.UsuarioService;

@RestController
@RequestMapping("/v1/fomaturas")
@CrossOrigin(origins = "http://localhost:5173/")
public class FormaturaController {
    
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private FormaturaService formaturaService;

@PostMapping("/ser-adm")
    public ResponseEntity<String> cadastrarSolicitacaoAdm(@RequestBody Formatura formatura) {
        try {
            //encontrar usuario que fez a solicitação
            
            // Servico de cadastro de usuarios 
             formaturaService.cadastrarSolicitacaoAdm(formatura);

            return ResponseEntity.ok("Solicitação realizada com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao realizar a solicitação usuário.");
        }
    }

}
