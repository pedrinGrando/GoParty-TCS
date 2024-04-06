package go.party.tcs.controller;

import java.util.Map;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.model.Formatura;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.FormaturaRepository;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.FormaturaService;
import go.party.tcs.service.UsuarioService;

@RestController
@RequestMapping("/v1/fomaturas")
@CrossOrigin(origins = "http://localhost:5173/")
public class FormaturaController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FormaturaService formaturaService;

    @Autowired
    private FormaturaRepository formaturaRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

 @PostMapping("/ser-adm/{userId}")
     public ResponseEntity<?> cadastrarSolicitacaoAdm(@PathVariable Long userId, @RequestBody Formatura formatura) {
         try {
             //encontrar usuario que fez a solicitação
            Optional<Usuario> userOptional = usuarioRepository.findById(userId);
             if (!userOptional.isPresent()) {
                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
             }

             Usuario usuarioAdm = userOptional.get();
             formatura.setAdm(usuarioAdm);
             formatura.setDataSolicitacao(LocalDateTime.now());
             Formatura formaturaSalva = formaturaService.cadastrarSolicitacaoAdm(formatura);
             
             return ResponseEntity.ok(Map.of("id", formaturaSalva.getId(), "mensagem", "Solicitação para adm realizada com sucesso!"));
         } catch (Exception e) {
             e.printStackTrace();
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao realizar a solicitação usuário.");
         }
    }


     @PostMapping("/upload-event-image/{formaturaId}")
     public ResponseEntity<String> uploadProfileImage(@PathVariable Long formaturaId, @RequestParam("file") MultipartFile file) {
         try {
             Optional<Formatura> formaturaOpcional = formaturaRepository.findById(formaturaId);
             if (!formaturaOpcional.isPresent()) {
                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body("formatura not found");
             }
    
             Formatura formatura = formaturaOpcional.get();
             String filename = formaturaId + "_" + file.getOriginalFilename();
             Path filePath = Paths.get(uploadDir, filename);
             Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    
             formatura.setFormaturaCaminho("/uploads/" + filename);
             formaturaRepository.save(formatura);
    
             return ResponseEntity.ok("Formatura image uploaded successfully");
         } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload formatura image");
         }
     }

    }


