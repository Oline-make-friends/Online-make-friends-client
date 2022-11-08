import {
  Box,
  Flex,
  Input,
  Text,
  Textarea,
  Grid,
  GridItem,
  Select,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
const Course = () => {
  const { state } = useLocation();
  const id = state.course._id;
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const handleGetCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/course/get/${id}`);
      toast.success("get course success");
      setQuizs(res.data?.quizs?.reverse());
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };
  const addQuiz = async () => {
    try {
      if (
        question === "" ||
        option1 === "" ||
        option2 === "" ||
        option3 === "" ||
        option4 === ""
      ) {
        toast.error("check input");
        return;
      }
      const options = [option1, option2, option3, option4];

      await axios.post(`http://localhost:8000/quiz/add`, {
        courseId: id,
        question: question,
        options: options,
        answer: answer,
      });
      toast.success("add success");
      handleGetCourse();
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };

  useEffect(() => {
    handleGetCourse();
    // eslint-disable-next-line
  }, []);
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
          {state?.course.name}
        </Text>
        <Flex w="100%" bg="white" p="2">
          <Box w="30%" h="100%" borderRight="1px" borderColor="gray" p="2">
            Question
            <Textarea
              h="80%"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Box>
          <Flex
            w="70%"
            h="100%"
            borderRight="1px"
            p="2"
            overflowY="scroll"
            direction="column"
          >
            <Grid templateColumns="repeat(2, 1fr)" gap={6} color="black">
              <GridItem>
                <Input
                  type="text"
                  onChange={(e) => setOption1(e.target.value)}
                  value={option1}
                  isRequired
                  w="100%"
                />
              </GridItem>
              <GridItem>
                <Input
                  type="text"
                  onChange={(e) => setOption2(e.target.value)}
                  value={option2}
                  isRequired
                  w="100%"
                />
              </GridItem>
              <GridItem>
                <Input
                  type="text"
                  onChange={(e) => setOption3(e.target.value)}
                  value={option3}
                  isRequired
                  w="100%"
                />
              </GridItem>
              <GridItem>
                <Input
                  type="text"
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
                  isRequired
                  w="100%"
                />
              </GridItem>
            </Grid>
            Answer
            <Box>
              <Select
                border="1px"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              >
                <option value={option1}>{option1}</option>
                <option value={option2}>{option2}</option>
                <option value={option3}>{option3}</option>
                <option value={option4}>{option4}</option>
              </Select>
            </Box>
            <Button
              m="4"
              bg="green.400"
              _hover={{
                background: "green.500",
              }}
              onClick={() => addQuiz()}
            >
              Add
            </Button>
          </Flex>
        </Flex>
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
          {quizs.map((quiz) => {
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
