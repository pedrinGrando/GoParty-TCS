package go.party.tcs.Enums;

public enum TipoNotificacao {

    CURTIDA("curtida"),
    COMPRA("compra"),
    COMENTARIO("COMENTARIO");

    private String tipo;

    private TipoNotificacao(String tipo) {
        this.tipo = tipo;
    }
}