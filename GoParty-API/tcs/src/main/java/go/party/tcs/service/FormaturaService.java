package go.party.tcs.service;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.EventoDTO;
import go.party.tcs.dto.FormaturaDTO;
import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.model.AppException;
import go.party.tcs.model.Evento;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.CurtidaRepository;
import go.party.tcs.repository.EventoRepository;
import go.party.tcs.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Formatura;
import go.party.tcs.repository.FormaturaRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FormaturaService {
    
    @Autowired
    private FormaturaRepository formaturaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CurtidaRepository curtidaRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private EventoService eventoService;
    @Autowired
    private EventoRepository eventoRepository;


    public Formatura cadastrarAdm(Long userId, Formatura formatura) throws AppException{
        Usuario usuario = usuarioService.findById(userId);
        if (usuario.isAdm()){
            throw new AppException("Usuario já é ADM!");
        }
        if(usuario.isNotStudent()) {
            throw new AppException("Usuario não é estudante");
        }
        formatura = this.cadastrarFormatura(usuario, formatura);
        this.saveUsuario(usuario, formatura);
        return formatura;
    }

    public void uploadProfileImage(Long idFormatura, MultipartFile file) throws AppException, IOException {
        Formatura formatura = this.findById(idFormatura);
        String fileName = formatura.getId() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        formatura.setFormaturaCaminho("/uploads/" + fileName);
        formaturaRepository.save(formatura);
    }

    public void adicionarMembro(Long userId, Long idFormatura) throws AppException{
        Usuario usuario = usuarioService.findById(userId);
        Formatura formatura = this.findById(idFormatura);
        if (usuario.isNotStudent()) {
            throw new AppException("Usuário precisa ser estudante!");
        }
        usuario.setFormatura(formatura);
        usuario.setTipoUsuario(TipoUsuario.MEMBER);
        usuarioService.saveUser(usuario);
    }

    public void removerUsuario(Long userId, Long admId) {
        Usuario usuario = usuarioService.findById(userId);
        Usuario adm = usuarioService.findById(admId);
        if (adm.isNotAdm()) {
            throw new AppException("Usuario não é ADM");
        }
        usuario.setFormatura(null);
        usuario.setTipoUsuario(TipoUsuario.STUDENT);
        usuarioService.saveUser(usuario);
    }

    public List<UsuarioDTO> listaGrupoPorId(Long userId) throws AppException {
        Usuario usuario = usuarioService.findById(userId);
        if (usuario.getFormatura() == null) {
            throw new AppException("User is not in any group!");
        }
        Formatura formatura = this.findById(usuario.getFormatura().getId());
        return formatura.getUsuarios().stream().map(
                this::convertToDTO
        ).toList();
    }

    public List<FormaturaDTO> getTop5FormaturasByCurtidas() {
        List<Object[]> results = curtidaRepository.findTop5FormaturasByCurtidas();
        return results.stream()
                .map(result -> {
                    Long formaturaId = (Long) result[0];
                    Long curtidasCount = (Long) result[1];
                    Formatura formatura = formaturaRepository.findById(formaturaId).orElseThrow();
                    Long totalEventos = eventoRepository.countByFormaturaId(formaturaId);
                    Long totalMembros =  usuarioRepository.countUsersByFormaturaId(formatura.getId());
                    String nomeUsuario = formatura.getAdm().getNome();

                    return new FormaturaDTO(
                            formatura.getId(),
                            formatura.getTitulo(),
                            formatura.getDescricao(),
                            formatura.getFormaturaCaminho(),
                            formatura.getCidade(),
                            formatura.getEstado(),
                            formatura.getDataPrevista(),
                            formatura.getArrecacado(),
                            formatura.getMetaArrecad(),
                            nomeUsuario,
                            totalMembros,
                            totalEventos,
                            formatura.getBairro()
                    );
                })
                .collect(Collectors.toList());
    }

    public FormaturaDTO formaturaPorId(Long userId) throws AppException {
        Usuario usuario = usuarioService.findById(userId);
        if(usuario.getFormatura() == null) {
            throw new AppException("Formatura não encontrada para o usuário");
        }
        Formatura formatura = usuario.getFormatura();
        return new FormaturaDTO(
                formatura.getId(),
                formatura.getTitulo(),
                formatura.getDescricao(),
                formatura.getFormaturaCaminho(),
                formatura.getCidade(),
                formatura.getEstado(),
                formatura.getDataPrevista(),
                formatura.getArrecacado(),
                formatura.getMetaArrecad(),
                usuario.getNome(),
                usuarioRepository.countUsersByFormaturaId(formatura.getId()),
                eventoRepository.countByFormaturaId(formatura.getId()),
                formatura.getBairro()
        );
    }

    public String acharChavePixPorEventoId(Long eventoId) throws AppException {
        return eventoService.findChavePixByEventoId(eventoId).orElseThrow(() -> new AppException("Chave pix não encontrada!"));
    }

    public Formatura findById(Long idFormatura) throws AppException {
        return formaturaRepository.findById(idFormatura).orElseThrow(() -> new AppException("Formatura não encontrada"));
    }

    private Formatura cadastrarFormatura(Usuario usuario, Formatura formatura) throws AppException {
        formatura.setAdm(usuario);
        formatura.setDataSolicitacao(LocalDateTime.now());
        return formaturaRepository.save(formatura);
    }

    private void saveUsuario(Usuario usuario, Formatura formatura) throws AppException {
        usuario.setFormatura(formatura);
        usuario.setTipoUsuario(TipoUsuario.ADM);
        usuarioService.saveUser(usuario);
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

    public FormaturaDTO atualizarFormatura(Long formId, FormaturaDTO formDTO) throws AppException {
        Formatura formatura = this.findById(formId);
        formatura.setTitulo(formDTO.getTitulo());
        formatura.setDescricao(formDTO.getDescricao());
        formatura.setEstado(formDTO.getEstado());
        formatura.setCidade(formDTO.getCidade());
        formatura.setBairro(formDTO.getBairro());
        formatura.setDataPrevista(formDTO.getDataPrevista());
        formatura = formaturaRepository.save(formatura);
        return new FormaturaDTO(
                formatura.getId(),
                formatura.getTitulo(),
                formatura.getDescricao(),
                formatura.getFormaturaCaminho(),
                formatura.getCidade(),
                formatura.getEstado(),
                formatura.getDataPrevista(),
                formatura.getArrecacado(),
                formatura.getMetaArrecad(),
                formatura.getAdm().getNome(),
                usuarioRepository.countUsersByFormaturaId(formatura.getId()),
                eventoRepository.countByFormaturaId(formatura.getId()),
                formatura.getBairro()
        );
    }
}
