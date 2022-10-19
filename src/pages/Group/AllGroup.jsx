import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AllGroup = () => {
  const navigate = useNavigate();
  const [groups, setGroup] = useState([]);
  const handleGetAllGroup = async () => {
    try {
      const res = await axios.get("http://localhost:8000/group/getAll");

      setGroup(res.data);
      console.log(res.data);
      toast.success("get all group success!");
    } catch (error) {
      toast.error("get all group  fail!");
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleGetAllGroup();
    // eslint-disable-next-line
  }, []);
  return (
    <Flex
      justify="space-between"
      justifyContent="center"
      minHeight="100vh"
      color="black"
    >
      <Flex direction="column" minHeight="80vh" overflowY="scroll">
        {groups?.map((group) => {
          return (
            <Box
              key={group?._id}
              my="2"
              border="white"
              bg="white"
              p="2"
              borderRadius="10px"
            >
              <Text as="b">{group?.name}</Text>
              <br></br>
              <Text as="i" color="gray">
                {group?.content}
              </Text>
              <br></br>
              <Button
                onClick={() => {
                  navigate("/group", {
                    state: {
                      group,
                    },
                  });
                }}
              >
                Detail
              </Button>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default AllGroup;
