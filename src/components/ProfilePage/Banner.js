import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../../assets/img/header-img.svg";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import {
  Box,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import AvatarUser from "../AvatarUser";
import { loginByGmail } from "../../redux/apiRequest";
import Follows from "./Follows";
import socketIOClient from "socket.io-client";

export const Banner = ({ user }) => {
  const currentUser = useSelector((state) => state.auth?.login?.currentUser);
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Ho Chi Minh city", "K14", "FPT Student"];
  const period = 2000;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const host = "http://localhost:8000";
  const socketRef = useRef();

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    socketRef.current = socketIOClient.connect(host);

    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line
  }, [text]);
  const socket = () => {
    socketRef.current.emit("sendacceptFriendRequest");
  };

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      // setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      // setIndex(1);
      setDelta(500);
    } else {
      // setIndex((prevIndex) => prevIndex + 1);
    }
  };
  const sendFriendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:8000/user/requestFriend", {
        sender_id: currentUser._id,
        receiver_id: user._id,
      });
      if (res.data === "You already request this friend!")
        toast.error("You already request this friend!");
      else {
        toast.success("Send friend request success");
        socketRef.current.emit("sendFriendRequest");
      }
    } catch (error) {
      toast.error("send friend request fail");
      console.log(error);
    }
  };

  const unFriend = async (id) => {
    try {
      await axios.post("http://localhost:8000/user/deleteFriend", {
        sender_id: currentUser._id,
        receiver_id: id,
      });
      loginByGmail(user?.username, dispatch, null, null);
      toast.success("Unfriend success");
      socket();
    } catch (error) {
      toast.error("Unfriend fail");
      console.log(error);
    }
  };

  const Follow = async (id) => {
    try {
      const res = await axios.post("http://localhost:8000/user/followUser", {
        currentUser_id: currentUser._id,
        follower_id: id,
      });
      if (res.data === "You already follow this user!")
        toast.error("You already follow this user!");
      else {
        toast.success("Follow success");
      }
      loginByGmail(currentUser?.username, dispatch, null, null);
    } catch (error) {
      toast.error("Unfollow fail");
      console.log(error);
    }
  };

  return (
    <section className="banner" id="home" style={{ color: "white" }}>
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">Welcome to my Profile</span>
                  <h1>
                    {`I'm ${user?.fullname}`}{" "}
                    <span
                      className="txt-rotate"
                      dataPeriod="1000"
                      data-rotate='[ "FPT Student", "Web porfolio", "Profile" ]'
                    >
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <Text as="bold">Gender: {user?.gender}</Text>
                  <Text onClick={onOpen} cursor="pointer">
                    {user?.friends.length + " "}
                    Friends{" "}
                  </Text>
                  <Follows user={user} />
                  <p>{user?.about}</p>
                  {currentUser?._id === user?._id ? (
                    <></>
                  ) : (
                    <>
                      <button onClick={() => sendFriendRequest()}>
                        Add friend <ArrowRightCircle size={25} />
                      </button>
                      <button onClick={() => Follow(user?._id)}>
                        Follow <ArrowRightCircle size={25} />
                      </button>
                    </>
                  )}

                  <br></br>
                  <Box boxSize="sm">
                    <Image src={user?.avatar_url} alt="User avatar" h="400px" />
                  </Box>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Friends</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box height="400px" overflowY="scroll" p="4">
                {user?.friends.map((friend) => {
                  return (
                    <Flex
                      alignItems="center"
                      my="2"
                      justifyContent="space-between"
                    >
                      <Flex alignItems="center">
                        <AvatarUser m={[2, 2]} user={friend} />
                      </Flex>
                      {currentUser?._id !== user?._id ? (
                        <></>
                      ) : (
                        <Button
                          onClick={() => {
                            unFriend(friend?._id);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Flex>
                  );
                })}
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </section>
  );
};
