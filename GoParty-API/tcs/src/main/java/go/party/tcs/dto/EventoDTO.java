package go.party.tcs.dto;

import java.time.LocalDateTime;
import go.party.tcs.model.Evento;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class EventoDTO {

    private Long id;
    private boolean ativo;
    private String titulo;
    private String descricao;
    private String eventoCaminho;
    private String cidade;
    private String bairro;
    private String cep;
    private String rua;
    private String estado;
    private LocalDateTime dataEvento;
    private double valor;

    public EventoDTO() {}

    public EventoDTO(Long id, boolean ativo, String titulo, String descricao, String eventoCaminho, String cidade, String estado, LocalDateTime dataEvento, double valor, String rua, String bairro, String cep) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.eventoCaminho = eventoCaminho;
        this.cidade = cidade;
        this.rua = rua;
        this.cep = cep;
        this.bairro = bairro;
        this.estado = estado;
        this.dataEvento = dataEvento;
        this.valor = valor;
        this.ativo = ativo;
    }

    public EventoDTO(Evento evento) {
        if (evento != null) {
            this.id = evento.getId();
            this.ativo = evento.isAtivo();
            this.titulo = evento.getTitulo();
            this.descricao = evento.getDescricao();
            this.eventoCaminho = evento.getEventoCaminho();
            this.cidade = evento.getCidade();
            this.bairro = evento.getBairro();
            this.rua = evento.getRua();
            this.estado = evento.getEstado();
            this.dataEvento = evento.getDataEvento();
            this.valor = evento.getValor();
        }
    }

}
