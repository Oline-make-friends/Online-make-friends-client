import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/apiRequest";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  Flex,
  Avatar,
  Text,
  Button,
  Box,
  keyframes,
  Input,
  Link,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import "./header.css";
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

  const dispatch = useDispatch();
  console.log(user);
  const logOut = () => {
    logOutUser(dispatch);
  };

  return (
    <Flex w="100vw" h="8vh" bg="black" justifyContent="center">
      <Flex
        w="80%"
        h="100%"
        align="center"
        color="white"
        justifyContent="space-between"
        p="4"
        // opacity="0.5"
      >
        <Flex w="20%" h="100%" alignItems="center" mx="10%">
          <Link href="/profile">
            <AiFillHome
              size={35}
              style={{
                backgroundColor: "#3182ce",
                padding: "5px",
                borderRadius: "5px",
                color: "white",
              }}
            />
          </Link>
          <Input placeholder="Search.." mx="2" />
        </Flex>

        <Flex align="center">
          <div class="dropdown">
            <Flex alignItems="center" justifyContent="center">
              Pages <RiArrowDropDownLine size={30} />
            </Flex>
            <div class="dropdown-content">
              <Link href="/CometChat">Chat page</Link>
              <br></br>
              <Link href="/allpost">All post</Link>
            </div>
          </div>
          <div class="dropdown">
            <Flex alignItems="center" justifyContent="center">
              Account <RiArrowDropDownLine size={30} />
            </Flex>
            <div class="dropdown-content">
              <Link href="/updateProfile">Profile</Link>
              <br></br>
              <Link href="/updatePassword">UpdatePassword</Link>
            </div>
          </div>
          <Text mx="4">{user?.fullname}</Text>
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
            bg="gray"
            _hover={{
              bg: "blue.500",
              color: "white",
            }}
          >
            <Text color="black">Logout</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
