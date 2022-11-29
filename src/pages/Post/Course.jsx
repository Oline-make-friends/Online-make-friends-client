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
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AvatarUser from "../../components/AvatarUser";
import * as CONSTANT from "../../constants/constans";
const Course = () => {
  const { state } = useLocation();
  const id = state.course._id;
  const createdBy = state.course.created_by;
  const currentUser = useSelector((state) => state.auth?.login?.currentUser);
  const [course, setCourse] = useState();
  const [quizs, setQuizs] = useState([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const navigate = useNavigate();

  const handleGetCourse = async () => {
    try {
      const res = await axios.get(`${CONSTANT.SERVER}/course/get/${id}`);
      toast.success("get course success");
      setCourse(res.data);
      setQuizs(res.data?.quizs?.reverse());
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };
  const deleteCourse = async () => {
    try {
      await axios.get(`${CONSTANT.SERVER}/course/delete/${id}`);
      toast.success("deleted course");
      navigate("/allCourse");
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };
  const deleteQuiz = async (quizid) => {
    try {
      await axios.get(`${CONSTANT.SERVER}/quiz/delete/${quizid}`);
      toast.success("deleted that");
      handleGetCourse();
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
      if (answer === "") {
        toast.error("choice answer");
        return;
      }
      const options = [option1, option2, option3, option4];

      await axios.post(`${CONSTANT.SERVER}/quiz/add`, {
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
    <Box minHeight="90vh" w="100vw" bg="rgba(0,0,0,0.2)" py="4" px="2">
      <Flex
        w="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        {course?.created_by?._id === currentUser?._id ? (
          <Button
            bg="red.400"
            onClick={() => {
              deleteCourse();
            }}
          >
            Delete this course
          </Button>
        ) : (
          <Box color="white">
            <AvatarUser user={createdBy} />
          </Box>
        )}
        <Text color="white" m="4" as="b" fontSize="2xl">
          {state?.course.name}
        </Text>
        {course?.created_by?._id === currentUser?._id ? (
          <Flex w="100%" bg="white" p="2" h="100%">
            <Box w="30%" h="100%" borderColor="gray" p="2">
              Question
              <Textarea
                h="200px"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Box>
            <Flex w="70%" h="100%" borderLeft="1px" p="2" direction="column">
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
        ) : (
          <></>
        )}

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
              <Flex w="100%" bg="white" p="2" my="4" key={quiz?.id}>
                <Box
                  w="70%"
                  borderRight="1px"
                  borderColor="gray"
                  p="2"
                  className="question"
                >
                  {quiz?.question}
                  <br></br>
                  <Box my="2">
                    {quiz?.options.map((option) => {
                      return <Text color={quiz?.answer}>{option}</Text>;
                    })}
                  </Box>
                </Box>
                <Flex w="30%" h="100%" p="2" direction="column">
                  {quiz?.options.map((option) => {
                    if (quiz?.answer === option) {
                      return (
                        <Text color={quiz?.answer === option ? "green" : ""}>
                          {option}
                        </Text>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                  {course?.created_by?._id === currentUser?._id ? (
                    <Button
                      bg="red.400"
                      onClick={() => {
                        deleteQuiz(quiz?._id);
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    <></>
                  )}
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
