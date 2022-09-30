import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Auth/Register";
import RequireAuth from "./components/Auth/RequireAuth";
import Profile from "./pages/Profile/Profile";
import ResetPS from "./pages/Auth/ResetPS";
import Header from "./components/Header/Header";
import "react-toastify/dist/ReactToastify.css";
import Updateprofile from "./pages/Profile/Updateprofile";

function App() {
  const location = useLocation();
  const setHeader = (path) => {
    if (
      path === "/" ||
      path === "/Register" ||
      path === "/ResetPS" ||
      path === "/Login"
    ) {
      return "";
    } else return <Header />;
  };
  return (
    <div className="App">
      {/* {location.pathname === "/" || "/Register" ? "" : <Header />} */}
      {setHeader(location.pathname)}
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateProfile" element={<Updateprofile />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ResetPS" element={<ResetPS />} />
      </Routes>
      <ToastContainer position="top-center" autoClose="1000" />
    </div>
  );
}

export default App;
