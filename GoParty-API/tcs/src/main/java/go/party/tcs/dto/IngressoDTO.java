package go.party.tcs.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class IngressoDTO {
    private Long id;
    private String codigoEvento;
    private String status;
    private String nomeUsuario;  
    private String nomeEvento;
    private LocalDateTime dataCompra;
    private LocalDateTime dataEvento;
    private String ruaEvento;
    private String bairroEvento;
    private String statusIngresso;
    
    public IngressoDTO(Long id, String codigoEvento, String status, String nomeUsuario, String nomeEvento,
            LocalDateTime dataCompra, LocalDateTime dataEvento, String ruaEvento, String bairroEvento, String statusIngresso) {
        this.id = id;
        this.codigoEvento = codigoEvento;
        this.status = status;
        this.nomeUsuario = nomeUsuario;
        this.nomeEvento = nomeEvento;
        this.dataCompra = dataCompra;
        this.dataEvento = dataEvento;
        this.ruaEvento = ruaEvento;
        this.bairroEvento = bairroEvento;
        this.statusIngresso = statusIngresso;
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

    public LocalDateTime getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDateTime dataEvento) {
        this.dataEvento = dataEvento;

    }

    public String getRuaEvento() {
        return ruaEvento;
    }

    public void setRuaEvento(String ruaEvento) {
        this.ruaEvento = ruaEvento;
    }

    public String getBairroEvento() {
        return bairroEvento;
    }

    public void setBairroEvento(String bairroEvento) {
        this.bairroEvento = bairroEvento;
    }

    public String getStatusIngresso() {
        return statusIngresso;
    }

    public void setStatusIngresso(String statusIngresso) {
        this.statusIngresso = statusIngresso;
    }
}