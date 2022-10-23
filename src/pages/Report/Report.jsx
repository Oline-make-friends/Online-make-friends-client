import React, { useState } from "react";
import { Flex, Button, Textarea, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import TableReport from "./TableReport";
import { toast } from "react-toastify";

const Report = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const [description, setDescription] = useState("");
  const sendReport = async () => {
    try {
      await axios.post("http://localhost:8000/report/add", {
        sent_by: user._id,
        content: description,
      });
      toast.success("send success");
      setDescription("");
    } catch (error) {
      toast.error("get notification  fail!");
    }
  };
  return (
    <Flex
      direction="column"
      justifyContent="center"
      align="center"
      w="100vw"
      h="99vh"
    >
      {" "}
      <Box bg="white" p="20px" borderRadius="15px">
        <Text fontSize="2xl" as="b">
          Rerport to admin
        </Text>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={() => {
            sendReport();
          }}
          my="4"
        >
          Report to Admin
        </Button>
        <TableReport user={user} />
      </Box>
    </Flex>
  );
};

export default Report;
