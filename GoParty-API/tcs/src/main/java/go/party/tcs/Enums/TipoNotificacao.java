package go.party.tcs.Enums;

public enum TipoNotificacao {

    CURTIDA("curtida"),
    COMPRA("compra"),
    COMENTARIO("COMENTARIO"),
    INVITE("INVITE");

    private String type;

    private TipoNotificacao(String type) {
        this.type = type;
    }

    public String getRole(){
        return this.type;
    }
}
