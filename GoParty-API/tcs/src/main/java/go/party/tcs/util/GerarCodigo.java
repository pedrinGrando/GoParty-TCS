package go.party.tcs.util;

import java.util.Random;

public class GerarCodigo {

    private static final int TAMANHO_CODIGO = 5;

    public static String gerarCodigoRecuperacao() {
        String caracteres = "0123456789";
        StringBuilder codigo = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < TAMANHO_CODIGO; i++) {
            int index = random.nextInt(caracteres.length());
            codigo.append(caracteres.charAt(index));
        }
        return codigo.toString();
    }
}
