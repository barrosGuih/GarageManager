package com.oficina.gestao.controller;

import com.oficina.gestao.model.Cliente;
import com.oficina.gestao.repository.ClienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController{
    private final ClienteRepository repository;

    public ClienteController(ClienteRepository repository){
        this.repository = repository;
    }

    @GetMapping("/teste")
    public String teste(){
        return "Funcionou";
    }

    @PostMapping
    public Cliente salvar(@RequestBody Cliente cliente){
        return repository.save(cliente);
    }

    @GetMapping
    public List<Cliente> listar(){
        return repository.findAll();
    }

}