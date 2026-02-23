const API_URL = "http:localhost:8080/api";

export async function listarProdutos() {
    const res = await fetch(`${API_URL} /produtos`);
    return res.json();
}

export async function adicionarProduto(produto) {
    return fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    });
}

export async function entradaProduto(produtoId, quantidade) {
    return fetch(`${API_URL}/movimentacoes/entrada`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({produtoId, quantidade}),
    });
}

export async function saidaProduto(produtoId, quantidade) {
    return fetch(`${API_URL}/movimentacoes/saida`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({produtoId, quantidade}),
    });
}

export async function listarMovimentacoes(){
    const res = await fetch(`${API_URL}/movimentacoes`);
    return res.json();
}

