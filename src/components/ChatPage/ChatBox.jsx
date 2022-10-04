import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import AvatarUser from "../AvatarUser";

const ChatBox = (props) => {
  const chat = props.chat;
  const user = props.user;
  console.log(chat);
  return (
    <Box
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      pb={3}
      px={3}
      font
      Family="Work sans"
    >
      ChatBox
      <Flex w="100%" bg="#E8E8E8" h="95%" flexDir="column">
        <Flex flexDir="row" justifyContent="flex-end" m="4">
          <Text bg="white" p="4" borderRadius="5px">
            Sender
          </Text>
          <AvatarUser user={user} />
        </Flex>
        <Flex flexDir="row" justifyContent="flex-start" m="4">
          <Text bg="#3182ce" p="4" borderRadius="5px" color="white">
            Me
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatBox;
