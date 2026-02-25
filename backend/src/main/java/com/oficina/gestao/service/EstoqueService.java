package com.oficina.gestao.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oficina.gestao.model.Produto;
import com.oficina.gestao.model.Movimentacao;
import com.oficina.gestao.repository.ProdutoRepository;
import com.oficina.gestao.repository.MovimentacaoRepository;

@Service
public class EstoqueService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    // Use 'double' para valor, pois preços raramente são apenas inteiros
    public Produto adicionarProduto(String nome, int quantidade, int valor) {
        Produto p = new Produto();
        p.setNome(nome);
        p.setQuantidade(quantidade);
        p.setValor(valor);
        return produtoRepository.save(p);
    }

    // CORRIGIDO: de 'int produtoId' para 'Long produtoId'
    public void entradaProduto(Long produtoId, int quantidade, int produtoValor, String descricao) {
        if (produtoId != null) {
            Produto p = produtoRepository.findById(produtoId) // Agora o tipo bate (Long com Long)
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            p.setQuantidade(p.getQuantidade() + quantidade);
            produtoRepository.save(p);
        }
        // ... restante do código
    }

    public void saidaProduto(Long produtoId, int quantidade, int produtoValor, String descricao) {
        if (produtoId != null) {
            Produto p = produtoRepository.findById(produtoId)
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            if (p.getQuantidade() < quantidade) {
                throw new RuntimeException("Estoque insuficiente");
            }

            p.setQuantidade(p.getQuantidade() - quantidade);
            produtoRepository.save(p);
        }

        Movimentacao m = new Movimentacao();
        m.setProdutoId(produtoId);
        m.setQuantidade(quantidade);
        m.setProdutoValor(produtoValor);
        m.setTipo("SAIDA");
        m.setDescricao(descricao);
        movimentacaoRepository.save(m);
    }

    public void excluirProduto(Long id) {
        produtoRepository.deleteById(id);
    }

    public void excluirMovimentacao(Long id) {
        movimentacaoRepository.deleteById(id);
    }

    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    public List<Movimentacao> listarHistorico() {
        return movimentacaoRepository.findAll();
    }
}