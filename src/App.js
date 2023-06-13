import DashBoardPage from "./pages/DashBoard";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/dashboard" element={<DashBoardPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
