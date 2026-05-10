import { useEffect, useState } from "react";
import { Package, Calendar, Wallet, Truck, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import API from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/my-orders");
      setOrders(data);
    } catch (error) {
      alert("Orders loading failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("LuxeCart Invoice", 14, 20);

    doc.setFontSize(11);
    doc.text(`Invoice ID: ${order._id}`, 14, 32);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 39);
    doc.text(`Status: ${order.status}`, 14, 46);
    doc.text(`Payment: ${order.paymentMethod}`, 14, 53);
    doc.text(`Payment Status: ${order.paymentStatus}`, 14, 60);

    doc.text("Customer Details", 14, 72);
    doc.text(`Name: ${order.customer?.name}`, 14, 80);
    doc.text(`Phone: ${order.customer?.phone}`, 14, 87);
    doc.text(`City: ${order.customer?.city}`, 14, 94);
    doc.text(`Address: ${order.customer?.address}`, 14, 101);

    autoTable(doc, {
      startY: 112,
      head: [["Product", "Qty", "Price", "Total"]],
      body: order.items.map((item) => [
        item.name,
        item.quantity,
        `Rs ${item.price}`,
        `Rs ${item.price * item.quantity}`,
      ]),
    });

    doc.setFontSize(14);
    doc.text(
      `Total Amount: Rs ${order.total}`,
      14,
      doc.lastAutoTable.finalY + 15
    );

    doc.save(`LuxeCart-Invoice-${order._id.slice(-6)}.pdf`);
  };

  if (loading) {
    return <h1 className="p-10 text-2xl font-black">Loading orders...</h1>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <h1 className="text-4xl font-black">My Orders</h1>
        <p className="text-slate-500 mt-2">
          Download invoice PDF for every order.
        </p>

        <div className="space-y-6 mt-8">
          {orders.length === 0 ? (
            <div className="card p-12 text-center">
              <Package className="mx-auto text-orange-500" size={60} />
              <h2 className="text-2xl font-black mt-4">No orders found</h2>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>

                      <span className="flex items-center gap-1">
                        <Wallet size={16} />
                        {order.paymentMethod}
                      </span>

                      <span className="flex items-center gap-1">
                        <Truck size={16} />
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => downloadInvoice(order)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FileDown size={18} />
                    Invoice PDF
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-slate-50 rounded-2xl p-3"
                    >
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover rounded-xl"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-slate-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <b>Rs {item.price * item.quantity}</b>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between border-t mt-5 pt-5 text-lg">
                  <span className="font-black">Total</span>
                  <b>Rs {order.total}</b>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}