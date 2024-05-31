package go.party.tcs.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import go.party.tcs.dto.NotificationDTO;
import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import go.party.tcs.service.NotificationService;

@RestController
@RequestMapping("/v1/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private NotificationRepository notificationRepository;

    @PutMapping("/change_visualization/{userId}")
    public ResponseEntity<?> changeVisualization(@PathVariable Long userId) {
        Map<String, String> json = new HashMap<>();
        notificationService.markNotificationsAsVisualized(userId);
        json.put("message", "Notificações visualizadas");
        return ResponseEntity.ok().body(json);
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationByUserId(@PathVariable Long userId) {
        List<NotificationDTO> notifications = notificationService.getNotificationByUser(userId);
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/count-notifications/{userId}")
    public ResponseEntity<Integer> getNotificationCount(@PathVariable Long userId) {
       int count = notificationRepository.countByVisualizadoFalseAndUsuarioId(userId);
        return ResponseEntity.ok(count);
    }
}
