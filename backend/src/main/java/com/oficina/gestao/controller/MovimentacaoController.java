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
    public void entrada(@RequestBody Map<String, Object> body) {
        // Conversão segura para Long
        Long produtoId = Long.valueOf(body.get("produtoId").toString());
        int quantidade = Integer.parseInt(body.get("quantidade").toString());
        int produtoValor = Integer.parseInt(body.get("produtoValor").toString());
        String descricao = (String) body.get("descricao");

        estoqueService.entradaProduto(produtoId, quantidade, produtoValor, descricao);
    }

    @PostMapping("/saida")
    public void saida(@RequestBody Map<String, Object> body) {
        Long produtoId = Long.valueOf(body.get("produtoId").toString());
        int quantidade = Integer.parseInt(body.get("quantidade").toString());
        int produtoValor = Integer.parseInt(body.get("produtoValor").toString());
        String descricao = (String) body.get("descricao");

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