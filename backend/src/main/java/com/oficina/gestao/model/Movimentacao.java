package com.oficina.gestao.model;

import java.time.LocalDateTime;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "movimentacoes")
public class Movimentacao{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long produtoId;
    private Integer quantidade;
    private String tipo;
    private Integer produtoValor;
    private String descricao;
    private LocalDateTime dataHora;

    @PrePersist
    public void PrePersist() {
        dataHora = LocalDateTime.now();
    }

    public Movimentacao(){}

    public Long getId(){
        return id;
    }

    public Long getProdutoId(){
        return produtoId;
    }

    public void setProdutoId(Long produtoId){
        this.produtoId = produtoId;
    }

    public Integer getQuantidade(){
        return quantidade;
    }

    public void setQuantidade(Integer quantidade){
        this.quantidade = quantidade;
    }

    public String getDescricao(){
        return descricao;
    }

    public void setDescricao(String descricao){
        this.descricao = descricao;
    }

    public String getTipo(){
        return tipo;
    }

    public void setTipo(String tipo){
        this.tipo = tipo;
    }

    public Integer getProdutoValor(){
        return produtoValor;
    }

    public void setProdutoValor(Integer produtoValor){
        this.produtoValor = produtoValor;
    }

    public LocalDateTime getDataHora(){
        return dataHora;
    }

}