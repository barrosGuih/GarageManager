package com.oficina.gestao.controller;

import java.util.List;
import java.util.Map;
import com.oficina.gestao.model.Produto;
import com.oficina.gestao.service.EstoqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*; // O '*' resolve o erro de 'cannot find symbol'

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
    @Autowired
    private EstoqueService estoqueService;

    @PostMapping
    public Produto addProduto(@RequestBody Map<String, Object> body) {
        String nome = (String) body.get("nome");
        int quantidade = ((Number) body.get("quantidade")).intValue();
        int valor = ((Number) body.get("valor")).intValue();
        return estoqueService.adicionarProduto(nome, quantidade, valor);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) { // Agora o import funciona
        estoqueService.excluirProduto(id);
    }

    @GetMapping
    public List<Produto> listarProdutos() {
        return estoqueService.listarProdutos();
    }
}