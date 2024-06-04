package go.party.tcs.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import go.party.tcs.Enums.TipoNotificacao;
import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.InviteDTO;
import go.party.tcs.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;

import go.party.tcs.model.Formatura;
import go.party.tcs.model.Invite;
import go.party.tcs.repository.FormaturaRepository;
import go.party.tcs.repository.InviteRepository;
import go.party.tcs.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class InviteService {

    @Autowired
    private InviteRepository inviteRepository;

    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private FormaturaRepository graduationRepository;

    @Autowired
    private NotificationService notificationService;

    public Invite save(Invite invite) throws RuntimeException {
        Usuario user = this.isPresent(userRepository.findById(invite.getUser().getId()));
        if (user.getTipoUsuario() != TipoUsuario.STUDENT) {
            throw new RuntimeException("Esse usuario não pode ser convidado para uma formatura");
        }
        Formatura graduation = this.isPresent(graduationRepository.findById(invite.getGraduation().getId()));
        invite.setUser(user);
        invite.setGraduation(graduation);
        String notificationMessage = "Você foi convidado para a formatura " + graduation.getTitulo() + "!";
        notificationService.addNotification(notificationMessage, user.getId(), TipoNotificacao.INVITE, graduation.getAdm().getFotoCaminho());
        return inviteRepository.save(invite);
    }

    public void acceptInvite(Long inviteId) {
        Invite invite =  this.isPresent(inviteRepository.findById(inviteId));
        Usuario user = this.isPresent(userRepository.findById(invite.getUser().getId()));
        Formatura graduation = graduationRepository.findById(invite.getGraduation().getId()).get();
        invite.setAccept(true);
        invite.setAcceptDate(LocalDateTime.now());
        user.setTipoUsuario(TipoUsuario.MEMBER);
        user.setFormatura(graduation);
        inviteRepository.save(invite);
        userRepository.save(user);
    }

    public List<InviteDTO> getInvitesByUserId(Long userId) {
        List<Invite> invites = inviteRepository.findByUserId(userId);
        return invites.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public InviteDTO convertToDTO(Invite invite) {
        return new InviteDTO(
                invite.getId(),
                invite.getInviteDate(),
                invite.getGraduation().getId(),
                invite.getUser().getId(),
                invite.isAccept(),
                invite.getAcceptDate(),
                invite.getRejectDate()
        );
    }

    public void rejectInvite(Long inviteId) {
        Invite invite =  this.isPresent(inviteRepository.findById(inviteId));
        invite.setAccept(false);
        invite.setRejectDate(LocalDateTime.now());
        inviteRepository.save(invite);
    }

    private <T> T isPresent(Optional<T> object) {
        if (object.isPresent()) {
            return object.get();
        }
        return null;
    }
}