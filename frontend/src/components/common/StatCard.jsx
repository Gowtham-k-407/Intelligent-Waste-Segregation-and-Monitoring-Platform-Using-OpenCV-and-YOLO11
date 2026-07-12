import { motion } from "framer-motion";

const StatCard = ({ title, value, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"
    >
      <div className={`w-4 h-4 rounded-full ${color}`} />

      <h2 className="text-slate-400 mt-5">
        {title}
      </h2>

      <h1 className="text-4xl font-bold text-white mt-2">
        {value}
      </h1>
    </motion.div>
  );
};

export default StatCard;