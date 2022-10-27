import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/apiRequest";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./header.css";
import {
  Flex,
  Avatar,
  Text,
  Button,
  keyframes,
  Link,
  Box,
  Input,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { loginByGmail } from "../../redux/apiRequest";
import "./header.css";
import AvatarUser from "../AvatarUser";
import axios from "axios";
import FriendRequest from "./FriendRequest";
import socketIOClient from "socket.io-client";
import Notification from "./Notification";

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
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const dispatch = useDispatch();
  const logOut = () => {
    logOutUser(dispatch);
  };
  const handleSearch = async () => {
    if (!search) {
      toast.error("please input something");
      setSearchResult([]);
      return;
    }
    try {
      const res = await axios.get("http://localhost:8000/user/getAllUser");
      loginByGmail(user?.username, dispatch, null, null);
      const result = [];
      res.data.forEach((item) => {
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
    } catch (error) {
      toast.error("get friend request fail");
      console.log(error);
    }
  };
  const getNotification = async () => {
    try {
      const res = await axios.get("http://localhost:8000/noti/getAll");
      console.log("res" + res.data[0].user_id);
      ///
      let temp = [];

      for (let i = 0; i < res.data.length; i++) {
        if (
          res.data[i]?.user_id?._id === user._id ||
          res.data[i]?.user_id?.is_admin === true
        ) {
          temp.push(res.data[i]);
        }
      }
      //////
      setNotifications(temp);
    } catch (error) {
      toast.error("get notification fail");
      console.log(error);
    }
  };

  const socket = () => {
    socketRef.current.emit("sendacceptFriendRequest");
    socketRef.current.emit("sendNotification");
  };
  const host = "http://localhost:8000";
  const socketRef = useRef();

  useEffect(() => {
    getFriendRequest();
    getNotification();
    socketRef.current = socketIOClient.connect(host);
    console.log(socketRef.current);
    socketRef.current.on("getFriendRequest", (msg) => {
      console.log(msg);
      getFriendRequest();
    });
    socketRef.current.on("acceptFriendRequest", (msg) => {
      console.log(msg);
      loginByGmail(user?.username, dispatch, null, null);
    });
    socketRef.current.on("getNotification", () => {
      getNotification();
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Flex
      w="100vw"
      h="10vh"
      bg="#222020"
      justifyContent="center"
      position="fixed"
      top="0"
      zIndex="1"
    >
      <Flex
        w="80%"
        h="100%"
        align="center"
        color="white"
        justifyContent="space-between"
        p="4"
        // opacity="0.5"
      >
        <Flex h="100%" alignItems="center">
          <Link
            href="/profile"
            onClick={() => {
              loginByGmail(user?.username, dispatch, null, null);
            }}
            height="100%"
          >
            {/* <AiFillHome
              size={35}
              style={{
                backgroundColor: "#3182ce",
                padding: "5px",
                borderRadius: "5px",
                color: "white",
              }}
            /> */}
            <Box className="logo"></Box>
          </Link>
          {/* <Input placeholder="Search.." mx="2" /> */}
          {/* <Tooltip label="Search user to chat" hasArrow placement="bottom-end">
            <Button variant="ghost" onClick={onOpen} ref={btnRef}>
              <AiOutlineSearch />
              <Text d={{ base: "none", md: "flex" }} px="4">
                Find users
              </Text>
            </Button>
          </Tooltip> */}
          {/* ///////////////////////////////////// */}
          <Flex direction="column" position="absolute" top="30%" left="22vw">
            <Flex pb={2}>
              <Input
                placeholder=" Find your friend "
                mr={2}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button onClick={() => handleSearch()} bg="blue.500">
                {" "}
                Go{" "}
              </Button>
            </Flex>
            <Box maxHeight="20vh" overflowY="scroll">
              {searchResult?.map((user) => {
                return (
                  <Flex
                    my="2"
                    w="100%"
                    bg="black"
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

                    <Flex flexDirection="column">
                      <AvatarUser user={user} />
                      <Text mx="4" fontSize="xs">
                        Email: {user?.username}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Box>
          </Flex>
          {/* //////////////////////////////////////////// */}
        </Flex>

        <Flex align="center">
          <div>
            <Flex alignItems="center" justifyContent="center">
              <FriendRequest
                listRequest={friendRequest}
                getFriendRequest={getFriendRequest}
                user={user}
                socket={socket}
              />{" "}
              <RiArrowDropDownLine size={30} />
            </Flex>
          </div>
          <div>
            <Flex alignItems="center" justifyContent="center">
              <Notification
                listNotification={notifications}
                user={user}
                toast={toast}
                socket={socket}
                getNotification={getNotification}
              />{" "}
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
              <br></br>
              <Link href="/allGroup">Group</Link>
              <br></br>
              <Link href="/allEvent">Event</Link>
              <br></br>
              <Link href="/report">Report</Link>
            </div>
          </div>
          <div class="dropdown">
            <Flex alignItems="center" justifyContent="center">
              Account <RiArrowDropDownLine size={30} />
            </Flex>
            <div class="dropdown-content">
              <Link href="/updateProfile">Profile</Link>
              <br></br>
              <Link href="/updatePassword">Update Password</Link>
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
