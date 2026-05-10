import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-slate-100">
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-950 text-white p-3 rounded-2xl shadow-lg"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />

          <div className="relative w-80 max-w-[85%] h-full bg-slate-950 shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-xl z-10"
            >
              <X size={22} />
            </button>

            <AdminSidebar closeMenu={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="hidden lg:block fixed left-0 top-0 w-[280px] h-screen">
        <AdminSidebar />
      </div>

      <main className="lg:ml-[280px] p-5 lg:p-8 pt-20 lg:pt-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}