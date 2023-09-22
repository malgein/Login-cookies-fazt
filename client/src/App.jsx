import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectecRoutes from "./ProtectecRoutes";
import { TaskProvider } from "./context/TaskContext";

function App() {
  
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectecRoutes />}>
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage/>} />
            </Route>
          </Routes>
            </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
