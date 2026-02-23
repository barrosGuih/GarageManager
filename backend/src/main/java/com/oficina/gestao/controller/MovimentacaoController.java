package com.oficina.gestao.controller;

import java.util.List;
import java.util.Map;

import com.oficina.gestao.model.Movimentacao;
import com.oficina.gestao.service.EstoqueService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movimentacoes")
public class MovimentacaoController {

    @Autowired
    private EstoqueService estoqueService;

    @PostMapping("/entrada")
    public void entradaProduto(@RequestBody Map<String, Integer> body) {
        Integer produtoId = body.get("produtoId");
        Integer quantidade = body.get("quantidade");

        estoqueService.entradaProduto(produtoId, quantidade);
    }

    @PostMapping("/saida")
    public void saidaProduto(@RequestBody Map<String, Integer> body) {
        Integer produtoId = body.get("produtoId");
        Integer quantidade = body.get("quantidade");

        estoqueService.saidaProduto(produtoId, quantidade);
    }

    @GetMapping
    public List<Movimentacao> listarHistorico() {
        return estoqueService.listarHistorico();
    }
}