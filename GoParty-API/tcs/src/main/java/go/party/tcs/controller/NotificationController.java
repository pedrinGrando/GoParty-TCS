package go.party.tcs.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import go.party.tcs.dto.NotificationResponseDTO;
import go.party.tcs.dto.UserIdDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.service.NotificationService;

@RestController
@RequestMapping("/v1/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    @PostMapping("/change_visualization")
    public ResponseEntity<?> changeVisualization(@RequestBody UserIdDTO userIdDTO) {
        Map<String, String> json = new HashMap<>();
        notificationService.markNotificationsAsVisualized(userIdDTO.userId());
        json.put("message", "Notificações visualizadas");
        return ResponseEntity.ok().body(json);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getNotificationByUserId(@RequestBody UserIdDTO userId) {
        Map<String, Object> json = new HashMap<>();
        List<NotificationResponseDTO> notifications = notificationService.getNotificationByUser(userId.userId());
        json.put("notifications", notifications);
        return ResponseEntity.ok().body(json);
    }
}
