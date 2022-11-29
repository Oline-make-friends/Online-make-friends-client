import React from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Image,
  Link,
  Input,
  Button,
} from "@chakra-ui/react";
import AvatarUser from "../../components/AvatarUser";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaBook } from "react-icons/fa";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import ReactHashtag from "react-hashtag";
import { FcQuestions } from "react-icons/fc";
import { MdSource } from "react-icons/md";
import * as CONSTANT from "../../constants/constans";
// import { GiSkills } from "react-icons/gi";

const AllPost = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const host = `${CONSTANT.SERVER}`;
  const socketRef = useRef();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState("");
  const [find, setFind] = useState("");
  const [mayKnows, setMayKnows] = useState([]);
  const handleGetAllPost = async (type) => {
    try {
      if (type === undefined) {
        const res = await axios.get(`${CONSTANT.SERVER}/post/getAll`);
        setPosts(res.data);
        console.log(res.data);
        return;
      }
      if (type) {
        const res = await axios.post(`${CONSTANT.SERVER}/post/getAllbyType`, {
          type,
        });
        setPosts(res.data);
        setSelected(type);
      }
      // if (course) {
      //   const res = await axios.post(
      //     "http://localhost:8000/post/getAllbyCourse",
      //     {
      //       course,
      //     }
      //   );
      //   setPosts(res.data);
      //   setSelected(course);
      // }
    } catch (error) {
      toast.error("get post fail!");
    }
  };

  const handleGetAllPostFollowing = async () => {
    try {
      const temp = [];
      for (var i = 0; i < user?.follows.length; i++) {
        const res = await axios.post(
          `${CONSTANT.SERVER}/post/get/${user?.follows[i]?._id}`
        );
        temp.push(res.data);
      }
      const result = temp.flat(1);
      setPosts(result.reverse());
    } catch (error) {
      toast.error("get post fail!");
    }
  };

  const handleFindPost = async () => {
    try {
      if (find === "") {
        handleGetAllPost();
        return;
      }
      const res = await axios.post(`${CONSTANT.SERVER}/post/searchTag`, {
        hashtag: find,
      });
      setPosts(res.data);
    } catch (error) {
      toast.error("get post fail!");
    }
  };
  const handleLikePost = async (postId) => {
    try {
      await axios.post(`${CONSTANT.SERVER}/post/like/`, {
        _id: postId,
        userId: user?._id,
      });
      handleGetAllPost();
    } catch (error) {
      toast.error("get post user fail!");
    }
  };

  const handleSendNoti = async (userPostId) => {
    try {
      await axios.post(`${CONSTANT.SERVER}/noti/add`, {
        title: user?.fullname,
        content: "like your post",
        user_id: userPostId,
      });
      socketRef.current.emit("sendNotification");
    } catch (error) {
      toast.error("Send noti fail!");
    }
  };
  const mayKnowUser = async () => {
    try {
      const res = await axios.get(`${CONSTANT.SERVER}/user/getAllUser`);
      const result = [];
      for (var i = 0; i <= 5; i++) {
        var random = Math.floor(Math.random() * res.data.length);
        result.push(res.data[random]);
      }
      setMayKnows(result);
    } catch (error) {
      toast.error("can not find");
    }
  };

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    handleGetAllPost();
    mayKnowUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Box
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "99vw",
        height: "90vh",
      }}
    >
      <Flex justifyContent="space-between" w="100%">
        <Box h="100%" w="25%" borderColor="#ccc" bg="rgba(0,0,0,0.2)">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            color="white"
            flexDirection="column"
          >
            <Flex
              borderBottom="1px"
              borderColor="white"
              w="100%"
              h="30%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              p="4"
            >
              <Text fontSize="3xl" color="white">
                Type of post
              </Text>
              <Button
                display="flex"
                my="2"
                alignItems="center"
                justifyContent="center"
                w="100%"
                bg="none"
                onClick={() => {
                  handleGetAllPost("Question", undefined);
                }}
                border={selected === "Questions" ? "1px" : ""}
                borderColor={selected === "Questions" ? "blue.500" : ""}
              >
                <FcQuestions size={30} />
                <Text mx="1">Questions</Text>
              </Button>
              <Button
                display="flex"
                my="2"
                alignItems="center"
                justifyContent="center"
                w="100%"
                bg="none"
                onClick={() => {
                  handleGetAllPost("Knowledge", undefined);
                }}
                border={selected === "Knowledge" ? "1px" : ""}
                borderColor={selected === "Knowledge" ? "blue.500" : ""}
              >
                <FaBook size={25} style={{ color: "#90CAF9" }} />
                <Text mx="1">Knowledge</Text>
              </Button>
              <Button
                display="flex"
                my="2"
                alignItems="center"
                justifyContent="center"
                w="100%"
                bg="none"
                onClick={() => {
                  handleGetAllPost("Source", undefined);
                }}
                border={selected === "Source" ? "1px" : ""}
                borderColor={selected === "Source" ? "blue.500" : ""}
              >
                <MdSource size={30} style={{ color: "#90CAF9" }} />
                <Text mx="1">Source</Text>
              </Button>
              <Button
                display="flex"
                my="2"
                alignItems="center"
                justifyContent="center"
                w="100%"
                bg="none"
                onClick={() => {
                  handleGetAllPostFollowing();
                }}
                border={selected === "Following" ? "1px" : ""}
                borderColor={selected === "Following" ? "blue.500" : ""}
              >
                <MdSource size={30} style={{ color: "#90CAF9" }} />
                <Text mx="1">Following</Text>
              </Button>
            </Flex>

            {/* <Flex
              alignItems="center"
              justifyContent="space-between"
              color="white"
              flexDirection="column"
              w="100%"
            >
              <Text fontSize="3xl">Course</Text>
              <Button
                display="flex"
                my="2"
                alignItems="center"
                justifyContent="center"
                w="100%"
                bg="none"
                onClick={() => {
                  handleGetAllPost(undefined, "Coding");
                }}
                border={selected === "Coding" ? "1px" : ""}
                borderColor={selected === "Coding" ? "blue.500" : ""}
              >
                <AiOutlineCode size={30} style={{ color: "#90CAF9" }} />
                <Text mx="1">Coding</Text>
              </Button>
              <Button
                display="flex"
                my="2"
                alignItems="center"
                justifyContent="center"
                w="100%"
                bg="none"
                onClick={() => {
                  handleGetAllPost(undefined, "Soft skills");
                }}
                border={selected === "Soft skills" ? "1px" : ""}
                borderColor={selected === "Soft skills" ? "blue.500" : ""}
              >
                <GiSkills size={30} style={{ color: "#90CAF9" }} />
                <Text mx="1">Soft skills</Text>
              </Button>
            </Flex> */}
          </Flex>
        </Box>
        <Box
          px="2"
          style={{
            width: "50%",
            marginTop: "20px",
            height: "88vh",
            overflowY: "scroll",
          }}
        >
          <Box width="100%">
            <Input
              placeholder="Find post by hashtag"
              value={find}
              onChange={(e) => {
                setFind(e.target.value);
              }}
              bg="white"
            />
            <Button
              onClick={() => {
                handleFindPost();
              }}
            >
              Find
            </Button>
          </Box>

          {/*  */}
          {posts?.map((post) => {
            return (
              <Flex
                direction="column"
                align="start"
                border="1px"
                borderColor="black"
                borderRadius="10px"
                my="4"
                bg="white"
                key={post?._id}
              >
                <Box my="2">
                  <AvatarUser m={[2, 2]} user={post?.created_by} />
                  <Flex ml="2" color="gray">
                    <Center
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Text>{post?.createdAt?.substring(0, 10)}</Text>
                    </Center>
                  </Flex>
                </Box>
                <Box mx="2" display="flex" flexDirection="column">
                  <Text as="u">Type : {post?.type}</Text>
                  <Text as="u">#{post?.hashtag}</Text>
                  <Text my="2">
                    <ReactHashtag
                      onHashtagClick={(val) => {
                        setFind(val);
                        handleFindPost();
                      }}
                    >
                      {`${post?.content}`}
                    </ReactHashtag>
                  </Text>
                </Box>
                <Box w="100%">
                  {post?.imageUrl === undefined ? (
                    <></>
                  ) : (
                    <Image
                      border="1px"
                      borderColor="black"
                      src={`${post?.imageUrl}`}
                      alt="image"
                      w="100%"
                    />
                  )}
                </Box>
                <Flex justifyContent="space-between" w="100%" m="2">
                  <Flex>
                    <Flex>
                      {post?.likes?.includes(user._id) ? (
                        <AiFillHeart
                          style={{ color: "red" }}
                          size={25}
                          onClick={() => {
                            handleLikePost(post?._id);
                          }}
                          cursor="pointer"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={25}
                          onClick={() => {
                            handleLikePost(post?._id);
                            handleSendNoti(post?.created_by?._id);
                          }}
                          cursor="pointer"
                        />
                      )}

                      <Text mx="2">{post?.likes?.length}</Text>
                    </Flex>
                    <Flex>
                      <FaRegComment size={25} />
                      <Text mx="2">{post?.comments?.length}</Text>
                    </Flex>
                  </Flex>

                  <Link
                    mx="4"
                    onClick={() => {
                      navigate("/Post", {
                        state: {
                          post,
                        },
                      });
                    }}
                  >
                    <BsThreeDots size={25} />
                  </Link>
                </Flex>
              </Flex>
            );
          })}

          {/*  */}
        </Box>
        <Box h="100%" w="25%" borderColor="#ccc" bg="rgba(0,0,0,0.2)">
          <Flex
            alignItems="start"
            justifyContent="space-between"
            color="white"
            flexDirection="column"
          >
            <Text fontSize="3xl" color="white">
              You might know
            </Text>
            {mayKnows?.map((user) => {
              return <AvatarUser user={user} />;
            })}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AllPost;
