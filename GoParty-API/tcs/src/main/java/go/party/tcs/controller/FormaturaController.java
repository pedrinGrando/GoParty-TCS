package go.party.tcs.controller;

import java.util.Map;
import java.util.List;

import go.party.tcs.model.AppException;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import go.party.tcs.dto.FormaturaDTO;
import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.model.Formatura;
import go.party.tcs.service.FormaturaService;

@RestController
@RequestMapping("/v1/formaturas")
@CrossOrigin(origins = "http://localhost:5173/")
public class FormaturaController {

    @Autowired
    private FormaturaService formaturaService;


    @PostMapping("/ser-adm/{userId}")
    public ResponseEntity<?> cadastrarSolicitacaoAdm(@PathVariable Long userId, @RequestBody Formatura formatura) {
        try {
            formatura = formaturaService.cadastrarAdm(userId, formatura);
            return ResponseEntity.ok(Map.of("id", formatura.getId(), "mensagem", "Formatura cadastrada com sucesso!"));
        } catch (AppException exception) {
            exception.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exception.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao realizar a solicitação usuário.");
        }
    }

    @PostMapping("/upload-grad-image/{formaturaId}")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long formaturaId,
                                                     @RequestParam("file") MultipartFile file) {
        try {
            formaturaService.uploadProfileImage(formaturaId, file);
            return ResponseEntity.ok("Formatura image uploaded successfully");
        } catch (AppException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload formatura image");
        }
    }

//    @GetMapping("/top-formaturas")
//    public ResponseEntity<List<FormaturaDTO>> getTop5FormaturasByCurtidas() {
//        return ResponseEntity.ok(formaturaService);
//    }

    // TODO talvez esse método saia
//    @GetMapping("/uploads/{filename:.+}")
//    @ResponseBody
//    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws MalformedURLException {
//        Path file = Paths.get(uploadDir).resolve(filename);
//        Resource resource = new UrlResource(file.toUri());
//        if (resource.exists() || resource.isReadable()) {
//            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
//                    "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PutMapping("/adicionar-membro/{userId}")
    public ResponseEntity<?> adicionarMembros(@PathVariable Long userId, @RequestBody FormaturaDTO form) {
        try {
            formaturaService.adicionarMembro(userId, form.getId());
            return ResponseEntity.ok("Membro adicionado com sucesso!");
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/top-formaturas")
    public ResponseEntity<List<FormaturaDTO>> getTop5FormaturasByCurtidas() {
        return ResponseEntity.ok(formaturaService.getTop5FormaturasByCurtidas());
    }

    @PutMapping("/remover-membro/{userId}")
    public ResponseEntity<String> removerMembro(@PathVariable Long userId, @RequestBody Long admId) {
        try {
            formaturaService.removerUsuario(userId, admId);
            return ResponseEntity.ok().body("Usuario removido do grupo com sucesso!");
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/listar-grupo/{userId}")
    public ResponseEntity<?> listarGrupoPorId(@PathVariable Long userId) {
        try {
            List<UsuarioDTO> grupo = formaturaService.listaGrupoPorId(userId);
            return ResponseEntity.ok(grupo);
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/encontrar-por-id/{userId}")
    public ResponseEntity<?> formaturaPeloId(@PathVariable Long userId) {
        try {
            FormaturaDTO formaturaDTO = formaturaService.formaturaPorId(userId);
            return ResponseEntity.ok(formaturaDTO);
        } catch (AppException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/{eventoId}/consultar-pix-formatura")
    public ResponseEntity<String> acharChavePixPorEventoId(@PathVariable Long eventoId) {
        try {
            return ResponseEntity.ok(formaturaService.acharChavePixPorEventoId(eventoId));
        } catch (AppException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

}
