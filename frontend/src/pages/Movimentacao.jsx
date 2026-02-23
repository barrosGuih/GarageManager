import { useEffect, useState } from 'react';
import { listarProdutos, entradaProduto, saidaProduto, listarMovimentacoes } from '../api/index';
import { ArrowUpCircle, ArrowDownCircle, History } from 'lucide-react';

export default function Movimentacoes() {
  const [produtos, setProdutos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [form, setForm] = useState({ produtoId: '', quantidade: '', tipo: 'entrada' });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [p, m] = await Promise.all([listarProdutos(), listarMovimentacoes()]);
      // USAR TRAVA: garante que p e m sejam arrays, se não forem, usa array vazio []
      setProdutos(Array.isArray(p) ? p : []);
      const listaMovs = Array.isArray(m) ? m : [];
      setHistorico([...listaMovs].reverse()); // Spread [...] evita erro de mutação
    } catch (err) {
      console.error("Erro ao carregar dados da API", err);
    }
  }

  async function handleProcessar(e) {
    e.preventDefault();
    try {
      const qty = parseInt(form.quantidade);
      if (form.tipo === 'entrada') {
        await entradaProduto(form.produtoId, qty);
      } else {
        await saidaProduto(form.produtoId, qty);
      }
      setForm({ ...form, quantidade: '' });
      carregarDados();
      alert("Sucesso!");
    } catch (err) {
      alert("Erro ao processar movimentação");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 italic">Nova Operação</h2>
          <form onSubmit={handleProcessar} className="space-y-4">
            <select 
              className="w-full border p-3 rounded-xl bg-slate-50"
              value={form.tipo}
              onChange={e => setForm({...form, tipo: e.target.value})}
            >
              <option value="entrada">Entrada (+)</option>
              <option value="saida">Saída (-)</option>
            </select>
            <select 
              required
              className="w-full border p-3 rounded-xl bg-slate-50"
              value={form.produtoId}
              onChange={e => setForm({...form, produtoId: e.target.value})}
            >
              <option value="">Selecione a peça...</option>
              {produtos.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
            <input 
              required
              type="number"
              placeholder="Quantidade"
              className="w-full border p-3 rounded-xl bg-slate-50"
              value={form.quantidade}
              onChange={e => setForm({...form, quantidade: e.target.value})}
            />
            <button className="w-full py-3 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 transition-all">
              Confirmar
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-600">
            <History size={20}/> Histórico
          </h2>
          <div className="space-y-3">
            {historico.map((m, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-700">Prod #{m.produtoId}</span>
                <span className={`font-black ${m.tipo === 'ENTRADA' ? 'text-green-600' : 'text-brand-600'}`}>
                  {m.tipo === 'ENTRADA' ? '+' : '-'}{m.quantidade}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}