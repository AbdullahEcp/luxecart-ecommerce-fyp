import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  User,
  Home,
  ShieldCheck,
  Truck,
  Wallet,
  CreditCard,
} from "lucide-react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [card, setCard] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/shop");
      return;
    }

    if (paymentMethod === "Online Payment Demo") {
      if (!card.cardNumber || !card.cardName || !card.expiry || !card.cvv) {
        alert("Please fill demo card details.");
        return;
      }
    }

    try {
      setLoading(true);

      const orderItems = cart.map((item) => ({
        product: String(item._id || item.id),
        name: item.name,
        image: item.image,
        price: Number(item.price),
        quantity: Number(item.quantity),
      }));

      await API.post("/orders", {
        items: orderItems,
        customer: form,
        total: Number(total),
        paymentMethod,
        paymentStatus:
          paymentMethod === "Online Payment Demo" ? "Paid" : "Pending",
      });

      clearCart();

      alert(
        paymentMethod === "Online Payment Demo"
          ? "Demo payment successful. Order placed!"
          : "Order placed successfully!"
      );

      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <Link to="/cart" className="text-orange-500 font-bold">
          ← Back to Cart
        </Link>

        <h1 className="text-4xl font-black mt-5">Secure Checkout</h1>
        <p className="text-slate-500 mt-2">
          Choose cash on delivery or online payment demo.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <form onSubmit={placeOrder} className="lg:col-span-2 card p-7">
            <h2 className="text-2xl font-black mb-6">Delivery Information</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <InputBox icon={<User />} placeholder="Full Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <InputBox icon={<Phone />} placeholder="Phone Number" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <InputBox icon={<Home />} placeholder="Complete Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
              <InputBox icon={<MapPin />} placeholder="City" onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>

            <h2 className="text-2xl font-black mt-8 mb-4">Payment Method</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("Cash on Delivery")}
                className={`rounded-3xl border p-5 text-left ${
                  paymentMethod === "Cash on Delivery"
                    ? "bg-slate-950 text-white border-slate-950"
                    : "bg-white border-slate-200"
                }`}
              >
                <Wallet className="text-orange-500" />
                <h3 className="font-black mt-3">Cash on Delivery</h3>
                <p className="text-sm opacity-70">Pay when product arrives</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("Online Payment Demo")}
                className={`rounded-3xl border p-5 text-left ${
                  paymentMethod === "Online Payment Demo"
                    ? "bg-slate-950 text-white border-slate-950"
                    : "bg-white border-slate-200"
                }`}
              >
                <CreditCard className="text-orange-500" />
                <h3 className="font-black mt-3">Online Payment Demo</h3>
                <p className="text-sm opacity-70">Simulation only for FYP</p>
              </button>
            </div>

            {paymentMethod === "Online Payment Demo" && (
              <div className="mt-6 bg-orange-50 border border-orange-100 rounded-3xl p-5">
                <h3 className="font-black text-orange-600 mb-4">
                  Demo Card Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    placeholder="Card Number: 4242 4242 4242 4242"
                    className="admin-input"
                    onChange={(e) => setCard({ ...card, cardNumber: e.target.value })}
                  />
                  <input
                    placeholder="Card Holder Name"
                    className="admin-input"
                    onChange={(e) => setCard({ ...card, cardName: e.target.value })}
                  />
                  <input
                    placeholder="Expiry: 12/28"
                    className="admin-input"
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  />
                  <input
                    placeholder="CVV: 123"
                    className="admin-input"
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <InfoCard icon={<Wallet />} title="Payment" text={paymentMethod} />
              <InfoCard icon={<ShieldCheck />} title="Secure" text="Protected order" />
              <InfoCard icon={<Truck />} title="Delivery" text="Fast shipping" />
            </div>

            <button disabled={loading} className="btn-primary w-full mt-8">
              {loading ? "Placing Order..." : "Place Order Now"}
            </button>
          </form>

          <div className="card p-6 h-fit">
            <h2 className="text-2xl font-black">Order Summary</h2>

            <div className="space-y-4 mt-5 max-h-[350px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item._id || item.id} className="flex gap-3">
                  <img src={item.image} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <b>Rs {item.price * item.quantity}</b>
                </div>
              ))}
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-lg">
              <span className="font-black">Total</span>
              <b>Rs {total}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputBox({ icon, placeholder, onChange }) {
  return (
    <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-4 bg-white focus-within:border-orange-500">
      <span className="text-orange-500">{icon}</span>
      <input required onChange={onChange} placeholder={placeholder} className="w-full outline-none bg-transparent" />
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl bg-orange-50 border border-orange-100 p-5">
      <span className="text-orange-500">{icon}</span>
      <h3 className="font-black mt-3">{title}</h3>
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}