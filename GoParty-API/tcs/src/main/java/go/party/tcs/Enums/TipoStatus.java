package go.party.tcs.Enums;

public enum TipoStatus {

    PENDENTE("pendente"),
    PAGO("pago"),
    CANCELADO("cancelado");

    private String tipo;

    private TipoStatus(String tipo) {
        this.tipo = tipo;
    }
}