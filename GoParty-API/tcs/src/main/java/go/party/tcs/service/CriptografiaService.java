package go.party.tcs.service;

import javax.crypto.*;

import org.springframework.stereotype.Service;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Service
public class CriptografiaService {

    public static String criptografarMensagem(String mensagemOriginal, SecretKey secretKey) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] mensagemCriptografada = cipher.doFinal(mensagemOriginal.getBytes());
            return Base64.getEncoder().encodeToString(mensagemCriptografada);
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException |
                BadPaddingException | InvalidKeyException e) {
            // Lidando com as exceções
            e.printStackTrace();
            
            return null;
        }
    }

    public String descriptografarMensagem(String mensagemCriptografada, SecretKey secretKey) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
    
            byte[] mensagemBytes = Base64.getDecoder().decode(mensagemCriptografada);
            byte[] mensagemDescriptografada = cipher.doFinal(mensagemBytes);
    
            return new String(mensagemDescriptografada);
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException |
                 BadPaddingException | InvalidKeyException e) {
            // Lidando com as exceções
            e.printStackTrace();
            return null;
        }
    }
}
