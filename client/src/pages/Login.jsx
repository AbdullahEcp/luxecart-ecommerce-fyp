import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-600 text-white">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <ShoppingBag />
              </div>
              <h2 className="text-3xl font-black">
                Luxe<span className="text-orange-300">Cart</span>
              </h2>
            </div>

            <h1 className="text-5xl font-black leading-tight mt-16">
              Welcome back to your shopping world.
            </h1>

            <p className="text-white/80 mt-5 text-lg">
              Login to view products, manage cart, checkout orders, and track your delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-3xl p-5 backdrop-blur">
              <ShieldCheck className="text-orange-300" />
              <h3 className="font-bold mt-3">Secure Login</h3>
              <p className="text-sm text-white/70 mt-1">JWT based user access</p>
            </div>

            <div className="bg-white/10 rounded-3xl p-5 backdrop-blur">
              <ShoppingBag className="text-orange-300" />
              <h3 className="font-bold mt-3">Smart Cart</h3>
              <p className="text-sm text-white/70 mt-1">User-wise cart system</p>
            </div>
          </div>
        </div>

        <form onSubmit={submitHandler} className="p-8 sm:p-12">
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
              <ShoppingBag />
            </div>
            <h2 className="text-2xl font-black">
              Luxe<span className="text-orange-500">Cart</span>
            </h2>
          </div>

          <p className="text-orange-500 font-bold">Account Login</p>
          <h1 className="text-4xl font-black mt-2">Sign in</h1>
          <p className="text-slate-500 mt-2">
            Enter your details to continue shopping.
          </p>

          <div className="mt-8 space-y-5">
            <InputBox
              icon={<Mail />}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-4 bg-slate-50 focus-within:border-orange-500">
              <span className="text-orange-500">
                <Lock />
              </span>

              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                className="outline-none w-full bg-transparent"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full mt-7 bg-slate-950 text-white py-4 rounded-2xl font-bold hover:bg-orange-500 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && <ArrowRight size={20} />}
          </button>

          <p className="text-center mt-7 text-slate-500">
            New user?{" "}
            <Link to="/register" className="text-orange-500 font-black">
              Create account
            </Link>
          </p>

          <div className="mt-7 bg-orange-50 border border-orange-100 rounded-2xl p-4 text-sm text-slate-600">
            <b>Admin Test:</b> admin@gmail.com / 123456
          </div>
        </form>
      </div>
    </div>
  );
}

function InputBox({ icon, type = "text", placeholder, value, onChange }) {
  return (
    <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-4 bg-slate-50 focus-within:border-orange-500">
      <span className="text-orange-500">{icon}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        className="outline-none w-full bg-transparent"
        onChange={onChange}
      />
    </div>
  );
}