import React from "react";
import { Avatar } from "@chakra-ui/react";

const AvatarUser = (props) => {
  const user = props.user;
  return <Avatar src={user?.avatar_url} h="50px" w="50px" mx="2" />;
};

export default AvatarUser;
