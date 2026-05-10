import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import API from "../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/admin/orders");
      setOrders(data);
    } catch (error) {
      alert("Orders loading failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/orders/${id}/status`, { status });

      fetchOrders();

      alert("Order status updated");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-black">Admin Orders</h1>

      <p className="text-slate-500 mt-2">
        Manage all customer orders.
      </p>

      <div className="space-y-6 mt-8">
        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <ShoppingBag
              className="mx-auto text-orange-500"
              size={60}
            />

            <h2 className="text-2xl font-black mt-4">
              No orders found
            </h2>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="card p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    {order.user?.name} — {order.user?.email}
                  </p>

                  <p className="font-bold mt-2">
                    Total: Rs {order.total}
                  </p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border rounded-2xl px-4 py-3 font-bold outline-none"
                >
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <div className="mt-5 grid md:grid-cols-2 gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      className="w-14 h-14 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <b>
                      Rs {item.price * item.quantity}
                    </b>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}