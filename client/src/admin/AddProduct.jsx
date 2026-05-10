import { useState } from "react";
import { ImagePlus, PackagePlus, Copy } from "lucide-react";
import API from "../api/axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "Shirt & Pant",
    price: "",
    image: "",
    description: "",
    stock: "20",
    rating: "4.5",
  });

  const categories = [
    "Shirt & Pant",
    "Shoes",
    "Cosmetic & Perfume",
    "Electronics",
    "Bags",
  ];

  const imageSuggestions = [
    {
      title: "Shirt",
      url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
    },
    {
      title: "Shoes",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    },
    {
      title: "Perfume",
      url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
    },
    {
      title: "Watch",
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    },
    {
      title: "Bag",
      url: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800",
    },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        rating: Number(form.rating),
      });

      alert("Product added successfully");

      setForm({
        name: "",
        category: "Shirt & Pant",
        price: "",
        image: "",
        description: "",
        stock: "20",
        rating: "4.5",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Product add failed");
    }
  };

  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-black">Add Product</h1>
      <p className="text-slate-500 mt-2">
        Add product with image suggestions and live preview.
      </p>

      <div className="grid xl:grid-cols-[1fr_380px] gap-8 mt-8">
        <form onSubmit={submitHandler} className="card p-6 lg:p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Product Name"
              placeholder="Example: Classic Men Shirt"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <div>
              <label className="font-bold">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="admin-input"
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <Input
              label="Price"
              type="number"
              placeholder="Example: 2500"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <Input
              label="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <Input
              label="Rating"
              type="number"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />

            <Input
              label="Image URL"
              placeholder="Paste image link or choose below"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          <div>
            <label className="font-bold">Quick Image Suggestions</label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-3">
              {imageSuggestions.map((img) => (
                <button
                  type="button"
                  key={img.title}
                  onClick={() => setForm({ ...form, image: img.url })}
                  className="border border-slate-200 rounded-2xl p-3 text-left hover:border-orange-500 hover:bg-orange-50 transition"
                >
                  <Copy size={16} className="text-orange-500" />
                  <p className="font-bold mt-2 text-sm">{img.title}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold">Description</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Write short product description..."
              className="admin-input min-h-32"
            />
          </div>

          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <PackagePlus />
            Add Product
          </button>
        </form>

        <div className="card p-6 h-fit">
          <h2 className="text-2xl font-black">Live Preview</h2>

          <div className="mt-5 rounded-3xl overflow-hidden bg-slate-100 h-72 flex items-center justify-center">
            {form.image ? (
              <img
                src={form.image}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : (
              <div className="text-center text-slate-400">
                <ImagePlus size={60} className="mx-auto" />
                <p className="font-bold mt-3">Image preview here</p>
              </div>
            )}
          </div>

          <p className="text-orange-500 font-bold mt-5">{form.category}</p>
          <h3 className="text-xl font-black mt-1">
            {form.name || "Product Name"}
          </h3>
          <p className="text-slate-500 mt-2">
            {form.description || "Product description will appear here."}
          </p>
          <h2 className="text-2xl font-black mt-4">Rs {form.price || "0"}</h2>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="font-bold">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="admin-input"
      />
    </div>
  );
}