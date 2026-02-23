package com.oficina.gestao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oficina.gestao.model.Movimentacao;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
}