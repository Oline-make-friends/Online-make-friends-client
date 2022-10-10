import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/apiRequest";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  Flex,
  Avatar,
  Text,
  Button,
  keyframes,
  Link,
  Tooltip,
  Box,
  Drawer,
  useDisclosure,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
} from "@chakra-ui/react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import { loginByGmail } from "../../redux/apiRequest";
import "./header.css";
import AvatarUser from "../AvatarUser";
import axios from "axios";
import FriendRequest from "../FriendRequest/FriendRequest";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);

  const dispatch = useDispatch();
  console.log(user);
  const logOut = () => {
    logOutUser(dispatch);
  };
  const handleSearch = () => {
    if (!search) {
      toast.error("please input something");
      return;
    }
    try {
      loginByGmail(user.username, dispatch, null, null);
      const result = [];
      user.friends?.forEach((item) => {
        if (item?.fullname.toLowerCase().includes(search.toLowerCase()))
          result.push(item);
      });
      setSearchResult(result);
    } catch (error) {
      toast.error("can not find");
    }
  };

  const getFriendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:8000/user/getFrRq", {
        receiver_id: user?._id,
      });
      setFriendRequest(res.data);
      console.log(res.data);
      toast.success("get friend request success");
    } catch (error) {
      toast.error("get friend request fail");
      console.log(error);
    }
  };
  useEffect(() => {
    getFriendRequest();
    // eslint-disable-next-line
  }, []);

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
          {/* <Input placeholder="Search.." mx="2" /> */}
          <Tooltip label="Search user to chat" hasArrow placement="bottom-end">
            <Button variant="ghost" onClick={onOpen} ref={btnRef}>
              <AiOutlineSearch />
              <Text d={{ base: "none", md: "flex" }} px="4">
                Search friend
              </Text>
            </Button>
          </Tooltip>
        </Flex>

        <Flex align="center">
          <div>
            <Flex alignItems="center" justifyContent="center">
              <FriendRequest listRequest={friendRequest} />{" "}
              <RiArrowDropDownLine size={30} />
            </Flex>
          </div>
          <div class="dropdown">
            <Flex alignItems="center" justifyContent="center">
              Pages <RiArrowDropDownLine size={30} />
            </Flex>
            <div class="dropdown-content">
              <Link href="/CometChat">Chat page</Link>
              <br></br>
              <Link href="/allpost">All post</Link>
              <br></br>
              <Link href="/uploadPost">Upload post</Link>
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
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search user</DrawerHeader>

          <DrawerBody>
            <Flex pb={2}>
              <Input
                placeholder=" Search your friend "
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}> Go </Button>
            </Flex>
            {searchResult?.map((user) => {
              return (
                <Flex
                  my="2"
                  h="65px"
                  w="100%"
                  bg="#E8E8E8"
                  alignItems="center"
                  p="2"
                  cursor="pointer"
                  _hover={{
                    background: "#38B2AC",
                    color: "white",
                  }}
                  key={user?._id}
                >
                  {/* <AvatarUser user={user} /> */}
                  <AvatarUser user={user} />
                  <Flex flexDirection="column">
                    <Text mx="4" as="b">
                      {user?.fullname}
                    </Text>
                    <Text mx="4" fontSize="xs">
                      Email: {user?.username}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
