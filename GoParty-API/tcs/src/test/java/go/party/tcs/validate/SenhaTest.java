package go.party.tcs.validate;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class SenhaTest {

    @Test
    public void testSenhaValida() {
        assertTrue(Senha.isSenhaValida("Passw0rd!"));
    }

    @Test
    public void testSenhaValidaComCaracteresEspeciais() {
        assertTrue(Senha.isSenhaValida("Valid#123"));
    }

    @Test
    public void testSenhaValidaComTamanhoMinimo() {
        assertTrue(Senha.isSenhaValida("1Aa@4567"));
    }

    @Test
    public void testSenhaValidaComTamanhoMaximo() {
        assertTrue(Senha.isSenhaValida("Val1dPass@word!"));
    }

    // Testes para senhas inválidas
    @Test
    public void testSenhaInvalidaSemDigito() {
        assertFalse(Senha.isSenhaValida("NoDigits!"));
    }

    @Test
    public void testSenhaInvalidaSemCaracterEspecial() {
        assertFalse(Senha.isSenhaValida("NoSpecial1"));
    }

    @Test
    public void testSenhaInvalidaAbaixoDoTamanhoMinimo() {
        assertFalse(Senha.isSenhaValida("1!a"));
    }

    @Test
    public void testSenhaInvalidaAcimaDoTamanhoMaximo() {
        assertFalse(Senha.isSenhaValida("ThisPassword1Is@WayTooLong"));
    }

    @Test
    public void testSenhaInvalidaComEspacos() {
        assertFalse(Senha.isSenhaValida("Valid 123!"));
    }

    @Test
    public void testSenhaInvalidaNula() {
        assertFalse(Senha.isSenhaValida(null));
    }

    @Test
    public void testSenhaInvalidaVazia() {
        assertFalse(Senha.isSenhaValida(""));
    }

    @Test
    public void testSenhaInvalidaSomenteNumeros() {
        assertFalse(Senha.isSenhaValida("12345678"));
    }

    @Test
    public void testSenhaInvalidaSomenteLetras() {
        assertFalse(Senha.isSenhaValida("Password!"));
    }

}
