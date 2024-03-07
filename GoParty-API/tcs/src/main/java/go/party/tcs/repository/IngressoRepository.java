package go.party.tcs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import go.party.tcs.model.Ingresso;

public interface IngressoRepository  extends JpaRepository<Ingresso, Integer>{

    
    @Query("SELECT i FROM Ingresso i WHERE i.idUsuario.id = :idUsuario")
    List<Ingresso> findByIdUsuario(@Param("idUsuario") Integer idUsuario);

    List<Ingresso> findByEventoId(Integer eventoId);

    Ingresso findByCpfComprador(String cpfComprador);

    
}
