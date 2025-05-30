import axios from "axios";

function ProductCard({ product }) {
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Lütfen giriş yapın.");
      return;
    }

    axios
      .post(
        "http://localhost:5168/api/cartitem",
        {
          productId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => alert("Ürün sepete eklendi ✅"))
      .catch((error) => {
        console.error("❌ Sepete eklenemedi. Sunucu cevabı:", error.response?.data);
        alert("Sepete eklenemedi ❌");
      });
  };

  return (
    <div className="border rounded-2xl shadow-md p-4 w-full max-w-xs bg-white">
      <img
        src={product.imageUrl || "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-blue-600 font-bold mt-2">₺{product.price}</p>
      <button
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleAddToCart}
      >
        Sepete Ekle
      </button>
    </div>
  );
}

export default ProductCard;
