import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPS = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSendEmailResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8000/sendMail/sendEmailResetPassword/${email}`
      );
      toast.success("send email success");
      navigate("/Login");
    } catch (error) {
      toast.error("can not find user");
    }
  };
  return (
    <div className="bg">
      <Flex minH={"100vh"} align={"center"} justify={"center"} color="black">
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} color="white">
              Forgot your password?
            </Heading>
            <Text fontSize={"lg"} color="white">
              You'll get an email with a reset link
            </Text>
          </Stack>
          <form onSubmit={handleSendEmailResetPassword}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </FormControl>
                <Link href="/" color={"blue.400"}>
                  Back
                </Link>
                <Button bg={"blue.400"} color="white" type="submit">
                  Request Reset
                </Button>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </div>
  );
};

export default ResetPS;
