package go.party.tcs.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import go.party.tcs.service.FormaturaService;
import go.party.tcs.service.UsuarioService;

@RestController
@RequestMapping("/v1/fomaturas")
@CrossOrigin(origins = "http://localhost:5173/")
public class FormaturaController {
    
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private FormaturaService formaturaService;

// @PostMapping("/ser-adm")
//     public ResponseEntity<?> cadastrarSolicitacaoAdm(@RequestBody Formatura formatura) {
//         try {
//             //encontrar usuario que fez a solicitação
//             Formatura formaturaSalva = formaturaService.cadastrarSolicitacaoAdm(formatura);
//             // Servico de cadastro de usuarios 
             
//             return ResponseEntity.ok(Map.of("id", formaturaSalva.getId(), "mensagem", "Solicitação para adm realizada com sucesso!"));
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao realizar a solicitação usuário.");
//         }
    }


    // @PostMapping("/upload-event-image/{eventoId}")
    // public ResponseEntity<String> uploadProfileImage(@PathVariable Long formaturaId, @RequestParam("file") MultipartFile file) {
    //     try {
    //         Optional<Formatura> formaturaOpcional = formaturaService.findById(formaturaId);
    //         if (!formaturaOpcional.isPresent()) {
    //             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("formatura not found");
    //         }
    
    //         Formatura formatura = formaturaOpcional.get();
    //         String filename = formaturaId + "_" + file.getOriginalFilename();
    //         Path filePath = Paths.get(uploadDir, filename);
    //         Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    
    //         formatura.setFormaturaCaminho("/uploads/" + filename);
    //         formaturaService.save(formatura);
    
    //         return ResponseEntity.ok("Event formatura uploaded successfully");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload formatura image");
    //     }
    // }


