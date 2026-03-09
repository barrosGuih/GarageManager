package com.oficina.gestao.controller;

import com.oficina.gestao.model.Produto;
import com.oficina.gestao.service.EstoqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
    
    @Autowired
    private EstoqueService estoqueService;

    /**
     * GET /api/produtos - Lista todos os produtos
     */
    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> produtos = estoqueService.listarProdutos();
        return ResponseEntity.ok(produtos);
    }

    /**
     * POST /api/produtos - Adiciona um novo produto
     */
    @PostMapping
    public ResponseEntity<?> addProduto(@RequestBody Map<String, Object> body) {
        try {
            String nome = (String) body.get("nome");
            Integer quantidade = ((Number) body.get("quantidade")).intValue();
            Integer valor = ((Number) body.get("valor")).intValue();

            Produto produto = estoqueService.adicionarProduto(nome, quantidade, valor);
            return ResponseEntity.status(HttpStatus.CREATED).body(produto);
        } catch (IllegalArgumentException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.badRequest().body(erro);
        } catch (Exception e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", "Erro ao adicionar produto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
        }
    }

    /**
     * DELETE /api/produtos/{id} - Exclui um produto
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        try {
            estoqueService.excluirProduto(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
        }
    }
}