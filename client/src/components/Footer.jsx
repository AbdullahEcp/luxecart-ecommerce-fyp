import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-5 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center">
              <ShoppingBag />
            </div>
            <h2 className="text-2xl font-black">
              Luxe<span className="text-orange-400">Cart</span>
            </h2>
          </div>

          <p className="text-white/60 mt-4 text-sm leading-6">
            A modern e-commerce system for products, cart, checkout, orders, and tracking.
          </p>
        </div>

        <div>
          <h3 className="font-black text-lg">Quick Links</h3>
          <div className="space-y-3 mt-4 text-white/70">
            <Link to="/" className="block hover:text-orange-400">Home</Link>
            <Link to="/shop" className="block hover:text-orange-400">Shop</Link>
            <Link to="/orders" className="block hover:text-orange-400">Orders</Link>
            <Link to="/tracking" className="block hover:text-orange-400">Tracking</Link>
            <Link to="/contact" className="block hover:text-orange-400">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-black text-lg">Services</h3>
          <div className="space-y-3 mt-4 text-white/70">
            <p>Cash on Delivery</p>
            <p>Order Tracking</p>
            <p>Secure Checkout</p>
            <p>Fast Delivery</p>
          </div>
        </div>

        <div>
          <h3 className="font-black text-lg">Contact</h3>
          <div className="space-y-4 mt-4 text-white/70">
            <p className="flex gap-3">
              <Phone className="text-orange-400" size={20} />
              0310-9970561
            </p>
            <p className="flex gap-3">
              <Mail className="text-orange-400" size={20} />
              support@luxecart.com
            </p>
            <p className="flex gap-3">
              <MapPin className="text-orange-400" size={20} />
              Pakistan
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-white/50 text-sm">
        © 2026 LuxeCart. Final Year Project.
      </div>
    </footer>
  );
}