package go.party.tcs.Enums;

public enum UserType {

    BASIC("basic"),
    ADM("adm"),
    STUDENT("student"),
    MEMBER("member");

    private String type;

    private UserType(String type) {
        this.type = type;
    }

    public String getRole() {
        return type;
    }
}