package go.party.tcs.repository;

import go.party.tcs.Enums.TipoStatus;
import go.party.tcs.model.Ingresso;
import go.party.tcs.projection.IngressoPorEventoProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IngressoPorEventoRepository extends JpaRepository<Ingresso, Long> {

    @Query(nativeQuery = true, value = "select " +
            "    i.id as codigoIngresso, " +
            "    i.data_compra as dataCompra, " +
            "    u.nome as comprador, " +
            "    e.titulo as nomeEvento, " +
            "    i.status " +
            "from ingresso i " +
            "    inner join usuarios u on " +
            "    u.id = i.usuario_id " +
            "    inner join evento e on " +
            "    i.evento_id = e.id " +
            "where " +
            "    e.formatura_id = (:formaturaId) AND " +
            "    e.id = COALESCE((:eventoId), e.id) AND " +
            "    i.status = COALESCE((:status), status) " +
            "order by " +
            "    i.data_compra desc;")
    Page<IngressoPorEventoProjection> findIngressosPorEvento(@Param("formaturaId") Long formaturaId, @Param("eventoId") Long eventoId, @Param("status") String status, Pageable pageable);

}
