package go.party.tcs.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.dto.InviteDTO;
import go.party.tcs.model.Invite;
import go.party.tcs.service.InviteService;

@RestController
@RequestMapping("/v1/invite")
public class InviteController {

    @Autowired
    private InviteService inviteService;

    @PostMapping("/send")
    public ResponseEntity<?> inviteStudent(@RequestBody InviteDTO inviteDTO) {
        Map<String, String> json = new HashMap<>();
        Invite invite = new Invite(
            inviteDTO.graduationId(), 
            inviteDTO.studentId(), 
            LocalDateTime.now()
        );
        invite = inviteService.save(invite);
        json.put("message", "Convite enviado com sucesso!");
        return ResponseEntity.ok().body(json);
    }

    @PostMapping("/accept/{inviteId}")
    public ResponseEntity<?> acceptInvite(@PathVariable Long inviteId) {
        Map<String, String> json = new HashMap<>();
        inviteService.acceptInvite(inviteId);
        json.put("message", "Convite aceito com sucesso!");
        return ResponseEntity.ok().body(json);
    }
} 
