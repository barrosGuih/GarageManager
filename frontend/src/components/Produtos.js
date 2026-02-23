import { useEffect, useState } from "react";
import { listarProdutos, adicionarProduto } from "../api";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState(0);

    function carregar() {
        listarProdutos().then(setProdutos);
    }

    useEffect(() => {
        carregar();
    }, []);

    function salvar() {
        adicionarProduto({ nome, quantidade })
            .then(() => {
                setNome("");
                setQuantidade(0);
                carregar();
            });
    }

    return (
        <div>
            <h2>Produtos</h2>

            <input
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />


            <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={e => setQuantidade(Number(e.target.value))}
            />

            <button onClick={salvar}>Adicionar</button>

            <ul>
                {produtos.map(p => (
                    <li key={p.id}>
                        {p.nome} - {p.quantidade}
                    </li>
                ))}
            </ul>

        </div>
    )
}