import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import API from "../api/axios";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [...new Set(products.map((p) => p.category))];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        alert("Products loading failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h1 className="p-10 text-2xl font-black">Loading products...</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-12">
      <h1 className="text-4xl font-black">Shop Products</h1>
      <p className="text-slate-500 mt-2">
        Products loaded from MongoDB database.
      </p>

      {categories.map((cat) => {
        const categoryProducts = products.filter((p) => p.category === cat);

        return (
          <section key={cat} className="py-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">{cat}</h2>
              <Link
                to={`/category/${cat}`}
                className="text-orange-500 font-bold"
              >
                Open Category
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}