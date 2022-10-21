import React from "react";
import { Box, Flex, Text, Center, Image, Link } from "@chakra-ui/react";
import AvatarUser from "../../components/AvatarUser";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";

const AllPost = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const handleGetAllPost = async () => {
    try {
      const res = await axios.get("http://localhost:8000/post/getAll");
      toast.success("get post success!");
      setPosts(res.data);
    } catch (error) {
      toast.error("get post fail!");
    }
  };
  const handleLikePost = async (postId) => {
    try {
      await axios.post(`http://localhost:8000/post/like/`, {
        _id: postId,
        userId: user?._id,
      });
      handleGetAllPost();
    } catch (error) {
      toast.error("get post user fail!");
    }
  };
  // setPosts("abds");
  useEffect(() => {
    handleGetAllPost();
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
                  <Center style={{ display: "flex", flexDirection: "column" }}>
                    <Text>{post?.createdAt?.substring(0, 10)}</Text>
                  </Center>
                </Flex>
              </Box>
              <Box mx="2">
                <Text>{post?.content}</Text>
              </Box>
              <Box w="100%">
                <Image
                  border="1px"
                  borderColor="black"
                  src={`${post?.imageUrl}`}
                  alt="image"
                  w="100%"
                />
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

        {/*  */}
      </Box>
    </Box>
  );
};

export default AllPost;
