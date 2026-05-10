import { Link, useNavigate } from "react-router-dom";
import { Eye, Star, ShoppingCart, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const productId = product._id || product.id;

  const buyNow = () => {
    if (!user) {
      navigate("/register");
      return;
    }

    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="card overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
      <div className="h-56 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <p className="text-xs font-bold text-orange-500">{product.category}</p>
        <h3 className="text-lg font-bold mt-1">{product.name}</h3>
        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" /> {product.rating}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Eye size={16} /> {product.views} views
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h4 className="text-xl font-black">Rs {product.price}</h4>
          <Link
            to={`/product/${productId}`}
            className="text-orange-500 font-bold"
          >
            View
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={() => addToCart(product)}
            className="btn-outline py-2 text-sm flex items-center justify-center gap-1"
          >
            <ShoppingCart size={16} /> Cart
          </button>

          <button
            onClick={buyNow}
            className="btn-primary py-2 text-sm flex items-center justify-center gap-1"
          >
            <Zap size={16} /> Buy
          </button>
        </div>
      </div>
    </div>
  );
}