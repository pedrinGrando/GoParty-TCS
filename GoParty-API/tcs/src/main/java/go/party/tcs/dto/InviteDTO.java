package go.party.tcs.dto;

import java.time.LocalDateTime;

public class InviteDTO {

    private Long id;
    private LocalDateTime inviteDate;
    private Long graduationId;
    private Long userId;
    private boolean accept;
    private LocalDateTime acceptDate;
    private LocalDateTime rejectDate;

    public InviteDTO() {
    }

    public InviteDTO(Long id, LocalDateTime inviteDate, Long graduationId, Long userId, boolean accept, LocalDateTime acceptDate, LocalDateTime rejectDate) {
        this.id = id;
        this.inviteDate = inviteDate;
        this.graduationId = graduationId;
        this.userId = userId;
        this.accept = accept;
        this.acceptDate = acceptDate;
        this.rejectDate = rejectDate;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getInviteDate() {
        return inviteDate;
    }

    public void setInviteDate(LocalDateTime inviteDate) {
        this.inviteDate = inviteDate;
    }

    public Long getGraduationId() {
        return graduationId;
    }

    public void setGraduationId(Long graduationId) {
        this.graduationId = graduationId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean isAccept() {
        return accept;
    }

    public void setAccept(boolean accept) {
        this.accept = accept;
    }

    public LocalDateTime getAcceptDate() {
        return acceptDate;
    }

    public void setAcceptDate(LocalDateTime acceptDate) {
        this.acceptDate = acceptDate;
    }

    public LocalDateTime getRejectDate() {
        return rejectDate;
    }

    public void setRejectDate(LocalDateTime rejectDate) {
        this.rejectDate = rejectDate;
    }
}
