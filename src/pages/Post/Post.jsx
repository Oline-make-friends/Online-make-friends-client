import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Center,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import AvatarUser from "../../components/AvatarUser";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { baseURL } from "../../utils/api";

const Post = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useLocation();
  const id = state.post._id;
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth?.login?.currentUser);

  const handleLikePost = async (postId) => {
    try {
      await axios.post(`${baseURL}post/like/`, {
        _id: postId,
        userId: user?._id,
      });
      handleGetPost();
    } catch (error) {
      toast.error("get post user fail!");
    }
  };
  const handleGetPost = async () => {
    try {
      const res = await axios.post(`${baseURL}post/getPost/` + id);
      var likee = false;
      res.data?.likes.forEach((like) => {
        if (like._id === user?._id) {
          likee = true;
        }
      });
      setLiked(likee);
      setPost(res.data);
    } catch (error) {
      toast.error("get post user fail!");
    }
  };
  const handleComment = async (postId) => {
    try {
      await axios.post(`${baseURL}post/comment/`, {
        id: post?._id,
        postid: postId,
      });
      handleGetPost();
    } catch (error) {
      toast.error("comment post user fail!");
    }
  };

  const createComment = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios
        .post(`${baseURL}comment/add/`, {
          user_id: user._id,
          content: comment,
        })
        .then((response) => {
          setLoading(false);
          setComment("");
          handleComment(response.data._id);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      toast.error("comment post fail!");
    }
  };

  console.log(post?.comments);
  useEffect(() => {
    handleGetPost();
    // eslint-disable-next-line
  }, []);
  return (
    <Box
      style={{
        minHeight: "900px",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
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
          <Flex mx="2">
            <AvatarUser m={[2, 2]} user={post?.created_by} />
            <Center style={{ display: "flex", flexDirection: "column" }}>
              <Text mx="4">
                <b>{post?.created_by?.fullname}</b>
              </Text>
              {/* <Text>{post.createdAt.substring(0, 10)}</Text> */}
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
        {/* hard code */}
        <Box py="4" w="100%">
          <Flex>
            <Flex>
              {liked ? (
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
            </Flex>
          </Flex>
          <Text onClick={onOpen} cursor="pointer" m="2">
            {post?.likes.length} Likes{" "}
          </Text>
          <Text style={{ color: "gray" }}>21 MINUTES AGO</Text>
          <Flex
            direction="column"
            width="100%"
            borderY="1px"
            borderColor="gray"
            py="2"
          >
            <Flex alignItems="start" direction="column">
              {post?.comments.map((comment) => {
                return (
                  <Flex alignItems="center">
                    <AvatarUser
                      m={[2, 2]}
                      user={post?.created_by}
                      id={comment?.user_id}
                    />
                    <Text ml="2" mr="1">
                      <b></b>
                    </Text>
                    <Text color="gray">{comment?.content}</Text>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
          <Box w="100%">
            <form onSubmit={createComment}>
              <Textarea
                w="90%"
                placeholder="Add a comment..."
                border="none"
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
              ></Textarea>
              <Button mt="4" type="submit">
                Comment
              </Button>
            </form>
            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Likes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" overflowy="scroll">
              <Flex direction="column">
                {post?.likes.map((like) => {
                  return (
                    <Flex alignItems="center" my="2">
                      <AvatarUser m={[2, 2]} user={like} />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Post;
