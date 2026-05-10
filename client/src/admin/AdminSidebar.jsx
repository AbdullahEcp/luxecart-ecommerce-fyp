import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  ShoppingBag,
  Users,
  Home,
} from "lucide-react";

export default function AdminSidebar({ closeMenu }) {
  const links = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Add Product", path: "/admin/add-product", icon: PackagePlus },
    { name: "Products", path: "/admin/products", icon: Boxes },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Users", path: "/admin/users", icon: Users },
  ];

  return (
    <aside className="h-full min-h-screen bg-slate-950 text-white p-5 overflow-y-auto">
      <Link
        to="/admin"
        onClick={closeMenu}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center font-black">
          L
        </div>

        <div>
          <h1 className="text-2xl font-black leading-none">
            Luxe<span className="text-orange-400">Cart</span>
          </h1>
          <p className="text-xs text-white/50 mt-1">Admin Panel</p>
        </div>
      </Link>

      <div className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === "/admin"}
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <link.icon size={20} />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl font-black bg-white text-slate-950 hover:bg-orange-500 hover:text-white transition-all"
        >
          <Home size={20} />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}