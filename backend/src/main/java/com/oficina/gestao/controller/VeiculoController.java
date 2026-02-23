package com.oficina.gestao.controller;

import com.oficina.gestao.model.Veiculo;
import com.oficina.gestao.repository.VeiculoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController{
    private final VeiculoRepository repository;

    public VeiculoController(VeiculoRepository repository){
        this.repository = repository;
    }

    @PostMapping("/teste")
    public String teste(@RequestBody(required = false) String body) {
        return "CHEGOU AQUI";
    }

    @PostMapping
    public Veiculo salvar(@RequestBody Veiculo veiculo){
        return repository.save(veiculo);
    }

    @GetMapping
    public List<Veiculo> listar(){
        return repository.findAll();
    }

}