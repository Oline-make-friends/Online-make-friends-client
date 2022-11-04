import React from "react";
import {
  Box,
  GridItem,
  Grid,
  Flex,
  Text,
  Button,
  Input,
  Center,
} from "@chakra-ui/react";
import AvatarUser from "../../components/AvatarUser";
import { useNavigate } from "react-router";

const AllCourse = () => {
  const quizData = [
    {
      id: 0,
      question: ` What is the Capital Of India ?`,
      options: [`New Delhi`, `Mumbai`, `Kolkatta`],
      answer: `New Delhi`,
    },
    {
      id: 1,
      question: `Who is the CEO of Tesla Motors?`,
      options: [`Bill Gates`, `Steve Jobs`, `Elon Musk`],
      answer: `Elon Musk`,
    },
    {
      id: 3,
      question: `Name World's Richest Man?`,
      options: [`Jeff Bezo`, `Bill Gates`, `Mark Zuckerberg`],
      answer: `Jeff Bezo`,
    },
    {
      id: 4,
      question: `World's Longest River?`,
      options: [`River Nile`, `River Amazon`, `River Godavari`],
      answer: `River Nile`,
    },
  ];
  const navigate = useNavigate();
  return (
    <Box h="90vh" w="100vw" p="4" overflowY="scroll" bg="rgba(0,0,0,0.2)">
      {/*  */}
      <Center>
        <Flex width="50%" my="4">
          <Input
            placeholder="Find course"
            //   value={find}
            //   onChange={(e) => {
            //     setFind(e.target.value);
            //   }}
            bg="white"
          />
          <Button
            mx="2"
            //   onClick={() => {
            //     handleFindPost();
            //   }}
          >
            Find
          </Button>
        </Flex>
      </Center>
      {/*  */}
      <Grid templateColumns="repeat(5, 1fr)" gap={6} color="black">
        <GridItem
          w="100%"
          h="180px"
          bg="white"
          p="2"
          onClick={() => navigate("/course")}
          cursor="pointer"
          _hover={{
            background: "blue.100",
          }}
        >
          <Flex w="100%" h="100%" direction="column">
            <Flex w="100%" h="50%" direction="column" p="2">
              <Text as="b" fontSize="2xl">
                PRX301
              </Text>
              <Text color="gray">150 Questions</Text>
            </Flex>
            <AvatarUser />
          </Flex>
        </GridItem>
        <GridItem w="100%" h="180px" bg="white" p="2">
          <Flex w="100%" h="100%" direction="column">
            <Flex w="100%" h="50%" direction="column" p="2">
              <Text as="b" fontSize="2xl">
                PRX301
              </Text>
              <Text color="gray">150 Questions</Text>
            </Flex>
            <AvatarUser />
          </Flex>
        </GridItem>
        <GridItem w="100%" h="180px" bg="white" p="2">
          <Flex w="100%" h="100%" direction="column">
            <Flex w="100%" h="50%" direction="column" p="2">
              <Text as="b" fontSize="2xl">
                PRX301
              </Text>
              <Text color="gray">150 Questions</Text>
            </Flex>
            <AvatarUser />
          </Flex>
        </GridItem>
        <GridItem w="100%" h="180px" bg="white" p="2">
          <Flex w="100%" h="100%" direction="column">
            <Flex w="100%" h="50%" direction="column" p="2">
              <Text as="b" fontSize="2xl">
                PRX301
              </Text>
              <Text color="gray">150 Questions</Text>
            </Flex>
            <AvatarUser />
          </Flex>
        </GridItem>
        <GridItem w="100%" h="180px" bg="white" p="2">
          <Flex w="100%" h="100%" direction="column">
            <Flex w="100%" h="50%" direction="column" p="2">
              <Text as="b" fontSize="2xl">
                PRX301
              </Text>
              <Text color="gray">150 Questions</Text>
            </Flex>
            <AvatarUser />
          </Flex>
        </GridItem>
        <GridItem w="100%" h="180px" bg="white" p="2">
          <Flex w="100%" h="100%" direction="column">
            <Flex w="100%" h="50%" direction="column" p="2">
              <Text as="b" fontSize="2xl">
                PRX301
              </Text>
              <Text color="gray">150 Questions</Text>
            </Flex>
            <AvatarUser />
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AllCourse;
