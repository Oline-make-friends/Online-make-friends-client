import React, { useState } from "react";
import { Box, Center, Container, Input, Text } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const JoinCall = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("1234");
  const joinRoom = () => {
    try {
      navigate("/zego?roomID=" + roomId);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container w="100vw" h="90vh">
      <Center w="100%" h="100%">
        <Box
          w="950px"
          h="540px"
          bg="white"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          p="4"
          borderRadius="15px"
        >
          <Text my="2">Room call</Text>
          <Input
            placeholder="input room ID you want to join"
            borderColor="black"
            my="2"
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button
            my="2"
            onClick={() => {
              joinRoom();
            }}
          >
            Join
          </Button>
        </Box>
      </Center>
    </Container>
  );
};

export default JoinCall;
