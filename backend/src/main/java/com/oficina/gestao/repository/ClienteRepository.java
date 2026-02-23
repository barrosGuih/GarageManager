package com.oficina.gestao.repository;

import com.oficina.gestao.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    
}
