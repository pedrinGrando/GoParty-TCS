package go.party.tcs.Enums;

public enum TipoUsuario {

    USER("USER"),
    ADM("ADM"),
    TEAM("TEAM"),
    STUDENT("STUDENT");

    private String tipo;

    private TipoUsuario(String tipo) {
        this.tipo = tipo;
    }

    public String getRole() {
        return this.tipo;
    }
}