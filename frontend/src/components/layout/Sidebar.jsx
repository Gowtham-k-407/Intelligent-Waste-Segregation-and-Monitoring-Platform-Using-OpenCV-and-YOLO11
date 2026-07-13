import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Camera,
  Recycle,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Recycle className="text-green-400" size={34} />
          <div>
            <h1 className="text-lg font-bold">
              WasteAI
            </h1>
            <p className="text-xs text-gray-400">
              Smart Segregation
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-green-500 text-black font-semibold"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-center text-xs text-gray-500">
        Hackathon MVP 🚀
      </div>
    </aside>
  );
};

export default Sidebar;