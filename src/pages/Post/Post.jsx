import React from "react";
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
} from "@chakra-ui/react";
import AvatarUser from "../../components/AvatarUser";

const Post = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useLocation();
  const post = state.post;
  console.log(post);
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
        key={post._id}
      >
        <Box my="2">
          <Flex>
            <AvatarUser m={[2, 2]} user={post?.created_by} />
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
        <Box>
          <Image
            border="1px"
            borderColor="black"
            src={`${post.imageUrl}`}
            alt="image"
          />
        </Box>
        {/* hard code */}
        <Box px="4" py="2">
          <Text onClick={onOpen}> Likes </Text>

          <Flex alignItems="start">
            <Text mr="2">
              <b>An</b>
            </Text>
            <Text>Hehe</Text>
          </Flex>
          <Text style={{ color: "gray" }}>21 MINUTES AGO</Text>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Likes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center">
              <AvatarUser m={[2, 2]} user={post?.created_by} />
              <Text>
                <b>{post?.created_by?.fullname}</b>
              </Text>
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
