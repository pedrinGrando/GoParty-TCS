package go.party.tcs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${support.mail}")
    private String supportMail;

    public void sendEmailToClient(String to, String subject, String body) throws MessagingException {
        MimeMessage mail = javaMailSender.createMimeMessage();

        MimeMessageHelper message = new MimeMessageHelper(mail); 

        message.setSubject(subject);
        message.setText(body, true);
        message.setFrom(supportMail);
        message.setTo(to);

        javaMailSender.send(mail);
    }
}
