package go.party.tcs.config;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.security.*;

public class RSAKeyGenerator {

    public static KeyPair generateKeyPair() throws NoSuchAlgorithmException, NoSuchProviderException {
        Security.addProvider(new BouncyCastleProvider());
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA", "BC");
        generator.initialize(2048);
        return generator.generateKeyPair();
    }
}
