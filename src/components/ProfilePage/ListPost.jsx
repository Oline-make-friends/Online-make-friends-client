import React, { useEffect, useState, useRef } from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Flex, Image, Text, Avatar, Center, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./style.css";

import { toast } from "react-toastify";
import axios from "axios";

// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination]);

export const ListPost = ({ user }) => {
  const host = "http://localhost:8000";
  const socketRef = useRef();
  const currentUser = useSelector((state) => state.auth?.login?.currentUser);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const handleGetAllPost = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/post/get/` + user._id
      );
      setPosts(res.data);
    } catch (error) {
      toast.error("get post user fail!");
    }
  };
  const handleSendNoti = async (userPostId) => {
    try {
      await axios.post("http://localhost:8000/noti/add", {
        title: currentUser.fullname,
        content: "like your post",
        user_id: userPostId,
      });
      socketRef.current.emit("sendNotification");
    } catch (error) {
      toast.error("Send noti fail!");
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await axios.post(`http://localhost:8000/post/like/`, {
        _id: postId,
        userId: currentUser?._id,
      });
      handleGetAllPost();
    } catch (error) {
      toast.error("get post user fail!");
    }
  };

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    handleGetAllPost();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Center>
        <Text fontSize="4xl" color="white">
          All my post
        </Text>
      </Center>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        virtual
        style={{ height: "600px" }}
      >
        {posts.map((post, index) => (
          <SwiperSlide
            key={index}
            style={{ backgroundColor: "black" }}
            className="aas"
          >
            <Flex
              direction="column"
              align="start"
              border="1px"
              borderColor="black"
              borderRadius="10px"
              key={post?._id}
              h="500px"
              m="0"
              className="card"
            >
              <Box my="2">
                <Flex>
                  <Avatar m={[2, 2]} src={`${post?.created_by?.avatar_url}`} />
                  <Center style={{ display: "flex", flexDirection: "column" }}>
                    <Text>
                      <b>{post?.created_by?.fullname}</b>
                    </Text>
                    <Text>{post?.createdAt.substring(0, 10)}</Text>
                  </Center>
                </Flex>
              </Box>
              <Box mx="2">
                <Text>{post?.content}</Text>
              </Box>
              <Box h="70%" w="100%">
                <Image
                  border="1px"
                  borderColor="black"
                  src={`${post?.imageUrl}`}
                  alt="image"
                  h="100%"
                  w="100%"
                />
              </Box>
              <Flex justifyContent="space-between" w="100%" m="2">
                <Flex>
                  <Flex>
                    {post?.likes.includes(currentUser._id) ? (
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
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
