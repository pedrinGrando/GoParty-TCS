package go.party.tcs.Enums;

public enum NotificationType {

    CURTIDA("curtida"),
    COMPRA("compra"),
    COMENTARIO("COMENTARIO"),
    INVITE("INVITE");

    private String type;

    private NotificationType(String type) {
        this.type = type;
    }

    public String getRole(){
        return this.type;
    }
}