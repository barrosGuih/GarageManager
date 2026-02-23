import { useEffect, useState } from "react";
import { listarMovimentacoes, entradaProduto, saidaProduto } from "../api";

export default function Movimentacoes() {
  const [movs, setMovs] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");

  function carregar() {
    listarMovimentacoes().then(setMovs);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2>Movimentações</h2>

      <input
        placeholder="Produto ID"
        value={produtoId}
        onChange={e => setProdutoId(e.target.value)}
      />

      <input
        placeholder="Quantidade"
        type="number"
        value={quantidade}
        onChange={e => setQuantidade(e.target.value)}
      />

      <button onClick={() => entradaProduto(+produtoId, +quantidade).then(carregar)}>
        Entrada
      </button>

      <button onClick={() => saidaProduto(+produtoId, +quantidade).then(carregar)}>
        Saída
      </button>

      <ul>
        {movs.map(m => (
          <li key={m.id}>
            {m.tipo} | Produto {m.produtoId} | {m.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
}