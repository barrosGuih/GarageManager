package com.oficina.gestao.service;

import com.oficina.gestao.model.Movimentacao;
import com.oficina.gestao.model.Produto;
import com.oficina.gestao.model.TipoMovimentacao;
import com.oficina.gestao.repository.MovimentacaoRepository;
import com.oficina.gestao.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EstoqueService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    /**
     * Adiciona um novo produto ao estoque
     */
    public Produto adicionarProduto(String nome, Integer quantidade, Integer valor) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome do produto não pode ser vazio");
        }
        if (quantidade == null || quantidade < 0) {
            throw new IllegalArgumentException("Quantidade não pode ser negativa");
        }
        if (valor == null || valor < 0) {
            throw new IllegalArgumentException("Valor não pode ser negativo");
        }

        Produto produto = new Produto(nome, quantidade, valor);
        return produtoRepository.save(produto);
    }

    /**
     * Registra entrada de produto no estoque
     */
    public Movimentacao entradaProduto(Long produtoId, Integer quantidade, Integer produtoValor, String descricao) {
        if (produtoId == null) {
            throw new IllegalArgumentException("ID do produto é obrigatório");
        }
        if (quantidade == null || quantidade <= 0) {
            throw new IllegalArgumentException("Quantidade deve ser positiva");
        }
        if (produtoValor == null || produtoValor < 0) {
            throw new IllegalArgumentException("Valor não pode ser negativo");
        }

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto com ID " + produtoId + " não encontrado"));

        // Atualiza o estoque
        produto.setQuantidade(produto.getQuantidade() + quantidade);
        produtoRepository.save(produto);

        // Registra a movimentação
        Movimentacao movimentacao = new Movimentacao(
                produto,
                quantidade,
                TipoMovimentacao.ENTRADA,
                produtoValor,
                descricao != null ? descricao : "Entrada de produto"
        );

        return movimentacaoRepository.save(movimentacao);
    }

    /**
     * Registra saída de produto do estoque
     */
    public Movimentacao saidaProduto(Long produtoId, Integer quantidade, Integer produtoValor, String descricao) {
        if (produtoId == null) {
            throw new IllegalArgumentException("ID do produto é obrigatório");
        }
        if (quantidade == null || quantidade <= 0) {
            throw new IllegalArgumentException("Quantidade deve ser positiva");
        }
        if (produtoValor == null || produtoValor < 0) {
            throw new IllegalArgumentException("Valor não pode ser negativo");
        }

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto com ID " + produtoId + " não encontrado"));

        if (produto.getQuantidade() < quantidade) {
            throw new RuntimeException(
                    "Estoque insuficiente. Disponível: " + produto.getQuantidade() + 
                    ", Solicitado: " + quantidade
            );
        }

        // Atualiza o estoque
        produto.setQuantidade(produto.getQuantidade() - quantidade);
        produtoRepository.save(produto);

        // Registra a movimentação
        Movimentacao movimentacao = new Movimentacao(
                produto,
                quantidade,
                TipoMovimentacao.SAIDA,
                produtoValor,
                descricao != null ? descricao : "Saída de produto"
        );

        return movimentacaoRepository.save(movimentacao);
    }

    /**
     * Exclui um produto
     */
    public void excluirProduto(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new RuntimeException("Produto com ID " + id + " não encontrado");
        }
        produtoRepository.deleteById(id);
    }

    /**
     * Exclui uma movimentação
     */
    public void excluirMovimentacao(Long id) {
        if (!movimentacaoRepository.existsById(id)) {
            throw new RuntimeException("Movimentação com ID " + id + " não encontrada");
        }
        movimentacaoRepository.deleteById(id);
    }

    /**
     * Lista todos os produtos
     */
    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    /**
     * Lista todo o histórico de movimentações
     */
    public List<Movimentacao> listarHistorico() {
        return movimentacaoRepository.findAll();
    }

    /**
     * Busca movimentações por ID do produto
     */
    public List<Movimentacao> listarMovimentacoesPorProduto(Long produtoId) {
        return movimentacaoRepository.findByProdutoId(produtoId);
    }
}