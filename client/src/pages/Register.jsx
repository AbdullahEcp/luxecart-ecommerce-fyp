import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingCart,
  ShieldCheck,
  PackageCheck,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[2rem] overflow-hidden shadow-2xl">
        <form onSubmit={submitHandler} className="p-8 sm:p-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
              <ShoppingCart />
            </div>
            <h2 className="text-2xl font-black">
              Luxe<span className="text-orange-500">Cart</span>
            </h2>
          </div>

          <p className="text-orange-500 font-bold">Create New Account</p>
          <h1 className="text-4xl font-black mt-2">Register</h1>
          <p className="text-slate-500 mt-2">
            Register first, then you can buy products and place orders.
          </p>

          <div className="mt-8 space-y-5">
            <InputBox
              icon={<User />}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

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
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <ArrowRight size={20} />}
          </button>

          <p className="text-center mt-7 text-slate-500">
            Already registered?{" "}
            <Link to="/login" className="text-orange-500 font-black">
              Login
            </Link>
          </p>
        </form>

        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-orange-600 via-slate-900 to-slate-950 text-white">
          <div>
            <h1 className="text-5xl font-black leading-tight">
              Create account and start premium shopping.
            </h1>

            <p className="text-white/80 mt-5 text-lg">
              Your account will be saved in MongoDB with secure password hashing and JWT authentication.
            </p>
          </div>

          <div className="space-y-4">
            <Feature
              icon={<ShieldCheck />}
              title="Secure Authentication"
              text="Protected user registration and login"
            />

            <Feature
              icon={<PackageCheck />}
              title="Order Management"
              text="Place order and track delivery status"
            />

            <Feature
              icon={<ShoppingCart />}
              title="Personal Cart"
              text="Each user has separate cart data"
            />
          </div>
        </div>
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

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-3xl p-5 flex gap-4">
      <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-orange-300">
        {icon}
      </div>
      <div>
        <h3 className="font-black">{title}</h3>
        <p className="text-white/70 text-sm mt-1">{text}</p>
      </div>
    </div>
  );
}