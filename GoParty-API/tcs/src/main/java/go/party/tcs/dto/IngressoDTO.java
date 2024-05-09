package go.party.tcs.dto;

import java.time.LocalDateTime;

public class IngressoDTO {
    private Long id;
    private String codigoEvento;
    private String status;
    private String nomeUsuario;  
    private String nomeEvento;
    private LocalDateTime dataCompra;
    
    public IngressoDTO(Long id, String codigoEvento, String status, String nomeUsuario, String nomeEvento,
            LocalDateTime dataCompra) {
        this.id = id;
        this.codigoEvento = codigoEvento;
        this.status = status;
        this.nomeUsuario = nomeUsuario;
        this.nomeEvento = nomeEvento;
        this.dataCompra = dataCompra;
    }

    public IngressoDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoEvento() {
        return codigoEvento;
    }

    public void setCodigoEvento(String codigoEvento) {
        this.codigoEvento = codigoEvento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        this.nomeEvento = nomeEvento;
    }

    public LocalDateTime getDataCompra() {
        return dataCompra;
    }

    public void setDataCompra(LocalDateTime dataCompra) {
        this.dataCompra = dataCompra;
    }

}