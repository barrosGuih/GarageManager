package com.oficina.gestao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.oficina.gestao.service.EstoqueService;
import com.oficina.gestao.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {}