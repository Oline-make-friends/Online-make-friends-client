import React from "react";
import "animate.css";
import { Banner } from "../../components/ProfilePage/Banner";
import { useSelector } from "react-redux";
import { Interest } from "../../components/ProfilePage/Interest";
import { Box } from "@chakra-ui/react";
import { ListPost } from "../../components/ProfilePage/ListPost";
import { CometChat } from "@cometchat-pro/chat";
import * as CONSTANT from "../../constants/constans";

export default function Profile() {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  var userchat = new CometChat.User(user._id);
  userchat.setAvatar(user.avatar_url);
  userchat.setName(user.fullname);
  CometChat.updateUser(userchat, CONSTANT.AUTH_KEY)
    .then(console.log("succes"))
    .catch(console.log("log in fail"));
  return (
    <Box>
      <Banner user={user} />
      <Interest user={user} />
      <ListPost user={user} />
      {/* <Contact /> */}
    </Box>
  );
}
