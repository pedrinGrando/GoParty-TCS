package go.party.tcs.validate;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Email {

    public static boolean isValidEmail(String email) {
        if (email == null) {
            return false;
        }
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isStudent(String email) {
        if (!isValidEmail(email)) {
            return false;
        }
        String domain = email.substring(email.indexOf("@") + 1);
        if (domain.contains("estudante") || domain.contains("alunos") || domain.contains("edu")) {
            return true;
        }
        return false;
    }
}
