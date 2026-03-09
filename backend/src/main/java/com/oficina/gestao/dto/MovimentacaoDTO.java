package com.oficina.gestao.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class MovimentacaoDTO {
    
    @NotNull(message = "ID do produto é obrigatório")
    private Long produtoId;

    @Positive(message = "Quantidade deve ser positiva")
    @NotNull(message = "Quantidade é obrigatória")
    private Integer quantidade;

    @Positive(message = "Valor deve ser positivo")
    @NotNull(message = "Valor é obrigatório")
    private Integer produtoValor;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    public MovimentacaoDTO() {
    }

    public MovimentacaoDTO(Long produtoId, Integer quantidade, Integer produtoValor, String descricao) {
        this.produtoId = produtoId;
        this.quantidade = quantidade;
        this.produtoValor = produtoValor;
        this.descricao = descricao;
    }

    public Long getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Long produtoId) {
        this.produtoId = produtoId;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Integer getProdutoValor() {
        return produtoValor;
    }

    public void setProdutoValor(Integer produtoValor) {
        this.produtoValor = produtoValor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}