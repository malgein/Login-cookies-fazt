import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="container content-container mx-auto px-10 md:px-0">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<h1>Tareas</h1>} />
          <Route path="/add-task" element={<h1>Agregar tareas</h1>} />
          <Route path="/tasks/:id" element={<h1>Tarea por id</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Routes>
          </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
