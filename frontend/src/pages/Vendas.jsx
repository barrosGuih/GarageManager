import React, { useState, useEffect } from 'react';
import { listarProdutos, saidaProduto } from '../api';
import { ShoppingCart, Plus, Trash2, CheckCircle, Package, User, Calculator } from 'lucide-react';

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [cliente, setCliente] = useState('');

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const dados = await listarProdutos();
      setProdutos(Array.isArray(dados) ? dados : []);
    } catch (err) { console.error(err); }
  }

  // Adiciona item ao carrinho (local)
  function adicionarAoCarrinho() {
    if (!produtoSelecionado) return;
    
    const prod = produtos.find(p => p.id === Number(produtoSelecionado));
    
    // Validação de estoque local
    if (prod.quantidade < quantidade) {
      alert("Estoque insuficiente!");
      return;
    }

    const novoItem = {
      id: prod.id,
      nome: prod.nome,
      quantidade: Number(quantidade),
      preco: prod.preco || 0,
      subtotal: (prod.preco || 0) * quantidade
    };

    setCarrinho([...carrinho, novoItem]);
    setProdutoSelecionado('');
    setQuantidade(1);
  }

  function removerDoCarrinho(index) {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  }

  const totalVenda = carrinho.reduce((acc, item) => acc + item.subtotal, 0);

  // Finaliza a venda enviando cada item para a API
  async function finalizarVenda() {
    if (carrinho.length === 0) return;

    try {
      // Para cada item no carrinho, chama a API de saída de estoque
      const promises = carrinho.map(item => saidaProduto(item.id, item.quantidade));
      await Promise.all(promises);

      alert("Venda/Serviço finalizado com sucesso! Estoque atualizado.");
      setCarrinho([]);
      setCliente('');
      carregarProdutos(); // Recarrega o estoque
    } catch (err) {
      alert("Erro ao processar venda no servidor.");
    }
  }

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-600 p-3 rounded-2xl text-white shadow-lg shadow-orange-200">
          <ShoppingCart size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800">Nova Venda / <span className="text-brand-600">O.S</span></h1>
          <p className="text-slate-500">Registre a saída de peças e serviços prestados.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA DA ESQUERDA: SELEÇÃO */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <User size={18} className="text-brand-600"/> Dados do Cliente
            </h3>
            <input 
              type="text"
              placeholder="Nome do Cliente / Placa do Carro"
              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20"
              value={cliente}
              onChange={e => setCliente(e.target.value)}
            />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Package size={18} className="text-brand-600"/> Adicionar Peças
            </h3>
            
            <div className="space-y-4">
              <select 
                className="w-full border border-slate-200 p-3 rounded-xl outline-none bg-slate-50"
                value={produtoSelecionado}
                onChange={e => setProdutoSelecionado(e.target.value)}
              >
                <option value="">Selecione a peça...</option>
                {produtos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nome} (Saldo: {p.quantidade})
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <input 
                  type="number"
                  min="1"
                  className="w-24 border border-slate-200 p-3 rounded-xl outline-none"
                  value={quantidade}
                  onChange={e => setQuantidade(e.target.value)}
                />
                <button 
                  onClick={adicionarAoCarrinho}
                  className="flex-1 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20}/> Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DA DIREITA: CARRINHO / RESUMO */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-700">Itens da Ordem de Serviço</h3>
              <span className="text-slate-400 text-sm">{carrinho.length} itens</span>
            </div>

            <div className="p-6">
              {carrinho.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-20"/>
                  <p>O carrinho está vazio.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {carrinho.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{item.nome}</span>
                        <span className="text-xs text-slate-500">{item.quantidade}x R$ {item.preco}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-black text-slate-700">R$ {item.subtotal.toFixed(2)}</span>
                        <button 
                          onClick={() => removerDoCarrinho(index)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TOTALIZER */}
            <div className="bg-slate-900 p-8 text-white">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Calculator className="text-brand-500" />
                  <span className="text-lg font-medium opacity-80">Total Geral</span>
                </div>
                <span className="text-4xl font-black text-brand-500">
                  R$ {totalVenda.toFixed(2)}
                </span>
              </div>
              
              <button 
                disabled={carrinho.length === 0}
                onClick={finalizarVenda}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-brand-900/20 transition-all flex items-center justify-center gap-3"
              >
                <CheckCircle size={24}/> FINALIZAR SERVIÇO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}