import { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  Truck,
  PackageCheck,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import API from "../api/axios";

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/my-orders");
      setOrders(data);
    } catch (error) {
      alert("Tracking loading failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusDesign = (status) => {
    if (status === "Pending") {
      return {
        icon: <Clock size={38} />,
        title: "Pending",
        text: "Your order has been received and is waiting for admin approval.",
        box: "bg-orange-50 border-orange-200 text-orange-600",
      };
    }

    if (status === "Accepted") {
      return {
        icon: <CheckCircle size={38} />,
        title: "Accepted",
        text: "Your order has been accepted by admin and is being prepared.",
        box: "bg-purple-50 border-purple-200 text-purple-600",
      };
    }

    if (status === "Shipped") {
      return {
        icon: <Truck size={38} />,
        title: "Shipped",
        text: "Your order has been shipped and is on the way.",
        box: "bg-blue-50 border-blue-200 text-blue-600",
      };
    }

    if (status === "Delivered") {
      return {
        icon: <PackageCheck size={38} />,
        title: "Delivered",
        text: "Your order has been delivered successfully.",
        box: "bg-green-50 border-green-200 text-green-600",
      };
    }

    return {
      icon: <XCircle size={38} />,
      title: "Cancelled",
      text: "Your order has been cancelled by admin.",
      box: "bg-red-50 border-red-200 text-red-600",
    };
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-black">Order Tracking</h1>
            <p className="text-slate-500 mt-2">
              Current order status updated by admin.
            </p>
          </div>

          <button onClick={fetchOrders} className="btn-outline flex items-center gap-2">
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>

        <div className="space-y-6 mt-8">
          {orders.length === 0 ? (
            <div className="card p-12 text-center">
              <Truck className="mx-auto text-orange-500" size={60} />
              <h2 className="text-2xl font-black mt-4">No tracking available</h2>
            </div>
          ) : (
            orders.map((order) => {
              const current = statusDesign(order.status);

              return (
                <div key={order._id} className="card p-6">
                  <div className="flex justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-xl font-black">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>
                      <p className="text-slate-500 mt-1">
                        Total: Rs {order.total}
                      </p>
                    </div>

                    <span className={`px-5 py-2 rounded-full font-black h-fit ${current.box}`}>
                      {current.title}
                    </span>
                  </div>

                  <div className={`mt-8 border rounded-3xl p-8 ${current.box}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-sm">
                        {current.icon}
                      </div>

                      <div>
                        <h3 className="text-3xl font-black">
                          {current.title}
                        </h3>
                        <p className="mt-2 text-slate-700 font-medium">
                          {current.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-white border border-slate-200 rounded-3xl p-5">
                    <h3 className="font-black mb-4">Order Items</h3>

                    <div className="grid md:grid-cols-2 gap-4">
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
                            <h4 className="font-bold">{item.name}</h4>
                            <p className="text-sm text-slate-500">
                              Qty: {item.quantity}
                            </p>
                          </div>

                          <b>Rs {item.price * item.quantity}</b>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}