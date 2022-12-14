import React, { useEffect, useState, useRef } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
} from "@chakra-ui/react";
import AvatarUser from "../../components/AvatarUser";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const host = "http://localhost:8000";
  const socketRef = useRef();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useLocation();
  const id = state.post._id;
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const [update, setUpdate] = useState(false);
  const [content, setContent] = useState("");
  const [temp, setTemp] = useState("");
  const [updatePost, setUpdatePost] = useState(false);
  const [contentPost, setContentPost] = useState("");

  const handleLikePost = async (postId) => {
    try {
      await axios.post(`http://localhost:8000/post/like/`, {
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
      const res = await axios.post(`http://localhost:8000/post/getPost/` + id);
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
      await axios.post(`http://localhost:8000/post/comment/`, {
        id: post?._id,
        postid: postId,
      });
      handleGetPost();
    } catch (error) {
      toast.error("comment post user fail!");
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.post(`http://localhost:8000/comment/delete/`, {
        postId: post?._id,
        commentId: commentId,
      });
      handleGetPost();
    } catch (error) {
      toast.error("delete comment fail!");
    }
  };

  const updateComment = async (commentId) => {
    try {
      await axios.post(`http://localhost:8000/comment/update/${commentId}`, {
        content: content,
      });
      setUpdate(false);
      setContent("");
      handleGetPost();
    } catch (error) {
      toast.error("update comment fail!");
    }
  };

  const createComment = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios
        .post(`http://localhost:8000/comment/add/`, {
          user_id: user._id,
          content: comment,
        })
        .then((response) => {
          setLoading(false);
          setComment("");
          handleComment(response.data._id);
          handleSendNotiComment(post?.created_by?._id);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      toast.error("comment post fail!");
    }
  };

  const handleSendNoti = async (userPostId) => {
    try {
      await axios.post("http://localhost:8000/noti/add", {
        title: user.fullname,
        content: "like your post",
        user_id: userPostId,
      });
      socketRef.current.emit("sendNotification");
    } catch (error) {
      toast.error("Send noti fail!");
    }
  };
  const handleSendNotiComment = async (userPostId) => {
    try {
      await axios.post("http://localhost:8000/noti/add", {
        title: user.fullname,
        content: "Comment in your post",
        user_id: userPostId,
      });
      socketRef.current.emit("sendNotification");
    } catch (error) {
      toast.error("Send noti fail!");
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.post(`http://localhost:8000/post/delete/` + id);
      toast.success("delete post success");
      navigate("/profile");
    } catch (error) {
      toast.error("delete post fail");
    }
  };

  const handleUpdatePost = async () => {
    try {
      await axios.post(`http://localhost:8000/post/update/`, {
        id: id,
        content: contentPost,
      });
      setUpdatePost(false);
      setContentPost("");
      handleGetPost();
    } catch (error) {
      toast.error("delete post fail");
    }
  };

  useEffect(() => {
    handleGetPost();
    socketRef.current = socketIOClient.connect(host);
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
        minWidth="800px"
      >
        <Box my="2" w="100%">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            px="4"
          >
            <Center style={{ display: "flex", flexDirection: "column" }}>
              <AvatarUser m={[2, 2]} user={post?.created_by} />
            </Center>
            {post?.created_by?._id === user?._id ? (
              <Menu>
                <MenuButton as={Text}>
                  <BsThreeDotsVertical size={30} />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      setUpdatePost(true);
                      setContentPost(post?.content);
                    }}
                  >
                    Update POST
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDeletePost();
                    }}
                  >
                    Delete POST
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <></>
            )}
          </Flex>
        </Box>
        <Box m="2">
          {updatePost ? (
            <Flex direction="column">
              <Input
                value={contentPost}
                onChange={(e) => setContentPost(e.target.value)}
              />
              <Flex>
                <Text
                  cursor="pointer"
                  onClick={() => {
                    setUpdatePost(false);
                  }}
                  mr="2"
                >
                  Cancel
                </Text>
                <Text
                  cursor="pointer"
                  onClick={() => {
                    handleUpdatePost();
                  }}
                >
                  Update
                </Text>
              </Flex>
            </Flex>
          ) : (
            <Text>{post?.content}</Text>
          )}
        </Box>
        <Text style={{ color: "gray" }} ml="2">
          {post?.createdAt?.substring(0, 10)}
        </Text>
        <Box w="100%">
          <Image
            border="1px"
            borderColor="black"
            src={`${post?.imageUrl}`}
            alt="image"
            width="100%"
          />
        </Box>
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
          <Text onClick={onOpen} cursor="pointer" m="2">
            {post?.likes.length} Likes{" "}
          </Text>

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

                    {update &&
                    comment?.user_id === user._id &&
                    temp === comment?._id ? (
                      <Flex direction="column">
                        <Input
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                        <Flex>
                          <Text
                            cursor="pointer"
                            onClick={() => {
                              setUpdate(false);
                            }}
                            mr="2"
                          >
                            Cancel
                          </Text>
                          <Text
                            cursor="pointer"
                            onClick={() => {
                              updateComment(comment?._id);
                            }}
                          >
                            Update
                          </Text>
                        </Flex>
                      </Flex>
                    ) : (
                      <Text color="" mr="2">
                        {comment?.content}
                      </Text>
                    )}
                    {comment?.user_id === user._id ? (
                      <Menu>
                        <MenuButton as={Text}>
                          <BsThreeDotsVertical />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              setUpdate(true);
                              setContent(comment?.content);
                              setTemp(comment?._id);
                            }}
                          >
                            Update
                          </MenuItem>
                          <MenuItem onClick={() => deleteComment(comment?._id)}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    ) : (
                      <></>
                    )}
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
