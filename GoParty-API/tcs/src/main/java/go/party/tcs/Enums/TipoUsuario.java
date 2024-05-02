package go.party.tcs.Enums;

public enum TipoUsuario {

    BASIC("basic"),
    ADM("adm"),
    STUDENT("student"),
    MEMBER("member");

    private String tipo;

    private TipoUsuario(String tipo) {
        this.tipo = tipo;
    }

    public String getRole() {
        return tipo;
    }
}