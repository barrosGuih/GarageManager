import Produtos from "./components/Produtos";
import Movimentacoes from "./components/Movimentacoes";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Garage Manager</h1>
      <Produtos />
      <hr />
      <Movimentacoes />
    </div>
  );
}

export default App;