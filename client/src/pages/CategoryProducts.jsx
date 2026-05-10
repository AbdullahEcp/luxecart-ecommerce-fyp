import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import API from "../api/axios";

export default function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filtered = products.filter((p) => p.category === categoryName);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        alert("Category products loading failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h1 className="p-10 text-2xl font-black">Loading category...</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-12">
      <Link to="/shop" className="text-orange-500 font-bold">
        ← Back to Shop
      </Link>

      <h1 className="text-4xl font-black mt-5">{categoryName}</h1>
      <p className="text-slate-500 mt-2">
        {filtered.length} products available in this category.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}