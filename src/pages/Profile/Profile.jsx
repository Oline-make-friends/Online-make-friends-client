import React from "react";
import "animate.css";
import { Banner } from "../../components/ProfilePage/Banner";
import { Contact } from "../../components/ProfilePage/Contact";
import { useSelector } from "react-redux";
import { Interest } from "../../components/ProfilePage/Interest";
import { Box } from "@chakra-ui/react";
import { ListPost } from "../../components/ProfilePage/ListPost";
import { CometChat } from "@cometchat-pro/chat";

export default function Profile() {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  CometChat.login(`${user._id}`, "6e29092985743855d31852a40ad9d8aa9a3dd6d9")
    .then(console.log("Login success"))
    .catch(console.log("Login fail"));
  return (
    <Box>
      <Banner user={user} />
      <Interest user={user} />
      <ListPost user={user} />
      <Contact />
    </Box>
  );
}
