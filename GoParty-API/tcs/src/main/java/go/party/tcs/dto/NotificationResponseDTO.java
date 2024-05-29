package go.party.tcs.dto;

import java.time.LocalDateTime;

public record NotificationResponseDTO(
        Long id,
        String message,
        LocalDateTime notificationDate,
        Long userId,
        boolean visualized
) {
}
