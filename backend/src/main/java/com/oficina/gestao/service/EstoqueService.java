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

    public Produto adicionarProduto(String nome, int quantidade) {
        Produto p = new Produto();
        p.setNome(nome);
        p.setQuantidade(quantidade);
        return produtoRepository.save(p);
    }

    public void entradaProduto(int produtoId, int quantidade) {
        Produto p = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        
        // CORREÇÃO AQUI: Estava p.getQuantidade(p.getQuantidade() + quantidade)
        p.setQuantidade(p.getQuantidade() + quantidade); 
        produtoRepository.save(p);

        Movimentacao m = new Movimentacao();
        m.setProdutoId(produtoId);
        m.setQuantidade(quantidade);
        m.setTipo("Entrada");
        movimentacaoRepository.save(m);
    }

    public void saidaProduto(int produtoId, int quantidade) {
        Produto p = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        
        if (p.getQuantidade() < quantidade) {
            throw new RuntimeException("Estoque insuficiente");
        }
        
        p.setQuantidade(p.getQuantidade() - quantidade);
        produtoRepository.save(p);

        Movimentacao m = new Movimentacao();
        m.setProdutoId(produtoId);
        m.setQuantidade(quantidade);
        m.setTipo("Saida");
        movimentacaoRepository.save(m);
    }

    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    public List<Movimentacao> listarHistorico() {
        return movimentacaoRepository.findAll();
    }
}