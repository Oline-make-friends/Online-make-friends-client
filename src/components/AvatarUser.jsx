import React, { useEffect, useState } from "react";
import { Avatar, Link, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/api";

const AvatarUser = (props) => {
  const navigate = useNavigate();
  const id = props.id;
  const [user, setUser] = useState(props.user);

  const handleGetUser = async () => {
    try {
      if (id !== undefined) {
        const res = await axios.post(`${baseURL}user/getUser/` + id);
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Link
      onClick={() => {
        navigate("/otherProfile", {
          state: {
            user,
          },
        });
      }}
      cursor="pointer"
    >
      <Flex alignItems="center" my="2">
        <Avatar m={[2, 2]} src={user?.avatar_url} h="50px" w="50px" />
        <Text>
          <b>{user?.fullname}</b>
        </Text>
      </Flex>
    </Link>
  );
};

export default AvatarUser;
