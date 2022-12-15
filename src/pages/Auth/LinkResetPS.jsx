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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import * as CONSTANT from "../../constants/constans";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LinkResetPS = () => {
  const navigate = useNavigate();
  const [newPS, setNewPS] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  let { id } = useParams();

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPS !== confirm) {
        toast.error("Confirm password is wrong!!");
        return;
      }
      await axios.post(`${CONSTANT.SERVER}/user/update/${id}`, {
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
                <InputGroup id="password">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={(e) => setNewPS(e.target.value)}
                    value={newPS}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Confirm new password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={(e) => setConfirm(e.target.value)}
                    value={confirm}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
