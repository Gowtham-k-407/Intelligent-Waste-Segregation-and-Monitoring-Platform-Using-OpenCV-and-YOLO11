import { Bell, Cpu, Clock } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Intelligent Waste Segregation Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          AI Powered Waste Analytics
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-green-400">
          <Cpu size={18} />
          <span>AI Ready</span>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <Clock size={18} />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>

        <Bell className="text-white" />
      </div>
    </header>
  );
};

export default Navbar;