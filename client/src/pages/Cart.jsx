import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, total } = useCart();

  const getId = (item) => String(item._id || item.id);

  return (
    <div className="max-w-7xl mx-auto px-5 py-12">
      <h1 className="text-4xl font-black">Shopping Cart</h1>
      <p className="text-slate-500 mt-2">Manage your selected products.</p>

      {cart.length === 0 ? (
        <div className="card p-12 text-center mt-8">
          <ShoppingBag size={60} className="mx-auto text-orange-500" />
          <h2 className="text-2xl font-black mt-4">Your cart is empty</h2>
          <Link to="/shop" className="btn-primary inline-block mt-6">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <div
                key={getId(item)}
                className="card p-4 flex flex-col sm:flex-row gap-5 sm:items-center"
              >
                <img
                  src={item.image}
                  className="w-full sm:w-28 h-36 sm:h-28 object-cover rounded-2xl"
                />

                <div className="flex-1">
                  <p className="text-orange-500 text-sm font-bold">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-black">{item.name}</h3>

                  <p className="text-slate-500 text-sm mt-1">
                    Rs {item.price} each
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item)}
                      className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-black text-lg">{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="sm:text-right">
                  <h4 className="text-xl font-black">
                    Rs {Number(item.price) * Number(item.quantity)}
                  </h4>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 mt-4 inline-flex items-center gap-1 font-bold"
                  >
                    <Trash2 size={18} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-6 h-fit lg:sticky lg:top-24">
            <h2 className="text-2xl font-black">Order Summary</h2>

            <div className="space-y-3 mt-6 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <b>Rs {total}</b>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <b>Free</b>
              </div>

              <hr />

              <div className="flex justify-between text-xl text-slate-950">
                <span className="font-black">Total</span>
                <b>Rs {total}</b>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full block text-center mt-7">
              Proceed to Checkout
            </Link>

            <Link to="/shop" className="btn-outline w-full block text-center mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}