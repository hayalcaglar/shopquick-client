import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);

  const API_URL = "http://localhost:5168/api/products";

  useEffect(() => {
    // API'den ürünleri çek
axios.get(API_URL)
      .then((response) => {
        console.log("Gelen ürünler:", response.data);
        setProducts(response.data); // ürünleri state'e at
      })
      .catch((error) => {
        console.error("Ürünler çekilirken hata oluştu:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products
  .filter((p) => p.name !== "string" && p.price > 0)
  .map((product) => (
    <ProductCard key={product.id} product={product} />
))}

      </div>
    </div>
  );
}

export default HomePage;
