package go.party.tcs.service;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.dto.UsuarioDTO;
import go.party.tcs.model.AppException;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.doThrow;
import static org.mockito.MockitoAnnotations.openMocks;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Captor
    private ArgumentCaptor<Usuario> usuarioCaptor;
    @InjectMocks
    private UsuarioService usuarioService;
    private final String uploadDir = "uploads";


    @Test
    @DisplayName("Sucesso ao cadastrar usuario BASIC")
    void cadastrarUsuarioBasic() {
        Usuario usuarioTeste = new Usuario();
        usuarioService.cadastrarUsuario(usuarioTeste, TipoUsuario.BASIC);
        then(usuarioRepository).should().save(usuarioCaptor.capture());
        Usuario usuarioSalvo = usuarioCaptor.getValue();
        assertNotNull(usuarioSalvo);
        assertEquals(TipoUsuario.BASIC, usuarioSalvo.getTipoUsuario());
    }

    @Test
    @DisplayName("Sucesso ao cadastrar usuario STUDENT")
    void cadastrarUsuarioStudent() {
        Usuario usuarioTeste = new Usuario();
        usuarioService.cadastrarUsuario(usuarioTeste, TipoUsuario.STUDENT);
        then(usuarioRepository).should().save(usuarioCaptor.capture());
        Usuario usuarioSalvo = usuarioCaptor.getValue();
        assertNotNull(usuarioSalvo);
        assertEquals(TipoUsuario.STUDENT, usuarioSalvo.getTipoUsuario());
    }

    @Test
    @DisplayName("Sucesso ao fazer upload de arquivo")
    void fazerUploadArquivo() throws IOException {
        ReflectionTestUtils.setField(usuarioService, "uploadDir", "uploads");
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        given(usuarioRepository.findById(1L)).willReturn(Optional.of(usuario));
        MockMultipartFile file = new MockMultipartFile("file", "test.png", "image/png", "teste conteudo".getBytes());
        usuarioService.uploadProfileImage(1L, file);
        then(usuarioRepository).should().save(usuarioCaptor.capture());
        Usuario usuarioSalvo = usuarioCaptor.getValue();
        Path filePath = Paths.get("uploads", "1_test.png");
        assertEquals("/uploads/1_test.png", usuarioSalvo.getFotoCaminho());
        assertTrue(Files.exists(filePath));
        Files.deleteIfExists(filePath);
    }

    @Test
    @DisplayName("Erro ao fazer upload de arquivo - Usuário não encontrado")
    void fazerUploadArquivoUsuarioNaoEncontrado() {
        ReflectionTestUtils.setField(usuarioService, "uploadDir", "uploads");
        given(usuarioRepository.findById(1L)).willReturn(Optional.empty());
        MockMultipartFile file = new MockMultipartFile("file", "test.png", "image/png", "teste conteudo".getBytes());
        AppException exception = assertThrows(AppException.class, () -> {
            usuarioService.uploadProfileImage(1L, file);
        });
        assertEquals("Usuario não encontrado!", exception.getMessage());
    }

    @Test
    @DisplayName("Sucesso ao encontrar um usuario")
    void buscarUsuarioPorId() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        given(usuarioRepository.findById(1L)).willReturn(Optional.of(usuario));
        Usuario usuarioEncontrado = usuarioService.buscarUsuarioPorId(1L);
        then(usuarioRepository).should().findById(1L);
        assertNotNull(usuarioEncontrado);
        assertEquals(usuarioEncontrado.getId(), 1L);
    }

    @Test
    @DisplayName("Lança exceção ao não encontrar um usuario")
    void buscarUsuarioPorIdNaoEncontrado() {
        given(usuarioRepository.findById(1L)).willReturn(Optional.empty());
        assertThrows(AppException.class, () -> usuarioService.findById(1L));
    }

    @Test
    @DisplayName("Não existe o e-mail na base de dados")
    void naoExistePorEmail() {
        given(usuarioRepository.existsByEmail(anyString())).willReturn(false);
        boolean resultado = usuarioService.existsByEmail("email@email.com");
        assertFalse(resultado);
    }

    @Test
    @DisplayName("Existe o e-mail na base de dados")
    void existePorEmail() {
        given(usuarioRepository.existsByEmail(anyString())).willReturn(true);
        boolean resultado = usuarioService.existsByEmail("email@email.com");
        assertTrue(resultado);
    }

    @Test
    @DisplayName("Não existe o CPF no banco de dados")
    void naoExisteCPF() {
        given(usuarioRepository.existsByCpf(anyString())).willReturn(false);
        boolean resultado = usuarioService.existsByCpf("244.865.740-87");
        assertFalse(resultado);
    }

    @Test
    @DisplayName("Não existe o CPF no banco de dados")
    void existeCPF() {
        given(usuarioRepository.existsByCpf(anyString())).willReturn(true);
        boolean resultado = usuarioService.existsByCpf("244.865.740-87");
        assertTrue(resultado);
    }

    @Test
    @DisplayName("Salvar usuario no banco")
    void salvarUsuario() {
        Usuario usuario = new Usuario();
        usuarioService.saveUser(usuario);
        then(usuarioRepository).should().save(usuarioCaptor.capture());
        Usuario usuarioSalvo = usuarioCaptor.getValue();
        assertNotNull(usuarioSalvo);
        assertTrue(usuarioSalvo instanceof Usuario);
    }

    @Test
    @DisplayName("Retorna uma lista de UsuarioDTO para usuarios ativos do tipo estudante")
    void getUsuariosAtivosEstudantes() {
        Usuario usuario1 = new Usuario();
        Usuario usuario2 = new Usuario();
        List<Usuario> usuariosSimulados = Stream.of(usuario1, usuario2).collect(Collectors.toList());
        given(usuarioRepository.findByAtivoTrueAndTipoUsuario(TipoUsuario.STUDENT)).willReturn(usuariosSimulados);
        List<UsuarioDTO> resultado = usuarioService.getUsuariosAtivosEstudantes();
        assertThat(resultado).isNotNull();
        assertThat(resultado.size()).isEqualTo(2);
    }

    @Test
    @DisplayName("Não existe username cadastrado")
    void naoExisteUsername() {
        given(usuarioRepository.existsByUsername(anyString())).willReturn(false);
        boolean resultado = usuarioService.checkUsernameExists(anyString());
        assertFalse(resultado);
    }

    @Test
    @DisplayName("Existe username cadastrado")
    void existeUsername() {
        given(usuarioRepository.existsByUsername(anyString())).willReturn(true);
        boolean resultado = usuarioService.checkUsernameExists(anyString());
        assertTrue(resultado);
    }
}