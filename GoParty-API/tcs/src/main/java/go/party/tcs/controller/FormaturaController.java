package go.party.tcs.controller;

import java.util.Map;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.Enums.TipoUsuario;
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
             if (usuarioAdm.getTipoUsuario().equals(TipoUsuario.ADM)){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario já é ADM!");
             } else {
                usuarioAdm.setTipoUsuario(TipoUsuario.ADM);
                usuarioRepository.save(usuarioAdm);
                formatura.setAdm(usuarioAdm);
                formatura.setDataSolicitacao(LocalDateTime.now());
                Formatura formaturaSalva = formaturaService.cadastrarSolicitacaoAdm(formatura);

                return ResponseEntity.ok(Map.of("id", formaturaSalva.getId(), "mensagem", "Solicitação para adm realizada com sucesso!"));
             }
             
         } catch (Exception e) {
             e.printStackTrace();
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao realizar a solicitação usuário.");
         }
    }


     @PostMapping("/upload-grad-image/{formaturaId}")
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

     //Upload da matricula
     @PostMapping("/upload-matricula-pdf/{fomaturaId}")
     public ResponseEntity<String> uploadMatriculaPdf(@PathVariable Long fomaturaId, @RequestParam("file") MultipartFile file) {
    try {
        Optional<Formatura> formaturaOpcional = formaturaRepository.findById(fomaturaId);
        if (!formaturaOpcional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Formatura not found");
        }

        if (!file.getContentType().equals("application/pdf")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type. Only PDFs are allowed.");
        }

        Formatura formatura = formaturaOpcional.get();
        String filename = "matricula_" + fomaturaId + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        formatura.setMatriculaCaminho("/uploads/" + filename); 
        formaturaRepository.save(formatura);

        return ResponseEntity.ok("Matricula PDF uploaded successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload matricula PDF");
    }
  }

   //Acessar Matricula
    @GetMapping("/uploads/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws MalformedURLException {
        Path file = Paths.get(uploadDir).resolve(filename);
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/adicionar-membro/{userId}")
    public ResponseEntity<String> adicionarMembros(@PathVariable Long userId, @RequestBody Long formaturaId) {
        Optional<Usuario> userOptional = usuarioRepository.findById(userId);
        Optional<Formatura> formOptional = formaturaRepository.findById(formaturaId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } else if (!formOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } else {
            Formatura formatura = formOptional.get();
            Usuario usuario = userOptional.get();
            usuario.setFormatura(formatura);
            usuario.setTipoUsuario(TipoUsuario.MEMBER);
            usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Membro adicionado com sucesso!");
        }
    }

}


