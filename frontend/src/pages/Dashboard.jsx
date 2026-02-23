import { useState, useEffect} from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, baixoEstoque: 0, movs: 0 });

  useEffect(() => {
    async function carregarDashboard() {
      const [produtos, movs] = await Promise.all([listarProdutos(), listarMovimentacoes()]);
      setStats({
        total: produtos.length,
        baixoEstoque: produtos.filter(p => p.quantidade < 5).length,
        movs: movs.length
      });
    }
    carregarDashboard();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-wider">Dashboard Oficina</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border-b-4 border-brand-500 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase">Produtos Cadastrados</p>
          <h3 className="text-4xl font-black text-slate-800">{stats.total}</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border-b-4 border-red-500 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase">Itens em Alerta</p>
          <h3 className="text-4xl font-black text-red-600">{stats.baixoEstoque}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border-b-4 border-blue-500 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase">Total Movimentações</p>
          <h3 className="text-4xl font-black text-slate-800">{stats.movs}</h3>
        </div>
      </div>

      {/* Gráfico aqui como fizemos antes... */}
    </div>
  );
}