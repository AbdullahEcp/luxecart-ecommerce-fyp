import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, Star, ShoppingCart, Zap } from "lucide-react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const buyNow = () => {
    if (!user) {
      navigate("/register");
      return;
    }

    addToCart(product);
    navigate("/checkout");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        alert("Product loading failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h1 className="p-10 text-2xl font-black">Loading...</h1>;

  if (!product) return <h1 className="p-10">Product not found</h1>;

  return (
    <div className="max-w-7xl mx-auto px-5 py-12">
      <div className="grid md:grid-cols-2 gap-10 card p-6">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-3xl w-full h-[500px] object-cover"
        />

        <div className="flex flex-col justify-center">
          <p className="text-orange-500 font-bold">{product.category}</p>
          <h1 className="text-4xl font-black mt-2">{product.name}</h1>

          <div className="flex gap-6 mt-4">
            <span className="flex items-center gap-1 text-yellow-500">
              <Star fill="currentColor" /> {product.rating}
            </span>

            <span className="flex items-center gap-1 text-slate-500">
              <Eye /> {product.views} Views
            </span>
          </div>

          <p className="text-slate-600 mt-6 text-lg">{product.description}</p>

          <p className="mt-4 text-slate-500">Stock: {product.stock}</p>

          <h2 className="text-4xl font-black mt-8">Rs {product.price}</h2>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => addToCart(product)}
              className="btn-outline flex items-center justify-center gap-2"
            >
              <ShoppingCart /> Add to Cart
            </button>

            <button
              onClick={buyNow}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Zap /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}