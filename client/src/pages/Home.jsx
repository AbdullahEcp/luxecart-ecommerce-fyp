import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Headphones } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";

export default function Home() {
  const topSelling = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
  const lowSelling = [...products].sort((a, b) => a.sold - b.sold).slice(0, 4);

  return (
    <div>
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-orange-400 font-bold mb-3">New Collection Live</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Modern Shopping Experience For Everyone
            </h1>
            <p className="text-slate-300 mt-5 text-lg">
              Browse products, add to cart, checkout, track orders, and manage shopping easily.
            </p>

            <Link to="/shop" className="inline-flex items-center gap-2 mt-8 btn-primary">
              Shop Now <ArrowRight size={20} />
            </Link>
          </div>

          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-5">
        {[
          { icon: Truck, title: "Fast Delivery", text: "Quick and safe order delivery" },
          { icon: ShieldCheck, title: "Secure Shopping", text: "Protected user checkout flow" },
          { icon: Headphones, title: "Customer Support", text: "Easy support for every order" },
        ].map((item) => (
          <div key={item.title} className="card p-6 flex items-center gap-4">
            <item.icon className="text-orange-500" size={34} />
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-5 py-12">
        <h2 className="text-3xl font-black mb-6">Main Categories</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="card p-6 text-center font-bold hover:bg-slate-950 hover:text-white hover:-translate-y-2 transition-all duration-300"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <ProductSection title="Top Selling Products" products={topSelling} />
      <ProductSection title="Low Selling Products" products={lowSelling} />
    </div>
  );
}

function ProductSection({ title, products }) {
  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-3xl font-black">{title}</h2>
        <Link to="/shop" className="text-orange-500 font-bold">View All</Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}