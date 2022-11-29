import React, { useState } from "react";
import axios from "axios";
import { Flex, Text, Textarea, Button, Input, Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as CONSTANT from "../../constants/constans";

const CreateEvent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.login.currentUser);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date());
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${CONSTANT.SERVER}/event/add`, {
        created_by: user?._id,
        title: title,
        description: description,
        type: type,
        date_time: date.toString().slice(0, 10),
      });
      toast.success("create success");
      navigate("/allEvent");
    } catch (error) {
      console.log(error.message);
      toast.error("create fail!");
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
          {/* <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            m="4"
            p="4"
            required
          /> */}
          <Box border="1px" w="30%" ml="4" my="2">
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </Box>
          <Button ml="4" type="submit">
            Create
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default CreateEvent;
