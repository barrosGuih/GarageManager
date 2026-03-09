package com.oficina.gestao.repository;

import com.oficina.gestao.model.Movimentacao;
import com.oficina.gestao.model.TipoMovimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
    
    /**
     * Encontra todas as movimentações de um produto específico
     */
    @Query("SELECT m FROM Movimentacao m WHERE m.produto.id = :produtoId ORDER BY m.dataHora DESC")
    List<Movimentacao> findByProdutoId(@Param("produtoId") Long produtoId);
    
    /**
     * Encontra movimentações por tipo (ENTRADA ou SAIDA)
     */
    List<Movimentacao> findByTipo(TipoMovimentacao tipo);
    
    /**
     * Encontra movimentações em um intervalo de datas
     */
    @Query("SELECT m FROM Movimentacao m WHERE m.dataHora BETWEEN :dataInicio AND :dataFim ORDER BY m.dataHora DESC")
    List<Movimentacao> findByDataHoraBetween(
            @Param("dataInicio") LocalDateTime dataInicio,
            @Param("dataFim") LocalDateTime dataFim
    );
}