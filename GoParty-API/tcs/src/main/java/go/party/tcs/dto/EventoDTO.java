package go.party.tcs.dto;

import java.time.LocalDateTime;
import go.party.tcs.model.Evento;

public class EventoDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private String eventoCaminho;
    private String cidade;
    private String estado;
    private LocalDateTime dataEvento;
    private double valor;

    public EventoDTO() {}

    public EventoDTO(Long id, String titulo, String descricao, String eventoCaminho, String cidade, String estado, LocalDateTime dataEvento, double valor) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.eventoCaminho = eventoCaminho;
        this.cidade = cidade;
        this.estado = estado;
        this.dataEvento = dataEvento;
        this.valor = valor;
    }

    public EventoDTO(Evento evento) {
        if (evento != null) {
            this.id = evento.getId();
            this.titulo = evento.getTitulo();
            this.descricao = evento.getDescricao();
            this.eventoCaminho = evento.getEventoCaminho();
            this.cidade = evento.getCidade();
            this.estado = evento.getEstado();
            this.dataEvento = evento.getDataEvento();
            this.valor = evento.getValor();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getEventoCaminho() { return eventoCaminho; }
    public void setEventoCaminho(String EventoCaminho) { this.eventoCaminho = eventoCaminho; }
    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public LocalDateTime getDataEvento() { return dataEvento; }
    public void setDataEvento(LocalDateTime dataEvento) { this.dataEvento = dataEvento; }
    public double getValor() { return valor; }
    public void setValor(double valor) { this.valor = valor; }
}
