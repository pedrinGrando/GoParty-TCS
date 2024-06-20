package go.party.tcs.service;

import go.party.tcs.Enums.TipoUsuario;
import go.party.tcs.model.AppException;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Formatura;
import go.party.tcs.repository.FormaturaRepository;

import java.time.LocalDateTime;

@Service
public class FormaturaService {
    
    @Autowired
    private FormaturaRepository formaturaRepository;
    @Autowired
    private UsuarioService usuarioService;


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

}
