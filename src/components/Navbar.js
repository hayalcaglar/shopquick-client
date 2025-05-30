import { useNavigate, Link } from "react-router-dom";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ShopQuick
      </h1>
      <div className="flex items-center gap-4">
        <Link
          to="/cart"
          className="text-blue-600 font-medium hover:underline"
        >
          🛒 Sepetim
        </Link>
        <Link
          to="/orders"
          className="text-blue-600 font-medium hover:underline"
        >
          📦 Siparişlerim
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
