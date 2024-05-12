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
import java.util.stream.Collectors;

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
import go.party.tcs.dto.EventoDTO;
import go.party.tcs.dto.FormaturaDTO;
import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.model.Formatura;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.FormaturaRepository;
import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.EventoService;
import go.party.tcs.service.FormaturaService;

@RestController
@RequestMapping("/v1/formaturas")
@CrossOrigin(origins = "http://localhost:5173/")
public class FormaturaController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FormaturaService formaturaService;

    @Autowired
    private FormaturaRepository formaturaRepository;

    @Autowired
    private EventoService eventoService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/ser-adm/{userId}")
    public ResponseEntity<?> cadastrarSolicitacaoAdm(@PathVariable Long userId, @RequestBody Formatura formatura) {
        try {
            Optional<Usuario> userOptional = usuarioRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            Usuario usuarioAdm = userOptional.get();
            if (usuarioAdm.getTipoUsuario().equals(TipoUsuario.ADM)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario já é ADM!");
            } else if (!usuarioAdm.getTipoUsuario().equals(TipoUsuario.STUDENT)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario nao estudante!");
            }
            formatura.setAdm(usuarioAdm);
            formatura.setDataSolicitacao(LocalDateTime.now());
            Formatura formaturaSalva = formaturaService.cadastrarSolicitacaoAdm(formatura);
            usuarioAdm.setTipoUsuario(TipoUsuario.ADM);
            usuarioAdm.setFormatura(formaturaSalva);
            usuarioRepository.save(usuarioAdm);
            return ResponseEntity
                    .ok(Map.of("id", formaturaSalva.getId(), "mensagem", "Formatura cadastrada com sucesso!"));
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

    // Upload da matricula
    @PostMapping("/upload-matricula-pdf/{fomaturaId}")
    public ResponseEntity<String> uploadMatriculaPdf(@PathVariable Long fomaturaId,
            @RequestParam("file") MultipartFile file) {
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

    // Acessar Matricula
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
    public ResponseEntity<String> adicionarMembros(@PathVariable Long userId, @RequestBody Long formId) {
        Optional<Usuario> userOptional = usuarioRepository.findById(userId);
        Optional<Formatura> formOptional = formaturaRepository.findById(formId);
        Usuario usuario = new Usuario();
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        usuario = userOptional.get();
        if (!formOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Graduation not found");
        } else if (usuario.getTipoUsuario().equals(TipoUsuario.STUDENT)) {
            Formatura formatura = formOptional.get();
            usuario.setFormatura(formatura);
            usuario.setTipoUsuario(TipoUsuario.MEMBER);
            usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Membro adicionado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario precisa ser estudante!");
        }
    }

    @PutMapping("/remover-membro/{userId}")
    public ResponseEntity<String> removerMembro(@PathVariable Long userId, @RequestBody Long admId) {
        Optional<Usuario> userOptional = usuarioRepository.findById(userId);
        Optional<Usuario> admOptional = usuarioRepository.findById(admId);
        Usuario usuario = new Usuario();
        Usuario admUser = new Usuario();
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario nao encontrado!");
        } else if (!admOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Adm nao escontrado!");
        } else if (!admUser.getTipoUsuario().equals(TipoUsuario.ADM)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario nao e ADM!");
        } else {
            usuario = userOptional.get();
            admUser = admOptional.get();
            usuario.setFormatura(null);
            usuario.setTipoUsuario(TipoUsuario.STUDENT);
            usuarioRepository.save(usuario);
            return ResponseEntity.ok().body("Usuario removido do grupo com sucesso!");
        }
    }

    @GetMapping("/listar-grupo/{userId}")
    public ResponseEntity<?> listarGrupoPorId(@PathVariable Long userId) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(userId);
        if (!optionalUsuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
        Usuario usuario = optionalUsuario.get();

        if (usuario.getFormatura() == null) {
            return ResponseEntity.badRequest().body("User is not in any group!");
        }
        Optional<Formatura> formaturaOptional = formaturaRepository.findById(usuario.getFormatura().getId());
        if (!formaturaOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Formatura not found!");
        }

        List<Usuario> grupoFormatura = formaturaOptional.get().getUsuarios();

        List<UsuarioDTO> usuariosDTO = grupoFormatura.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(usuariosDTO);
    }

    @GetMapping("/encontrar-por-id/{userId}")
    public ResponseEntity<?> formaturaPeloId(@PathVariable Long userId) {
        Optional<Usuario> userOptional = usuarioRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        Usuario usuario = userOptional.get();
        Formatura formatura = usuario.getFormatura();
        if (formatura == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Formatura não encontrada para o usuário");
        }

        FormaturaDTO formaturaDTO = new FormaturaDTO(
                formatura.getId(),
                formatura.getTitulo(),
                formatura.getDescricao(),
                formatura.getFormaturaCaminho(),
                formatura.getCidade(),
                formatura.getEstado(),
                formatura.getDataPrevista(),
                formatura.getArrecacado(),
                formatura.getMetaArrecad(),
                usuario.getNome());

        return ResponseEntity.ok(formaturaDTO);
    }

    @GetMapping("/{eventoId}/consultar-pix-formatura")
    public ResponseEntity<String> acharChavePixPorEventoId(@PathVariable Long eventoId) {
        Optional<String> chavePix = eventoService.findChavePixByEventoId(eventoId);
        return chavePix.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setUsername(usuario.getUsername());
        dto.setUsuarioCaminho(usuario.getFotoCaminho());
        dto.setTipoUsuario(usuario.getTipoUsuario());
        return dto;
    }

}
