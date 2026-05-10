import { useEffect, useState } from "react";
import { ShoppingBag, RefreshCcw } from "lucide-react";
import API from "../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/admin/orders");
      setOrders(data);
    } catch (error) {
      alert(error.response?.data?.message || "Orders loading failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);

      await API.put(`/admin/orders/${id}/status`, { status });

      await fetchOrders();

      alert(`Order updated to ${status}`);
    } catch (error) {
      alert(error.response?.data?.message || "Status update failed");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black">Admin Orders</h1>
          <p className="text-slate-500 mt-2">Manage all customer orders.</p>
        </div>

        <button onClick={fetchOrders} className="btn-outline flex items-center gap-2">
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      <div className="space-y-6 mt-8">
        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <ShoppingBag className="mx-auto text-orange-500" size={60} />
            <h2 className="text-2xl font-black mt-4">No orders found</h2>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    User: {order.user?.name || "Deleted User"} —{" "}
                    {order.user?.email || "No Email"}
                  </p>

                  <p className="font-bold mt-2">Total: Rs {order.total}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span className="px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black">
                    Current: {order.status}
                  </span>

                  <select
                    value={order.status}
                    disabled={loadingId === order._id}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border rounded-2xl px-4 py-3 font-bold outline-none focus:border-orange-500 disabled:opacity-60"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
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
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-slate-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <b>Rs {item.price * item.quantity}</b>
                  </div>
                ))}
              </div>

              <div className="mt-5 bg-orange-50 border border-orange-100 rounded-2xl p-4">
                <h3 className="font-black text-orange-600">
                  Customer Details
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {order.customer?.name} | {order.customer?.phone} |{" "}
                  {order.customer?.city}
                </p>
                <p className="text-sm text-slate-600">
                  Address: {order.customer?.address}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}