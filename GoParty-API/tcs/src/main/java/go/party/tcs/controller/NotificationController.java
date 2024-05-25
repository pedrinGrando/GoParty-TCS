package go.party.tcs.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import go.party.tcs.model.Notification;
import go.party.tcs.service.NotificationService;

@RestController
@RequestMapping("/v1/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    @PostMapping("/change_visualization/{userId}")
    public ResponseEntity<?> changeVisualization(@PathVariable Long userId) {
        Map<String, String> json = new HashMap<>();
        notificationService.changeVisualization(userId);
        json.put("message", "Notificações visualizadas");
        return ResponseEntity.ok().body(json);
    }

    @GetMapping("/notifications/{userId}")
    public ResponseEntity<?> getNotificationByUserId(@PathVariable Long userId) {
        Map<String, Object> json = new HashMap<>();
        List<Notification> notifications = notificationService.getNotificationByUserId(userId);
        json.put("notifications", notifications);
        return ResponseEntity.ok().body(json);
    }
}
