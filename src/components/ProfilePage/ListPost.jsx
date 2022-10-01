import React, { useEffect, useState } from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Flex, Image, Text, Avatar, Center, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const handleGetAllPost = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/post/get/" + user._id
      );
      toast.success("get post success!");
      setPosts(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get post user fail!");
    }
  };

  useEffect(() => {
    handleGetAllPost();
    // eslint-disable-next-line
  }, []);

  return (
    <>
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
              key={post._id}
              h="500px"
              m="0"
              className="card"
            >
              <Box my="2">
                <Flex>
                  <Avatar m={[2, 2]} src={`${post.created_by.avatar_url}`} />
                  <Center style={{ display: "flex", flexDirection: "column" }}>
                    <Text>
                      <b>{post.created_by.fullname}</b>
                    </Text>
                    <Text>{post.createdAt.substring(0, 10)}</Text>
                  </Center>
                </Flex>
              </Box>
              <Box mx="2">
                <Text>{post.content}</Text>
              </Box>
              <Box h="70%" w="100%">
                <Image
                  border="1px"
                  borderColor="black"
                  src={`${post.imageUrl}`}
                  alt="image"
                  h="100%"
                  w="100%"
                />
              </Box>
              <Flex alignItems="start" my="2">
                {/* <BiLike size={25} style={{ marginRight: "5px" }} />
              <BsFillChatLeftDotsFill size={25} />
              <Text mx="2">See comment</Text> */}
                <Link
                  mx="4"
                  onClick={() => {
                    navigate("/post", {
                      state: {
                        post,
                      },
                    });
                  }}
                >
                  <b>Detail</b>
                </Link>
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
