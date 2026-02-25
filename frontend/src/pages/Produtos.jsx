import React, { useState, useEffect } from 'react';
import { listarProdutos, adicionarProduto } from '../api';
import { Plus, Package, Search, AlertCircle, CheckCircle2, X, Filter } from 'lucide-react';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtro, setFiltro] = useState('');
  
  // Estado do formulário
  const [formData, setFormData] = useState({ nome: '', quantidade: '', valor: '' });

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const dados = await listarProdutos();
      setProdutos(Array.isArray(dados) ? dados : []);
    } catch (err) { console.error(err); }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await adicionarProduto({
        nome: formData.nome,
        quantidade: Number(formData.quantidade),
        valor: Number(formData.valor) // Verifique se seu Java aceita preço
      });
      setFormData({ nome: '', quantidade: '', valor: '' });
      setIsModalOpen(false);
      carregarProdutos();
    } catch (err) { alert("Erro ao salvar!"); }
  }

  const produtosFiltrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in duration-300">
      
      {/* HEADER E RESUMO */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Gerenciamento de <span className="text-brand-600">Peças</span></h1>
          <p className="text-slate-500">Controle total do seu inventário industrial.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-orange-200 transition-all hover:-translate-y-1"
        >
          <Plus size={20}/> Novo Produto
        </button>
      </div>

      {/* CARDS DE STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-4 rounded-2xl text-orange-600"><Package size={24}/></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total de Itens</p>
            <p className="text-2xl font-black">{produtos.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 border-l-4 border-l-red-500">
          <div className="bg-red-100 p-4 rounded-2xl text-red-600"><AlertCircle size={24}/></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Crítico (Abaixo de 5)</p>
            <p className="text-2xl font-black text-red-600">{produtos.filter(p => p.quantidade < 5).length}</p>
          </div>
        </div>
      </div>

      {/* BARRA DE PESQUISA */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" size={20}/>
        <input 
          type="text"
          placeholder="Pesquisar por nome da peça..."
          className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {/* TABELA ESTILIZADA */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Produto</th>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Quantidade</th>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Preço Est.</th>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {produtosFiltrados.map(p => (
              <tr key={p.id} className="hover:bg-orange-50/30 transition-colors group">
                <td className="p-5 font-bold text-slate-700">{p.nome}</td>
                <td className="p-5 text-center font-mono font-bold text-lg">{p.quantidade}</td>
                <td className="p-5 text-slate-600">R$ {p.preco || '0,00'}</td>
                <td className="p-5">
                  {p.quantidade <= 5 ? (
                    <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 w-fit">
                      <AlertCircle size={14}/> REPOR URGENTE
                    </span>
                  ) : (
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 w-fit">
                      <CheckCircle2 size={14}/> ESTOQUE OK
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CADASTRO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-800">Nova Peça</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24}/>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Produto</label>
                <input 
                  required
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-brand-500/20 outline-none"
                  placeholder="Ex: Amortecedor Dianteiro"
                  value={formData.nome}
                  onChange={e => setFormData({...formData, nome: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Qtd Inicial</label>
                  <input 
                    required
                    type="number"
                    className="w-full border border-slate-200 p-3 rounded-xl outline-none"
                    placeholder="0"
                    value={formData.quantidade}
                    onChange={e => setFormData({...formData, quantidade: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Preço Un.</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full border border-slate-200 p-3 rounded-xl outline-none"
                    placeholder="R$ 0,00"
                    value={formData.valor}
                    onChange={e => setFormData({...formData, valor: e.target.value})}
                  />
                </div>
              </div>
              <button className="w-full bg-brand-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-200 hover:bg-brand-700 transition-all mt-4">
                SALVAR NO ESTOQUE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}