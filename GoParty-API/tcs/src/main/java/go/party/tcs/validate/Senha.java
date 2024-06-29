package go.party.tcs.validate;

public class Senha {

    private static final int TAMANHO_MINIMO = 8;
    private static final int TAMANHO_MAXIMO = 15;

    public static boolean isSenhaValida(String password) {
        if (password == null || password.length() < 8 || password.length() > 15) {
            return false;
        }

        String regexSpecialChar = ".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/\\?].*";
        String regexNumeric = ".*[0-9].*";

        if (!password.matches(regexSpecialChar) || !password.matches(regexNumeric)) {
            return false;
        }

        return true;
    }

}
