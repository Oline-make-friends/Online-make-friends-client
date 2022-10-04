import { Box, Button, Text, Flex, Stack } from "@chakra-ui/react";
import React from "react";

const MyChats = (props) => {
  const user = props.user;
  const chats = props.chats;
  const selectedChat = props.selectedchat;
  console.log(chats);
  return (
    <Box
      d={{ base: selectedChat ? " none " : " flex ", md: " flex " }}
      flexDir=" column "
      alignItems=" center "
      p={3}
      bg=" white "
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        font
        Family="Work sans"
        W="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>My Chats</Text>
        <Button d="flex" fontSize={{ base: "17px", md: "10px", lg: "17px" }}>
          New Group Chat
        </Button>
      </Flex>
      <Flex
        flexDirection="column"
        p="3"
        bg="F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        <Stack overflowY="scroll" h="80%">
          {chats?.map((chat) => {
            return (
              <Box
                key={chat?._id}
                bg="#E8E8E8"
                color="black"
                px="3"
                py="2"
                borderRadius="lg"
              >
                <Text>{chat?.chatName}</Text>
              </Box>
            );
          })}
        </Stack>
      </Flex>
    </Box>
  );
};

export default MyChats;
