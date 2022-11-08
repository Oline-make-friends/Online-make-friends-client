import React, { useState } from "react";
import { Flex, Text, Textarea, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const CreateCourse = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.login.currentUser);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/course/add`, {
        created_by: user?._id,
        name: name,
        description: description,
      });
      toast.success("create success");
      navigate("/allCourse");
    } catch (error) {
      toast.error("create fail");
    }
  };
  return (
    <Flex justifyContent="center" w="100vw" minHeight="99vh">
      <Flex
        alignItems="center"
        w="80%"
        minHeight="100%"
        bg="white"
        direction="column"
        justifyContent="start"
        padding="20px"
      >
        <Text fontSize="6xl">Create course</Text>

        <form style={{ width: "100%" }} onSubmit={handleCreateEvent}>
          <Text ml="4">Name course</Text>
          <Textarea
            value={name}
            onChange={(e) => setName(e.target.value)}
            m="4"
            p="4"
            required
          />
          <Text ml="4">Description</Text>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            m="4"
            p="4"
            required
          />

          <Button ml="4" type="submit">
            Create
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default CreateCourse;
