import { useEffect, useState } from "react";
import { Trash2, Search, Pencil, X, Save } from "lucide-react";
import API from "../api/axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      alert("Products loading failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${editing._id}`, {
        ...editing,
        price: Number(editing.price),
        stock: Number(editing.stock),
        rating: Number(editing.rating),
      });

      setEditing(null);
      fetchProducts();
      alert("Product updated");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-black">Products</h1>
      <p className="text-slate-500 mt-2">Search, update, and delete products.</p>

      <div className="card p-5 mt-8">
        <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 bg-slate-50">
          <Search className="text-orange-500" />
          <input
            placeholder="Search product by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
          {filtered.map((product) => (
            <div key={product._id} className="border rounded-3xl p-4 bg-white">
              <img
                src={product.image}
                className="w-full h-48 object-cover rounded-2xl"
              />

              <p className="text-orange-500 font-bold mt-4">
                {product.category}
              </p>
              <h3 className="font-black text-lg">{product.name}</h3>

              <div className="flex justify-between mt-3 text-sm text-slate-500">
                <span>Stock: {product.stock}</span>
                <span>Sold: {product.sold}</span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <b className="text-xl">Rs {product.price}</b>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(product)}
                    className="bg-blue-50 text-blue-600 p-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteHandler(product._id)}
                    className="bg-red-50 text-red-600 p-3 rounded-xl hover:bg-red-600 hover:text-white transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <form
            onSubmit={updateHandler}
            className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black">Update Product</h2>
              <button type="button" onClick={() => setEditing(null)}>
                <X />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-5">
              <Input label="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              <Input label="Category" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
              <Input label="Price" type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
              <Input label="Stock" type="number" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: e.target.value })} />
              <Input label="Rating" type="number" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: e.target.value })} />
              <Input label="Image URL" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
            </div>

            <div className="mt-4">
              <label className="font-bold">Description</label>
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full border rounded-2xl p-4 mt-2 outline-none min-h-28"
              />
            </div>

            <button className="btn-primary w-full mt-5 flex items-center justify-center gap-2">
              <Save size={18} />
              Save Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="font-bold">{label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border rounded-2xl p-4 mt-2 outline-none focus:border-orange-500"
      />
    </div>
  );
}