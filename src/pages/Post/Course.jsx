import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Course = () => {
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
  return (
    <Box h="90vh" w="100vw" bg="rgba(0,0,0,0.2)" py="4">
      <Flex
        w="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Text color="white" m="4" as="b" fontSize="2xl">
          PRX301
        </Text>
        <Box
          px="2"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{
            width: "100%",
            height: "88vh",
            overflowY: "scroll",
          }}
        >
          <Flex w="100%" bg="white" p="2">
            <Box w="30%" h="100%" borderRight="1px" borderColor="gray" p="2">
              Answer
            </Box>
            <Box w="70%" h="100%" borderRight="1px" p="2" overflowY="scroll">
              Question
            </Box>
          </Flex>

          {quizData.map((quiz) => {
            return (
              <Flex w="100%" bg="white" p="2" my="4" key={quiz.id}>
                <Box
                  w="30%"
                  borderRight="1px"
                  borderColor="gray"
                  p="2"
                  className="question"
                >
                  {quiz.question}
                </Box>
                <Flex
                  w="70%"
                  h="100%"
                  borderRight="1px"
                  p="2"
                  overflowY="scroll"
                  direction="column"
                >
                  {quiz.options.map((option) => {
                    return (
                      <Text color={quiz.answer === option ? "red" : ""}>
                        {option}
                      </Text>
                    );
                  })}
                </Flex>
              </Flex>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default Course;
