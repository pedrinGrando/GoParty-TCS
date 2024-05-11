package go.party.tcs.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public class FormaturaDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private String formaturaCaminho;
    private String cidade;
    private String estado;
    private LocalDate dataPrevista;
    private double arrecadado;
    private double arrecad;
    private String nomeUsuario;

    public FormaturaDTO(Long id, String titulo, String descricao, String formaturaCaminho, String cidade, String estado,
    LocalDate dataPrevista, double arrecadado, double arrecad, String nomeUsuario) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.formaturaCaminho = formaturaCaminho;
        this.cidade = cidade;
        this.estado = estado;
        this.dataPrevista = dataPrevista;
        this.arrecadado = arrecadado;
        this.arrecad = arrecad;
        this.nomeUsuario = nomeUsuario;
    }

    public FormaturaDTO() {
    }
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public String getFormaturaCaminho() {
        return formaturaCaminho;
    }
    public void setFormaturaCaminho(String formaturaCaminho) {
        this.formaturaCaminho = formaturaCaminho;
    }
    public String getCidade() {
        return cidade;
    }
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public LocalDate getDataPrevista() {
        return dataPrevista;
    }
    public void setDataPrevista(LocalDate dataPrevista) {
        this.dataPrevista = dataPrevista;
    }
    public double getArrecadado() {
        return arrecadado;
    }
    public void setArrecadado(double arrecadado) {
        this.arrecadado = arrecadado;
    }
    public double getArrecad() {
        return arrecad;
    }
    public void setArrecad(double arrecad) {
        this.arrecad = arrecad;
    }
    public String getNomeUsuario() {
        return nomeUsuario;
    }
    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    
}
