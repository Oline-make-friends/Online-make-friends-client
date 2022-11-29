import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import AvatarUser from "../AvatarUser";
import axios from "axios";
import { toast } from "react-toastify";
import { loginByGmail } from "../../redux/apiRequest";
import * as CONSTANT from "../../constants/constans";

const Follows = ({ user }) => {
  const currentUser = useSelector((state) => state.auth?.login?.currentUser);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const unFollow = async (id) => {
    try {
      await axios.post(`${CONSTANT.SERVER}/user/unfollow`, {
        currentUser_id: currentUser._id,
        follower_id: id,
      });
      loginByGmail(user?.username, dispatch, null, null);
      toast.success("Unfollow success");
    } catch (error) {
      toast.error("Unfollow fail");
      console.log(error);
    }
  };
  return (
    <>
      <Text onClick={onOpen} cursor="pointer">
        {user?.follows.length + " "}
        Following{" "}
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Follows</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height="400px" overflowY="scroll" p="4">
              {user?.follows.map((follow) => {
                return (
                  <Flex
                    alignItems="center"
                    my="2"
                    justifyContent="space-between"
                  >
                    <Flex alignItems="center">
                      <AvatarUser m={[2, 2]} user={follow} />
                    </Flex>
                    {currentUser?._id !== user?._id ? (
                      <></>
                    ) : (
                      <Button
                        onClick={() => {
                          unFollow(follow?._id);
                        }}
                      >
                        UnFollow
                      </Button>
                    )}
                  </Flex>
                );
              })}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Follows;
