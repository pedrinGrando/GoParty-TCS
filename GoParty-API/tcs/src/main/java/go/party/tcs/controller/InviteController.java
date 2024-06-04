package go.party.tcs.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import go.party.tcs.model.Formatura;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.FormaturaRepository;
import go.party.tcs.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import go.party.tcs.dto.InviteDTO;
import go.party.tcs.model.Invite;
import go.party.tcs.service.InviteService;

@RestController
@RequestMapping("/v1/invite")
public class InviteController {

    @Autowired
    private InviteService inviteService;
    @Autowired
    private FormaturaRepository formaturaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;



@PostMapping("/send-invite/{userId}/{gradId}")
    public ResponseEntity<String> createInvite(@PathVariable Long userId, @PathVariable Long gradId) {
    Optional<Usuario> usuarioOptional = usuarioRepository.findById(userId);
    Optional<Formatura> formOptional = formaturaRepository.findById(gradId);
        try {
            Invite invite = new Invite();
            invite.setInviteDate(LocalDateTime.now());
            invite.setAccept(false);
            invite.setUser(usuarioOptional.get());
            invite.setGraduation(formOptional.get());
            Invite savedInvite = inviteService.save(invite);
            return ResponseEntity.ok("Convite enviado com sucesso.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/accept/{inviteId}")
    public ResponseEntity<?> acceptInvite(@PathVariable Long inviteId) {
        Map<String, String> json = new HashMap<>();
        inviteService.acceptInvite(inviteId);
        json.put("message", "Convite aceito com sucesso!");
        return ResponseEntity.ok().body(json);
    }

    @PostMapping("/reject/{inviteId}")
    public ResponseEntity<?> rejectInvite(@PathVariable Long inviteId) {
        Map<String, String> json = new HashMap<>();
        inviteService.rejectInvite(inviteId);
        json.put("message", "Convite aceito com sucesso!");
        return ResponseEntity.ok().body(json);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InviteDTO>> getInvitesByUserId(@PathVariable Long userId) {
        try {
            List<InviteDTO> invites = inviteService.getInvitesByUserId(userId);
            return ResponseEntity.ok(invites);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}