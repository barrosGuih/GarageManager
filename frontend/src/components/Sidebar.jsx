import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowLeftRight, ShoppingCart, Wrench, StickyNote } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Estoque', path: '/produtos', icon: <Package size={20} /> },
    { name: 'Movimentações', path: '/movimentacoes', icon: <ArrowLeftRight size={20} /> },
    { name: 'Vender', path: '/vendas', icon: <ShoppingCart size={20} /> },
    { name: 'Minhas NFE', path: '/#', icon: <StickyNote size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-screen fixed left-0 top-0 text-white p-6">
      <div className="flex items-center gap-2 mb-10">
        <Wrench className="text-orange-500" size={28} />
        <h1 className="text-xl font-bold tracking-tight">Garage<span className="text-orange-500">Manager</span></h1>
      </div>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              location.pathname === item.path
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}