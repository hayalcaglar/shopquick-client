// import { useState } from "react";
// import axios from "axios";

// function LoginPage({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5168/api/auth/login", {
//         username,
//         password,
//       });
//       const token = response.data.token;
//       localStorage.setItem("token", token);
//       onLogin(); // Başarılı giriş sonrası yönlendirme
//     } catch (error) {
//       alert("Giriş başarısız. Bilgileri kontrol edin.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6">Giriş Yap</h2>
//         <input
//           type="text"
//           placeholder="Kullanıcı Adı"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 border mb-4 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Şifre"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border mb-4 rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Giriş Yap
//         </button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5168/api/auth/login", {
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    console.log("✅ Giriş başarılı, yönlendirme başlıyor");

    onLogin(); // Başarılı giriş sonrası yönlendirme
    navigate("/"); // 👈 Ana sayfaya yönlendir
  } catch (error) {
    alert("Giriş başarısız. Bilgileri kontrol edin.");
    console.error(error);
  }
};


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Giriş Yap</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
