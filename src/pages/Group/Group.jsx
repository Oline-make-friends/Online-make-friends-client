import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Flex, Text } from "@chakra-ui/react";

const Group = () => {
  const [group, setGroup] = useState();
  const { state } = useLocation();
  const id = state.group._id;
  const user = useSelector((state) => state.auth?.login?.currentUser);

  const handleGetGroup = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/group/get/${id}`);

      setGroup(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get post user fail!");
    }
  };
  useEffect(() => {
    handleGetGroup();
    // eslint-disable-next-line
  }, []);
  return (
    <Flex width="100vw" minHeight="100vh" justifyContent="center">
      <Box w="80vw" minHeight="100vh" bg="white">
        <Flex
          w="100%"
          borderBottom="1px"
          borderColor="gray"
          alignItems="start"
          direction="column"
        >
          <Text as="b" fontSize="2xl" color="black">
            {group?.name}
          </Text>
          <Text color="gray">{group?.content}</Text>
          <Text>Private group</Text>
          <Text>Memebers</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Group;
