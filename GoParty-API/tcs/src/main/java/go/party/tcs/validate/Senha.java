package go.party.tcs.validate;

public class Senha {

    private static final int TAMANHO_MINIMO = 8;
    private static final int TAMANHO_MAXIMO = 15;

    public static boolean isSenhaValida(String password) {
        if (password == null || password.length() < TAMANHO_MINIMO || password.length() > TAMANHO_MAXIMO) {
            return false;
        }
        String regex = "^(?=.*[0-9])(?=.*[!@#$%^&*()-+]).{8,15}$";
        return password.matches(regex);
    }
}
