package go.party.tcs.dto;

import java.time.LocalDate;
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
    private LocalDate dataEvento;
    private double valor;
    private int qntIngressos;
    private boolean esgotado;


    public EventoDTO() {}

    public EventoDTO(Long id, boolean ativo, String titulo, String descricao, String eventoCaminho, String cidade, String estado, 
    LocalDate dataEvento, double valor, int qntIngressos, String rua, String bairro, String cep, boolean esgotado) {
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
        this.qntIngressos = qntIngressos;
        this.ativo = ativo;
        this.esgotado = esgotado;
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
            this.qntIngressos = evento.getQntIngressos();
            this.esgotado = evento.isEsgotado();
        }
    }
}
