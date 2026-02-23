package com.oficina.gestao.repository;

import com.oficina.gestao.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long>{
    
}