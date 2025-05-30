import { useEffect, useState } from "react";
import axios from "axios";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:5168/api/cartitem", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setCartItems(res.data);
        console.log("📦 Gelen Sepet Verisi:", JSON.stringify(res.data, null, 2));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sepet alınamadı:", err);
        setLoading(false);
      });
  }, [token]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) return;

    axios.put(`http://localhost:5168/api/cartitem/${itemId}`, {
      quantity: newQuantity,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((err) => console.error("Adet güncellenemedi:", err));
  };

  const handleDeleteItem = (itemId) => {
    axios.delete(`http://localhost:5168/api/cartitem/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      })
      .catch((err) => console.error("Ürün silinemedi:", err));
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    setIsOrdering(true);
    axios.post("http://localhost:5168/api/order", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setMessage("✅ Sipariş oluşturuldu! Sipariş ID: " + res.data.orderId);
        setCartItems([]); // Sepeti temizle
      })
      .catch((err) => {
        console.error("Sipariş oluşturulamadı:", err);
        setMessage("❌ Sipariş sırasında hata oluştu.");
      })
      .finally(() => setIsOrdering(false));
  };

  if (loading) return <p className="p-6">Yükleniyor...</p>;

  const totalPrice = cartItems.reduce((total, item) => {
    if (!item.product) return total;
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sepetim</h1>
      {message && <p className="mb-4 text-blue-600 font-semibold">{message}</p>}
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow bg-white">
              {item.product ? (
                <>
                  <h2 className="font-semibold text-lg">{item.product.name}</h2>
                  <p>₺{item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="bg-gray-200 px-2 rounded"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity} adet</span>
                    <button
                      className="bg-gray-200 px-2 rounded"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Sil
                    </button>
                  </div>
                  <p className="font-bold mt-2">
                    Toplam: ₺{(item.quantity * item.product.price).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-red-500">🚫 Ürün bilgisi alınamadı.</p>
              )}
            </div>
          ))}

          <div className="mt-4 font-bold text-xl">
            Genel Toplam: ₺{totalPrice.toFixed(2)}
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isOrdering}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            {isOrdering ? "Sipariş oluşturuluyor..." : "🛒 Siparişi Tamamla"}
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
