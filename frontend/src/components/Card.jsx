import { motion } from "framer-motion";

export default function Card({ title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow p-6"
    >
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-3xl font-bold text-primary">{value}</h3>
    </motion.div>
  );
}