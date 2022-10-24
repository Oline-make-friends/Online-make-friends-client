import React, { useState } from "react";
import axios from "axios";
import { Flex, Text, Textarea, Button, Input } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CreateEvent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.login.currentUser);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/event/add`, {
        created_by: user?._id,
        title: title,
        description: description,
        type: type,
        date_time: date,
      });
      toast.success("create success");
      navigate("/allEvent");
    } catch (error) {
      toast.error("update comment fail!");
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
        <Text fontSize="6xl">Create event</Text>

        <form style={{ width: "100%" }} onSubmit={handleCreateEvent}>
          <Text ml="4">Title</Text>
          <Textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <Text ml="4">Type</Text>
          <Input
            value={type}
            onChange={(e) => setType(e.target.value)}
            m="4"
            p="4"
            required
          />
          <Text ml="4">Date</Text>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

export default CreateEvent;
