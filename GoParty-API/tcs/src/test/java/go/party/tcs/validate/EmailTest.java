package go.party.tcs.validate;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EmailTest {

    @Test
    public void testValidEmail() {
        assertTrue(Email.isValidEmail("go.party@gmail.com"));
    }

    @Test
    public void testValidEmailWithSpecialCharacters() {
        assertTrue(Email.isValidEmail("go.party+mail@example.com"));
    }

    @Test
    public void testValidEmailWithNumbers() {
        assertTrue(Email.isValidEmail("goparty0123@example.com"));
    }

    @Test
    public void testInvalidEmailNoAtSymbol() {
        assertFalse(Email.isValidEmail("goparty.gmail.com"));
    }

    @Test
    public void testInvalidEmailMultipleAtSymbols() {
        assertFalse(Email.isValidEmail("goparty@@gmail.com"));
    }

    @Test
    public void testInvalidEmailNoDomain() {
        assertFalse(Email.isValidEmail("goparty@.com"));
    }

    @Test
    public void testInvalidEmailNoUsername() {
        assertFalse(Email.isValidEmail("@gmail.com"));
    }

    @Test
    public void testInvalidEmailWithSpaces() {
        assertFalse(Email.isValidEmail("goparty @example.com"));
    }

    @Test
    public void testNullEmail() {
        assertFalse(Email.isValidEmail(null));
    }

    @Test
    public void testEmptyEmail() {
        assertFalse(Email.isValidEmail(""));
    }

    @Test
    public void testStudentEmailWithEduDomain() {
        assertTrue(Email.isStudent("goparty@senac.edu"));
    }

    @Test
    public void testStudentEmailWithEstudanteDomain() {
        assertTrue(Email.isStudent("goparty@estudante.senac.com"));
    }

    @Test
    public void testStudentEmailWithAlunosDomain() {
        assertTrue(Email.isStudent("goparty@alunos.senac.com"));
    }

    @Test
    public void testNonStudentEmailWithComDomain() {
        assertFalse(Email.isStudent("goparty@goparty.com"));
    }

    @Test
    public void testNonStudentEmailWithNonEducationalDomain() {
        assertFalse(Email.isStudent("goparty@gopartydomain.org"));
    }

    @Test
    public void testInvalidEmailForStudentCheck() {
        assertFalse(Email.isStudent("goparty@@senac.edu"));
    }

    @Test
    public void testNullEmailForStudentCheck() {
        assertFalse(Email.isStudent(null));
    }

    @Test
    public void testEmptyEmailForStudentCheck() {
        assertFalse(Email.isStudent(""));
    }
}
