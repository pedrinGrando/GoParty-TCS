package go.party.tcs.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import go.party.tcs.Enums.NotificationType;
import go.party.tcs.Enums.UserType;
import go.party.tcs.model.Formatura;
import go.party.tcs.model.Invite;
import go.party.tcs.model.User;
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
        User user = this.isPresent(userRepository.findById(invite.getUser().getId()));
        if (user.getUserType() != UserType.STUDENT) {
            throw new RuntimeException("Esse usuario não pode ser  convidado para uma formatura");
        }
        Formatura graduation = this.isPresent(graduationRepository.findById(invite.getGraduation().getId()));
        invite.setUser(user);
        invite.setGraduation(graduation);
        String notificationMessage = "Você foi convidado para a formatura " + graduation.getTitulo() + "!";
        notificationService.createNotification(notificationMessage, user.getId(), NotificationType.INVITE);
        return inviteRepository.save(invite);
    }

    public void acceptInvite(Long inviteId) {
        Invite invite =  this.isPresent(inviteRepository.findById(inviteId));
        User user = this.isPresent(userRepository.findById(invite.getUser().getId()));
        Formatura graduation = graduationRepository.findById(invite.getGraduation().getId()).get();
        invite.setAccept(true);
        invite.setAcceptDate(LocalDateTime.now());
        user.setUserType(UserType.MEMBER);
        user.setFormatura(graduation);
        inviteRepository.save(invite);
        userRepository.save(user);
    }

    private <T> T isPresent(Optional<T> object) {
        if (object.isPresent()) {
            return object.get();
        }
        return null;
    }
}
