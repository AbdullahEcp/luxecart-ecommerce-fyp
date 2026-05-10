import { useEffect, useState } from "react";
import { Boxes, ShoppingBag, Users, Wallet } from "lucide-react";
import API from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/admin/stats");
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) return <h1 className="text-2xl font-black">Loading dashboard...</h1>;

  const cards = [
    { title: "Users", value: stats.users, icon: Users },
    { title: "Products", value: stats.products, icon: Boxes },
    { title: "Orders", value: stats.orders, icon: ShoppingBag },
    { title: "Total Sales", value: `Rs ${stats.totalSales}`, icon: Wallet },
  ];

  return (
    <div>
      <h1 className="text-4xl font-black">Admin Dashboard</h1>
      <p className="text-slate-500 mt-2">Manage your ecommerce system.</p>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        {cards.map((card) => (
          <div key={card.title} className="card p-6">
            <card.icon className="text-orange-500" size={34} />
            <p className="text-slate-500 mt-4">{card.title}</p>
            <h2 className="text-3xl font-black mt-1">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="card p-6">
          <h2 className="text-2xl font-black">Top Selling Products</h2>
          <div className="space-y-4 mt-5">
            {stats.topSellingProducts.map((p) => (
              <div key={p._id} className="flex items-center gap-4">
                <img src={p.image} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-sm text-slate-500">Sold: {p.sold}</p>
                </div>
                <b>Rs {p.price}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-black">Low Stock Products</h2>
          <div className="space-y-4 mt-5">
            {stats.lowStockProducts.map((p) => (
              <div key={p._id} className="flex items-center gap-4">
                <img src={p.image} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-sm text-red-500 font-bold">Stock: {p.stock}</p>
                </div>
                <b>Rs {p.price}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}