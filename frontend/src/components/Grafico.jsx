import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Grafico({ titulo, dados }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">{titulo}</h3>
      <Bar data={dados} />
    </div>
  );
}