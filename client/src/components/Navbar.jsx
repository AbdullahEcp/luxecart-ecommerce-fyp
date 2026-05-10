import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Orders", path: "/orders" },
    { name: "Tracking", path: "/tracking" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black">
          Luxe<span className="text-orange-500">Cart</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500"
                  : "text-slate-700 hover:text-orange-500"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 rounded-xl hover:bg-slate-100">
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="hidden md:block">
            {user ? (
              <button onClick={logout} className="btn-outline py-2 flex items-center gap-2">
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <Link to="/login" className="btn-primary py-2 flex items-center gap-2">
                <User size={18} /> Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl bg-slate-100"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-5 py-5 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block font-bold text-slate-700 hover:text-orange-500"
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="btn-outline w-full"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="btn-primary block text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}