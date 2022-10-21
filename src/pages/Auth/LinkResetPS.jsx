import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const LinkResetPS = () => {
  const navigate = useNavigate();
  const [newPS, setNewPS] = useState("");
  const [confirm, setConfirm] = useState("");
  let { id } = useParams();

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPS !== confirm) {
        toast.error("Confirm password is wrong!!");
        return;
      }
      await axios.post(`http://localhost:8000/user/update/${id}`, {
        password: newPS,
      });
      toast.success("Update password success");
      navigate("/Login");
    } catch (error) {
      toast.error("Update password fail");
    }
  };
  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        className="bg"
        color="black"
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"} color="white">
              Reset password
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={updatePassword}>
              <FormControl>
                <FormLabel>New password</FormLabel>
                <Input
                  type="password"
                  required
                  onChange={(e) => setNewPS(e.target.value)}
                  value={newPS}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm new password</FormLabel>
                <Input
                  type="password"
                  required
                  onChange={(e) => setConfirm(e.target.value)}
                  value={confirm}
                />
              </FormControl>
              <Button my="4" type="submit">
                Reset password
              </Button>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default LinkResetPS;
