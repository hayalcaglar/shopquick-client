# 🛍️ ShopQuick

---

## 🇬🇧 ShopQuick - Full-Stack E-commerce App (React + .NET)

**ShopQuick** is a full-featured e-commerce application built with a **React frontend** and a **.NET Core Web API backend**. It supports product listing, cart management, order placement, and user authentication.

### 🚀 Features

- 🔐 Token-based user login (JWT)
- 🛒 Product listing and "Add to Cart"
- ➖➕ Cart quantity update & remove
- 📦 Place orders & view order history
- 🧩 React + Tailwind CSS frontend
- ⚙️ ASP.NET Core + SQLite backend

### 📁 Project Structure

ShopQuick/
├── ShopQuick.API/ --> .NET Web API backend
└── shopquick-react/ --> React frontend


### ⚙️ Run Instructions

**Frontend:**
cd shopquick-react
npm install
npm run dev
**Backend:**
cd ShopQuick.API
dotnet restore
dotnet run

 Notes
.env and appsettings.json files are excluded via .gitignore.

Authenticated routes require a valid JWT token.

On order placement, the cart is cleared and recorded in order history.
