import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:5168/api/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setOrders(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Sipariş geçmişi alınamadı:", err);
      setLoading(false);
    });
  }, [token]);

  if (loading) return <p className="p-6">Yükleniyor...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Sipariş Geçmişim</h1>
      {orders.length === 0 ? (
        <p>Hiç sipariş bulunamadı.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded bg-white shadow">
              <p><strong>Sipariş ID:</strong> {order.id}</p>
              <p><strong>Tarih:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              <p><strong>Tutar:</strong> ₺{order.totalAmount.toFixed(2)}</p>
              <p><strong>Durum:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;
