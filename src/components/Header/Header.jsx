import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/apiRequest";
import { Flex, Avatar, Heading, Text, Button, Box } from "@chakra-ui/react";
const Header = () => {
  const user = useSelector((state) => state.auth?.login.currentUser);
  const dispatch = useDispatch();
  const logOut = () => {
    logOutUser(dispatch);
  };
  return (
    <Flex w="100%" h="20vh" align="center" color="white">
      <Box w="90%" h="100%" />
      <Flex alignItems="center" align="space" w="14%" h="100%">
        <Flex direction="column" alignItems="center">
          <Avatar size="sm" src="avatar-1.jpg" mx="4" />
          <Heading as="h3" size="sm" color="white">
            {user?.fullname}
          </Heading>
          <Text>Admin</Text>
        </Flex>
        <Button
          onClick={() => logOut()}
          bg={"rgba(217, 217, 217, 0.1)"}
          _hover={{
            bg: "blue.500",
            color: "blue.500",
          }}
        >
          <Text color="white">Logout</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
