import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Menu Fixo na Esquerda */}
      <Sidebar />

      {/* Conteúdo Dinâmico na Direita */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-end mb-8">
          <div className="flex items-center gap-3">
            <span className="font-medium">Oficina Master</span>
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              ADM
            </div>
          </div>
        </header>
        
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;