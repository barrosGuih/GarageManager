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

    public Produto adicionarProduto(String nome, int quantidade, int valor) {
        Produto p = new Produto();
        p.setNome(nome);
        p.setQuantidade(quantidade);
        p.setValor(valor);
        ;
        return produtoRepository.save(p);
    }

    public void entradaProduto(int produtoId, int quantidade, int produtoValor, String descricao) {

        if (produtoId > 0) {
            Produto p = produtoRepository.findById(produtoId)
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            p.setQuantidade(p.getQuantidade() + quantidade);
            produtoRepository.save(p);
        }

        // Salva a movimentação
        Movimentacao m = new Movimentacao();
        m.setProdutoId(produtoId);
        m.setQuantidade(quantidade);
        m.setProdutoValor(produtoValor);
        m.setTipo("ENTRADA");
        m.setDescricao(descricao);
        movimentacaoRepository.save(m);
    }

    public void saidaProduto(int produtoId, int quantidade, int produtoValor, String descricao) {

        if (produtoId > 0) {
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