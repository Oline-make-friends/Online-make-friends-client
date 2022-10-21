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
  useDisclosure,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import AvatarUser from "../AvatarUser";

const ModalList = ({ users, listContent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text onClick={onOpen} cursor="pointer">
        {listContent}
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{listContent}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height="400px" overflowY="scroll" p="4">
              {users?.map((user) => {
                return (
                  <Flex
                    alignItems="center"
                    my="2"
                    justifyContent="space-between"
                  >
                    <Flex alignItems="center">
                      <AvatarUser m={[2, 2]} user={user} />
                    </Flex>
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

export default ModalList;
