package com.oficina.gestao.controller;

import com.oficina.gestao.dto.MovimentacaoDTO;
import com.oficina.gestao.model.Movimentacao;
import com.oficina.gestao.service.EstoqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movimentacoes")
@CrossOrigin(origins = "http://localhost:5173")
public class MovimentacaoController {

    @Autowired
    private EstoqueService estoqueService;

    /**
     * GET /api/movimentacoes - Lista todo o histórico de movimentações
     */
    @GetMapping
    public ResponseEntity<List<Movimentacao>> listarHistorico() {
        List<Movimentacao> movimentacoes = estoqueService.listarHistorico();
        return ResponseEntity.ok(movimentacoes);
    }

    /**
     * GET /api/movimentacoes/produto/{produtoId} - Lista movimentações de um produto específico
     */
    @GetMapping("/produto/{produtoId}")
    public ResponseEntity<List<Movimentacao>> listarPorProduto(@PathVariable Long produtoId) {
        List<Movimentacao> movimentacoes = estoqueService.listarMovimentacoesPorProduto(produtoId);
        return ResponseEntity.ok(movimentacoes);
    }

    /**
     * POST /api/movimentacoes/entrada - Registra entrada de produto
     */
    @PostMapping("/entrada")
    public ResponseEntity<?> entrada(@RequestBody MovimentacaoDTO dto) {
        try {
            Movimentacao movimentacao = estoqueService.entradaProduto(
                    dto.getProdutoId(),
                    dto.getQuantidade(),
                    dto.getProdutoValor(),
                    dto.getDescricao()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(movimentacao);
        } catch (IllegalArgumentException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.badRequest().body(erro);
        } catch (RuntimeException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
        } catch (Exception e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", "Erro ao registrar entrada: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
        }
    }

    /**
     * POST /api/movimentacoes/saida - Registra saída de produto
     */
    @PostMapping("/saida")
    public ResponseEntity<?> saida(@RequestBody MovimentacaoDTO dto) {
        try {
            Movimentacao movimentacao = estoqueService.saidaProduto(
                    dto.getProdutoId(),
                    dto.getQuantidade(),
                    dto.getProdutoValor(),
                    dto.getDescricao()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(movimentacao);
        } catch (IllegalArgumentException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.badRequest().body(erro);
        } catch (RuntimeException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        } catch (Exception e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", "Erro ao registrar saída: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
        }
    }

    /**
     * DELETE /api/movimentacoes/{id} - Exclui uma movimentação
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        try {
            estoqueService.excluirMovimentacao(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
        }
    }
}