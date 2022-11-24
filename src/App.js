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
import socketIOClient from "socket.io-client";
import { useEffect, useRef } from "react";
import UpdatePS from "./pages/Auth/UpdatePS";
import AllGroup from "./pages/Group/AllGroup";
import Group from "./pages/Group/Group";
import LinkResetPS from "./pages/Auth/LinkResetPS";
import CreateGroup from "./pages/Group/CreateGroup";
import AllEvent from "./pages/Event/AllEvent";
import Report from "./pages/Report/Report";
import Event from "./pages/Event/Event";
import CreateEvent from "./pages/Event/CreateEvent";
import UploadPostGroup from "./pages/Group/UploadPostGroup";
import RegisterOldStudent from "./pages/Auth/RegisterOldStudent";
import Zego from "./pages/ZegoCloud/Zego.tsx";
import CheckUser from "./pages/CheckUser";
import Course from "./pages/Post/Course";
import AllCourse from "./pages/Post/AllCourse";
import CreateCourse from "./pages/Post/CreateCourse";
import YourCourse from "./pages/Post/YourCourse";
import JoinCall from "./pages/ZegoCloud/JoinCall";

function App() {
  /////////////////////////////////////////////////
  const host = "http://localhost:8000";

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    // // eslint-disable-next-line
  }, []);

  const location = useLocation();
  const setHeader = (path) => {
    if (
      path === "/" ||
      path === "/Register" ||
      path === "/ResetPS" ||
      path === "/Login" ||
      path === "/RegisterOldStudent" ||
      path.includes("LinkResetPS")
    ) {
      return "";
    } else return <Header />;
  };
  return (
    <div className="App">
      {setHeader(location.pathname)}
      <div
        style={{
          backgroundColor: "rgba(255, 0, 0, 0)",
          width: "100%",
          height: "10vh",
        }}
      ></div>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route
            path="/profile"
            element={<Profile socket={socketRef.current} />}
          />
          <Route path="/updateProfile" element={<Updateprofile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/CometChat" element={<CometChat />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/otherProfile" element={<OtherProfile />} />
          <Route path="/uploadPost" element={<UploadPost />} />
          <Route path="/allPost" element={<AllPost />} />
          <Route path="/uploadPost" element={<UploadPost />} />
          <Route path="/updatePassword" element={<UpdatePS />} />
          <Route path="/allGroup" element={<AllGroup />} />
          <Route path="/group" element={<Group />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/allEvent" element={<AllEvent />} />
          <Route path="/report" element={<Report />} />
          <Route path="/event" element={<Event />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/uploadPostGroup" element={<UploadPostGroup />} />
          <Route path="/zego" element={<Zego />} />
          <Route path="/allCourse" element={<AllCourse />} />
          <Route path="/yourCourse" element={<YourCourse />} />
          <Route path="/createCourse" element={<CreateCourse />} />
          <Route path="/course" element={<Course />} />
          <Route path="/joinCall" element={<JoinCall />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RegisterOldStudent" element={<RegisterOldStudent />} />
        <Route path="/CheckUser" element={<CheckUser />} />

        <Route path="/ResetPS" element={<ResetPS />} />
        <Route path="/LinkResetPS/:id/:random" element={<LinkResetPS />} />
      </Routes>
      <ToastContainer position="top-center" autoClose="1000" />
    </div>
  );
}

export default App;
