import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Text } from "@chakra-ui/react";
import SideDrawer from "../../components/ChatPage/SideDrawer";
import { useSelector } from "react-redux";
import MyChats from "../../components/ChatPage/MyChats";
import ChatBox from "../../components/ChatPage/ChatBox";

export default function Chat() {
  const user = useSelector((state) => state.auth?.login.currentUser);
  const [chats, setChats] = useState([]);
  // const handleGetChats = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/chat/getAll");
  //     toast.success("get chats success!");
  //     setChats(res.data);
  //   } catch (error) {
  //     toast.error("get chats user fail!");
  //   }
  // };

  useEffect(() => {
    // handleGetChats();
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ width: "100vw", minHeight: "100vh" }}>
      <SideDrawer />
      <Box display="flex" justifyContent="center" w="100%" h="91.5vh" p="10px">
        <MyChats />
        <ChatBox />
      </Box>
    </div>
  );
}
