package com.oficina.gestao.controller;

import java.util.List;
import java.util.Map;

import com.oficina.gestao.model.Produto;
import com.oficina.gestao.model.Movimentacao;
import com.oficina.gestao.service.EstoqueService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/produtos")
public class ProdutoController{
    @Autowired
    private EstoqueService estoqueService;

    @PostMapping
    public Produto addProduto(@RequestBody Map<String, Object> body) {
        String nome = (String) body.get("nome");
        int quantidade = (int) body.get("quantidade");
        int valor = (int) body.get("valor");
        return estoqueService.adicionarProduto(nome,quantidade, valor);
    }

    @GetMapping
    public List<Produto> listarProdutos(){
        return estoqueService.listarProdutos();
    }
}