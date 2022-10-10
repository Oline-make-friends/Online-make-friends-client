import React from "react";
import { Avatar, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AvatarUser = (props) => {
  const navigate = useNavigate();
  const user = props.user;
  // console.log(user);
  return (
    <Link
      onClick={() => {
        navigate("/otherProfile", {
          state: {
            user,
          },
        });
      }}
      cursor="crosshair"
    >
      <Avatar src={user?.avatar_url} h="50px" w="50px" />
    </Link>
  );
};

export default AvatarUser;
