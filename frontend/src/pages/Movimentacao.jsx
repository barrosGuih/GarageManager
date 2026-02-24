import { useEffect, useState } from 'react';
import { listarProdutos, entradaProduto, saidaProduto, listarMovimentacoes, excluirMovimentacao } from '../api/index';
import { 
  Printer, TrendingUp, TrendingDown, Wallet, 
  Plus, Minus, Trash2, PencilLine 
} from 'lucide-react';

export default function Movimentacoes() {
  const [produtos, setProdutos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({ 
    itemNome: '', 
    quantidade: '1', 
    valor: '', 
    tipo: 'entrada' 
  });

  useEffect(() => { carregarDados(); }, []);

  async function carregarDados() {
    try {
      const [p, m] = await Promise.all([listarProdutos(), listarMovimentacoes()]);
      setProdutos(Array.isArray(p) ? p : []);
      setHistorico(Array.isArray(m) ? [...m].reverse() : []);
    } catch (err) { console.error(err); }
  }

  const totais = historico.reduce((acc, m) => {
    const total = (m.produtoValor || 0) * (m.quantidade || 0);
    if (m.tipo?.toUpperCase() === 'ENTRADA') acc.e += total;
    else acc.s += total;
    return acc;
  }, { e: 0, s: 0 });

  const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v / 100);

  async function handleProcessar(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const prod = produtos.find(p => p.nome.toLowerCase() === form.itemNome.toLowerCase());
      const pId = prod ? prod.id : 0;
      const valorCentavos = Math.round(parseFloat(form.valor) * 100);
      
      if (form.tipo === 'entrada') {
        await entradaProduto(pId, parseInt(form.quantidade), valorCentavos, form.itemNome);
      } else {
        await saidaProduto(pId, parseInt(form.quantidade), valorCentavos, form.itemNome);
      }
      setForm({ ...form, itemNome: '', valor: '', quantidade: '1' });
      carregarDados();
      alert("Registrado!");
    } catch (err) { 
      console.error(err);
      alert("Erro ao salvar dados."); 
    } finally { setLoading(false); }
  }

  async function handleExcluir(id) {
    if (!confirm("Deseja apagar este registro permanentemente?")) return;
    try {
      await excluirMovimentacao(id);
      carregarDados();
    } catch (err) { alert("Erro ao excluir registro."); }
  }

  return (
    <div className="max-w-7xl mx-auto p-3 md:p-8 space-y-6 pb-20">
      
      {/* HEADER FINANCEIRO (Responsivo) */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-2 no-scrollbar">
        <div className="min-w-[200px] flex-1 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between text-green-500 mb-1 font-bold text-[10px] uppercase">Receitas <TrendingUp size={14}/></div>
          <p className="text-xl font-black text-slate-800">{formatarMoeda(totais.e)}</p>
        </div>
        <div className="min-w-[200px] flex-1 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between text-red-500 mb-1 font-bold text-[10px] uppercase">Despesas <TrendingDown size={14}/></div>
          <p className="text-xl font-black text-slate-800">{formatarMoeda(totais.s)}</p>
        </div>
        <div className={`min-w-[200px] flex-1 p-5 rounded-3xl shadow-lg ${totais.e - totais.s >= 0 ? 'bg-slate-900' : 'bg-red-900'} text-white`}>
          <div className="flex justify-between opacity-70 mb-1 font-bold text-[10px] uppercase">Saldo em Caixa <Wallet size={14}/></div>
          <p className="text-xl font-black">{formatarMoeda(totais.e - totais.s)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* FORMULÁRIO (Correção dos IDs e Names) */}
        <div className="lg:col-span-1 print:hidden">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-50">
            <h2 className="text-lg font-black mb-6 uppercase tracking-tighter flex items-center gap-2 italic">
              <Plus size={20} className="text-blue-600"/> Lançamento
            </h2>

            <form onSubmit={handleProcessar} className="space-y-5">
              <div className="flex p-1 bg-slate-100 rounded-2xl">
                <button type="button" onClick={() => setForm({...form, tipo: 'entrada'})}
                  className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all ${form.tipo === 'entrada' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400'}`}>
                  ENTRADA
                </button>
                <button type="button" onClick={() => setForm({...form, tipo: 'saida'})}
                  className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all ${form.tipo === 'saida' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-400'}`}>
                  SAÍDA
                </button>
              </div>

              {/* CAMPO DESCRIÇÃO */}
              <div className="space-y-1">
                <label htmlFor="itemNome" className="text-[10px] font-black text-slate-400 uppercase ml-1">Descrição / Item</label>
                <input 
                  id="itemNome"
                  name="itemNome"
                  required 
                  list="list-prod"
                  className="w-full border-2 border-slate-50 p-4 rounded-2xl bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="Ex: Troca de Óleo"
                  value={form.itemNome}
                  onChange={e => setForm({...form, itemNome: e.target.value})}
                />
                <datalist id="list-prod">
                  {produtos.map(p => <option key={p.id} value={p.nome} />)}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* CAMPO QUANTIDADE */}
                <div className="space-y-1">
                  <label htmlFor="quantidade" className="text-[10px] font-black text-slate-400 uppercase ml-1">Qtd</label>
                  <input 
                    id="quantidade"
                    name="quantidade"
                    required 
                    type="number" 
                    className="w-full border-2 border-slate-50 p-4 rounded-2xl bg-slate-50 outline-none text-sm"
                    value={form.quantidade} 
                    onChange={e => setForm({...form, quantidade: e.target.value})} 
                  />
                </div>
                {/* CAMPO VALOR */}
                <div className="space-y-1">
                  <label htmlFor="valor" className="text-[10px] font-black text-slate-400 uppercase ml-1">Valor Unit.</label>
                  <input 
                    id="valor"
                    name="valor"
                    required 
                    type="number" 
                    step="0.01" 
                    placeholder="0,00" 
                    className="w-full border-2 border-slate-50 p-4 rounded-2xl bg-slate-50 outline-none text-sm"
                    value={form.valor} 
                    onChange={e => setForm({...form, valor: e.target.value})} 
                  />
                </div>
              </div>

              <button disabled={loading} className={`w-full py-5 rounded-2xl font-black text-white shadow-lg active:scale-95 transition-all ${
                form.tipo === 'entrada' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {loading ? 'PROCESSANDO...' : 'CONFIRMAR REGISTRO'}
              </button>
            </form>
          </div>
        </div>

        {/* LISTAGEM (HISTÓRICO) */}
        <div className="lg:col-span-3">
          <div className="bg-white p-4 md:p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[500px]">
            <div className="flex items-center justify-between mb-8 print:hidden">
              <h2 className="font-black text-xl italic tracking-tighter uppercase">Fluxo de Caixa</h2>
              <button onClick={() => window.print()} className="p-3 bg-slate-900 text-white rounded-2xl hover:scale-110 transition-all shadow-lg">
                <Printer size={20}/>
              </button>
            </div>

            {/* LISTA RESPONSIVA (Cards no Mobile) */}
            <div className="space-y-3">
              {historico.map((m) => (
                <div key={m.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center group transition-all hover:bg-white hover:shadow-md">
                  <div className="flex gap-4 items-center">
                    <div className={`w-1.5 h-10 rounded-full ${m.tipo?.toUpperCase() === 'ENTRADA' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="font-black text-slate-700 uppercase text-xs sm:text-sm">
                        {m.descricao || `Movimentação #${m.produtoId}`}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold tracking-widest">
                        {new Date(m.dataHora).toLocaleDateString('pt-BR')} • {m.quantidade} UNID.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-6">
                    <p className={`font-black text-sm sm:text-base ${m.tipo?.toUpperCase() === 'ENTRADA' ? 'text-green-600' : 'text-red-600'}`}>
                      {m.tipo?.toUpperCase() === 'ENTRADA' ? '+' : '-'}{formatarMoeda(m.produtoValor * m.quantidade)}
                    </p>
                    <button 
                      onClick={() => handleExcluir(m.id)} 
                      className="p-2.5 bg-white rounded-xl shadow-sm text-red-400 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                      title="Excluir"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              ))}
              
              {historico.length === 0 && (
                <div className="text-center py-20 text-slate-300 font-black uppercase tracking-widest italic">
                  Nenhum registro encontrado
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}