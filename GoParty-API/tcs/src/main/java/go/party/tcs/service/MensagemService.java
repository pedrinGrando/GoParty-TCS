package go.party.tcs.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Message;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.MessageRepository;
import go.party.tcs.repository.UsuarioRepository;

@Service
public class MensagemService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CriptografiaService criptografiaService;

    @Autowired
    private NotificationService notificationService;

    public void salvarMensagem(Integer id, String message, Integer idUsuarioSessao) {
         
        //OBJETOS USUARIOS
        Usuario receiver = usuarioRepository.getById(id);
        Usuario sessao = usuarioRepository.getById(idUsuarioSessao);

        //CRIPT
        SecretKey chaveSecreta = obterChaveSecreta(idUsuarioSessao);
        String mensagemCriptografada = criptografiaService.criptografarMensagem(message, chaveSecreta);


        try {
           
            // Utilize o método descriptografarMensagem
             String mensagemDescriptografada = criptografiaService.descriptografarMensagem(mensagemCriptografada, chaveSecreta);

             String msgNoti = sessao.getUsername()+" enviou uma mensagem: " + mensagemDescriptografada;

             notificationService.createNotification(msgNoti, receiver.getId(), sessao.getFotoPerfil());

        } catch (Exception e) {
            e.printStackTrace();
        }
       
      
        //CONTRUCAO DA MENSAGEM
        Message mensagem = new Message();

        mensagem.setContent(mensagemCriptografada);
        mensagem.setReceiver(id);
        mensagem.setSender(idUsuarioSessao);
        mensagem.setVista(false);
        mensagem.setDataHoraMsg(LocalDateTime.now());

        messageRepository.save(mensagem);
    }

     public SecretKey obterChaveSecreta(Integer idUsuario) {
        byte[] chaveOriginal = Integer.toString(idUsuario).getBytes(StandardCharsets.UTF_8);
        byte[] chaveDigest;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            chaveDigest = digest.digest(chaveOriginal);
        } catch (NoSuchAlgorithmException e) {
            // Lida com o erro de algoritmo não encontrado
            e.printStackTrace();
            return null;
        }

        // Reduz a chave para o tamanho aceitável para o algoritmo de criptografia (AES por exemplo)
        byte[] chaveReduzida = new byte[16];
        System.arraycopy(chaveDigest, 0, chaveReduzida, 0, 16);

        return new SecretKeySpec(chaveReduzida, "AES");
    }
    
}
