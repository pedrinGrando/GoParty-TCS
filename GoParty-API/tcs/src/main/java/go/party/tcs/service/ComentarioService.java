package go.party.tcs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Comentario;
import go.party.tcs.model.Usuario;
import go.party.tcs.repository.ComentarioRepository;

@Service
public class ComentarioService {
    
    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    public ComentarioService(ComentarioRepository comentarioRepository) {
        this.comentarioRepository = comentarioRepository;
    }
    
    public void save(Comentario comentario) {
        comentarioRepository.save(comentario);
    }    
    
}
