const API_URL = "http://localhost:8080/api";

// Função auxiliar para tratar as respostas e erros
async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro: ${res.status}`);
  }
  // Se for DELETE ou se a resposta estiver vazia, não tenta dar .json()
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return true;
  }
  return res.json();
}

export async function listarProdutos() {
  const res = await fetch(`${API_URL}/produtos`);
  return handleResponse(res);
}

export async function adicionarProduto(produto) {
  const res = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  });
  return handleResponse(res);
}

export async function entradaProduto(produtoId, quantidade, produtoValor, descricao) {
  const res = await fetch(`${API_URL}/movimentacoes/entrada`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ produtoId, quantidade, produtoValor, descricao })
  });
  return handleResponse(res);
}

export async function saidaProduto(produtoId, quantidade, produtoValor, descricao) {
  const res = await fetch(`${API_URL}/movimentacoes/saida`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ produtoId, quantidade, produtoValor, descricao })
  });
  return handleResponse(res);
}

export async function listarMovimentacoes() {
  const res = await fetch(`${API_URL}/movimentacoes`);
  return handleResponse(res);
}

// CORRIGIDO: Agora usando fetch e o método DELETE corretamente
export async function excluirMovimentacao(id) {
  const res = await fetch(`${API_URL}/movimentacoes/${id}`, {
    method: "DELETE"
  });
  return handleResponse(res);
}