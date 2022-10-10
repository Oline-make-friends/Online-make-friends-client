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
import Chat from "./pages/ChatPage/Chat";
import CometChat from "./pages/CometChat/CometChat";
import Post from "./pages/Post/Post";
import OtherProfile from "./pages/Profile/OtherProfile";
import AllPost from "./pages/Post/AllPost";
import UploadPost from "./pages/Post/UploadPost";

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
          <Route path="/chat" element={<Chat />} />
          <Route path="/CometChat" element={<CometChat />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/otherProfile" element={<OtherProfile />} />
          <Route path="/uploadPost" element={<UploadPost />} />
          <Route path="/allPost" element={<AllPost />} />
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
