package go.party.tcs.Enums;

public enum TipoUsuario {
    USER("user"),
    ADM("adm"),
    MEMBER("member"),
    TEAM("team");

    private String tipo;

    private TipoUsuario(String tipo) {
        this.tipo = tipo;
    }

    public String getRole() {
        return tipo;
    }
}