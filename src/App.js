import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage"; // 🛒 Sepet sayfası
import OrderHistoryPage from "./pages/OrderHistoryPage"; // 📜 Sipariş geçmişi sayfası

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("🔑 Token bulundu, kullanıcı giriş yapmış.");
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    console.log("🔐 App.js > handleLogin çağrıldı");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("🚪 Kullanıcı çıkış yaptı.");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Navbar sadece giriş yapan kullanıcılar için */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />} // Sepet sayfası
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <OrderHistoryPage /> : <Navigate to="/login" />} // Sipariş geçmişi sayfası
        />
      </Routes>
    </Router>
  );
}

export default App;
