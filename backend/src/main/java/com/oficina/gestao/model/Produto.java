package com.oficina.gestao.model;

import jakarta.persistence.Id;

import javax.swing.event.InternalFrameAdapter;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Integer quantidade;
    private Integer valor;

    public Long getId(){
        return id;
    }

    public String getNome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public Integer getQuantidade(){
        return quantidade;
    }

    public Integer getValor(){
        return valor;
    }

    public void setValor(Integer valor){
        this.valor = valor;
    }

    public void setQuantidade(Integer quantidade){
        this.quantidade = quantidade;
    }
}