import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Produtos from '../pages/Produtos';
import Movimentacoes from '../pages/Movimentacao';
import Vendas from '../pages/Vendas';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/movimentacoes" element={<Movimentacoes />} />
      <Route path="/vendas" element={<Vendas />} />
      {/* Rota 404 opcional */}
      <Route path="*" element={<div className="p-10">Página não encontrada</div>} />
    </Routes>
  );
}