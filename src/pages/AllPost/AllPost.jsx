import React from "react";
import { Box, Avatar, Flex, Text, Center, Image, Link } from "@chakra-ui/react";
import AvatarUser from "../../components/AvatarUser";
// import { BiLike } from "react-icons/bi";
// import { BsFillChatLeftDotsFill } from "react-icons/bs";

import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const handleGetAllPost = async () => {
    try {
      const res = await axios.get("http://localhost:8000/post/getAll");
      toast.success("get post success!");
      setPosts(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get post fail!");
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
              key={post._id}
            >
              <Box my="2">
                <Flex>
                  <AvatarUser m={[2, 2]} user={post?.created_by} />
                  <Center style={{ display: "flex", flexDirection: "column" }}>
                    <Text>
                      <b>{post?.created_by?.fullname}</b>
                    </Text>
                    <Text>{post?.createdAt?.substring(0, 10)}</Text>
                  </Center>
                </Flex>
              </Box>
              <Box mx="2">
                <Text>{post?.content}</Text>
              </Box>
              <Box>
                <Image
                  border="1px"
                  borderColor="black"
                  src={`${post?.imageUrl}`}
                  alt="image"
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
          );
        })}

        {/*  */}
      </Box>
    </Box>
  );
};

export default AllPost;
