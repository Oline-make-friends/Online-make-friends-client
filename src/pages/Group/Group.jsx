import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Button, Flex, Image, Text, Center, Link } from "@chakra-ui/react";
import ModalList from "../../components/Group/Modal";
import { useNavigate } from "react-router";
import AvatarUser from "../../components/AvatarUser";
import { useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import socketIOClient from "socket.io-client";

const Group = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [group, setGroup] = useState(state.group);
  const host = "http://localhost:8000";
  const socketRef = useRef();

  const id = state.group._id;
  const user = useSelector((state) => state.auth?.login?.currentUser);

  const handleGetGroup = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/group/get/${id}`);

      setGroup(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get post user fail!");
    }
  };
  const handleLikePost = async (postId) => {
    try {
      await axios.post(`http://localhost:8000/post/like/`, {
        _id: postId,
        userId: user?._id,
      });
      handleGetGroup();
    } catch (error) {
      toast.error("get post user fail!");
    }
  };
  const handleSendNoti = async (userPostId) => {
    try {
      await axios.post("http://localhost:8000/noti/add", {
        title: user?.fullname,
        content: "like your post",
        user_id: userPostId,
      });
      socketRef.current.emit("sendNotification");
    } catch (error) {
      toast.error("Send noti fail!");
    }
  };
  console.log(group);

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    // handleGetGroup();

    // eslint-disable-next-line
  }, []);

  return (
    <Box
      style={{
        minHeight: "900px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "99vw",
      }}
    >
      <Box
        style={{
          width: "50%",
          marginTop: "20px",
        }}
      >
        <Image
          objectFit="fill"
          src={group?.avatar_url}
          alt="Dan Abramov"
          w="100%"
          h="500px"
        />
        <Flex
          w="100%"
          borderBottom="1px"
          borderColor="gray"
          alignItems="start"
          direction="column"
          bg="white"
        >
          <Text as="b" fontSize="2xl" color="black">
            Name group:{group?.name}
          </Text>
          <Text color="gray.500">Description : {" " + group?.content}</Text>
          <ModalList
            users={group?.members}
            listContent={"Group memeber : " + group?.members?.length}
          />
          <ModalList
            users={group?.admins}
            listContent={"Admin: " + group?.admins?.length}
          />
          <Button
            bg="none"
            onClick={() => {
              navigate("/uploadPostGroup", {
                state: {
                  group: group,
                },
              });
            }}
          >
            Upload post
          </Button>
        </Flex>

        {group?.posts?.map((post) => {
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
                <AvatarUser m={[2, 2]} id={post?.created_by._id} />

                <Flex ml="2" color="gray">
                  <Center style={{ display: "flex", flexDirection: "column" }}>
                    <Text>{post?.createdAt?.substring(0, 10)}</Text>
                  </Center>
                </Flex>
              </Box>
              <Box mx="2">
                <Text>{`${post?.content}`}</Text>
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
                    height="650px"
                  />
                )}
              </Box>
              <Flex justifyContent="space-between" w="100%" m="2">
                <Flex>
                  <Flex>
                    {post?.likes.includes(user._id) ? (
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

                    <Text mx="2">{post?.likes.length}</Text>
                  </Flex>
                  <Flex>
                    <FaRegComment size={25} />
                    <Text mx="2">{post?.comments.length}</Text>
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
      </Box>
    </Box>
  );
};

export default Group;
