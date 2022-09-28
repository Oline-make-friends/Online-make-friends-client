import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/apiRequest";
import {
  Flex,
  Avatar,
  Text,
  Button,
  Box,
  keyframes,
  Input,
  Select,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
const Header = () => {
  const color = "teal";
  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;
  const user = useSelector((state) => state.auth?.login.currentUser);
  console.log(user);
  const dispatch = useDispatch();
  const logOut = () => {
    logOutUser(dispatch);
  };

  return (
    <Flex
      w="100vw"
      h="8vh"
      align="center"
      color="white"
      justifyContent="space-between"
      bg="blackAlpha.500"
      // opacity="0.5"
    >
      <Flex w="20%" h="100%" alignItems="center" mx="10%">
        <AiFillHome size={25} />
        <Input placeholder="Search.." mx="2" />
      </Flex>
      <Flex align="center">
        <Box>
          <Select placeholder="Pages" border="none">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Box>
          <Select placeholder="Account" border="none">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Text mx="2">{user?.fullname}</Text>
        <Box
          as="div"
          position="relative"
          w="45px"
          h="45px"
          _before={{
            content: "''",
            position: "relative",
            display: "block",
            width: "300%",
            height: "300%",
            boxSizing: "border-box",
            marginLeft: "-100%",
            marginTop: "-100%",
            borderRadius: "50%",
            bgColor: color,
            animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
          }}
          mx="4"
        >
          <Avatar
            src={user?.avatar_url}
            size="full"
            position="absolute"
            top={0}
          />
        </Box>
        <Button
          onClick={() => logOut()}
          bg={"rgba(217, 217, 217, 0.1)"}
          _hover={{
            bg: "blue.500",
            color: "blue.500",
          }}
        >
          <Text color="white" mx="2">
            Logout
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
