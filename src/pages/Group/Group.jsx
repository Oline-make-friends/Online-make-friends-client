import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Center,
  Link,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import ModalList from "../../components/Group/Modal";
import { useNavigate } from "react-router";
import AvatarUser from "../../components/AvatarUser";
import { useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import socketIOClient from "socket.io-client";
import * as CONSTANT from "../../constants/constans";

const Group = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [group, setGroup] = useState(state.group);
  const [isMemeber, setIsMemeber] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const host = `${CONSTANT.SERVER}`;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const socketRef = useRef();

  const id = state.group._id;
  const user = useSelector((state) => state.auth?.login?.currentUser);

  const handleGetGroup = async () => {
    try {
      const res = await axios.get(`${CONSTANT.SERVER}/group/get/${id}`);

      setGroup(res.data);

      res.data.members?.forEach((memeber) => {
        if (memeber?._id === user._id) {
          setIsMemeber(true);
        }
      });

      console.log(res.data.admins);

      res.data?.admins?.forEach((admin) => {
        if (admin?._id === user._id) {
          setIsAdmin(true);
        }
      });
      console.log(isAdmin);

      // console.log(res.data);
    } catch (error) {
      toast.error("get post user fail!");
    }
  };

  const joinGroup = async () => {
    try {
      const res = await axios.post(`${CONSTANT.SERVER}/group/join`, {
        _id: id,
        idUser: user._id,
      });
      if (res.data === "you are already member of the group!") {
        toast.error("you are already member of the group!");
      }
      toast.success("Join success");
      handleGetGroup();
    } catch (error) {
      toast.error("Send noti fail!");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.post(`${CONSTANT.SERVER}/post/delete/` + postId);
      toast.success("delete post success");
      handleGetGroup();
    } catch (error) {
      toast.error("delete post fail");
    }
  };

  const leaveGroup = async () => {
    try {
      await axios.post(`${CONSTANT.SERVER}/group/leave`, {
        _id: id,
        idUser: user._id,
      });
      // toast.success("Leave success");
      handleGetGroup();
      setIsMemeber(false);
    } catch (error) {
      toast.error("Send noti fail!");
    }
  };

  const deleteGroup = async () => {
    try {
      await axios.post(`${CONSTANT.SERVER}/group/delete`, {
        _id: id,
      });
      navigate("/allGroup");
    } catch (error) {
      toast.error("Send noti fail!");
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await axios.post(`${CONSTANT.SERVER}/post/like/`, {
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

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    handleGetGroup();

    // eslint-disable-next-line
  }, []);

  return (
    <Box
      style={{
        minHeight: "900px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "99vw",
      }}
    >
      <Box
        style={{
          width: "50%",
          marginTop: "20px",
        }}
        display="flex"
        flexDirection="column"
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
          direction="column"
          bg="white"
        >
          <Text as="b" fontSize="2xl" color="black">
            Name group:{group?.name}
          </Text>
          <Text color="gray.500">Description : {" " + group?.content}</Text>
          <ModalList
            users={group?.members}
            listContent={"Group member : " + group?.members?.length}
          />
          <ModalList users={group?.admins} listContent={"Admin"} />
          {isAdmin ? (
            <>
              <Text as="u">Your are admin of this group</Text>
              <Button colorScheme="red" onClick={onOpen}>
                Delete Group
              </Button>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete group
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          deleteGroup();
                        }}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          ) : (
            <></>
          )}
          {isMemeber ? (
            <>
              <Button
                bg="blue.500"
                onClick={() => {
                  navigate("/uploadPostGroup", {
                    state: {
                      group: group,
                    },
                  });
                }}
                my="2"
              >
                Upload post in group
              </Button>
              <Button
                w="99%"
                my="2"
                onClick={() => {
                  leaveGroup();
                }}
              >
                Leave group
              </Button>
            </>
          ) : (
            <Button
              w="99%"
              my="2"
              onClick={() => {
                joinGroup();
              }}
            >
              Join group
            </Button>
          )}
        </Flex>

        {group?.posts?.map((post) => {
          if (post.is_deleted === false) {
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
                    <Center
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Text>{post?.createdAt?.substring(0, 10)}</Text>
                      {isAdmin ? (
                        <>
                          <Button
                            onClick={() => {
                              handleDeletePost(post?._id);
                            }}
                            bg="red.400"
                            color="white"
                          >
                            Delete this post
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
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
          }
        })}
      </Box>
    </Box>
  );
};

export default Group;
