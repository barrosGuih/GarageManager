package com.oficina.gestao.controller;

import java.util.List;
import java.util.Map;

import com.oficina.gestao.model.Movimentacao;
import com.oficina.gestao.service.EstoqueService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movimentacoes")
@CrossOrigin(origins = "http://localhost:5173")
public class MovimentacaoController {

    @Autowired
    private EstoqueService estoqueService;

    @PostMapping("/entrada")
    public void entradaProduto(@RequestBody Map<String, Object> body) {
        Integer produtoId = Integer.valueOf(body.get("produtoId").toString());
        Integer quantidade = Integer.valueOf(body.get("quantidade").toString());
        Integer produtoValor = Integer.valueOf(body.get("produtoValor").toString());

        String descricao = body.getOrDefault("descricao", "").toString();

        estoqueService.entradaProduto(produtoId, quantidade, produtoValor, descricao);
    }

    @PostMapping("/saida")
    public void saidaProduto(@RequestBody Map<String, Object> body) {
        Integer produtoId = Integer.valueOf(body.get("produtoId").toString());
        Integer quantidade = Integer.valueOf(body.get("quantidade").toString());
        Integer produtoValor = Integer.valueOf(body.get("produtoValor").toString());

        String descricao = body.getOrDefault("descricao", "").toString();

        estoqueService.saidaProduto(produtoId, quantidade, produtoValor, descricao);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        estoqueService.excluirMovimentacao(id);
    }

    @GetMapping
    public List<Movimentacao> listarHistorico() {
        return estoqueService.listarHistorico();
    }
}