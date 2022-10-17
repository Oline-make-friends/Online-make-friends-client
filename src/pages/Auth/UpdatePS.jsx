import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Flex,
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { loginByGmail } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";

const UpdatePS = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPS, setCurrentPS] = useState("");
  const [newPS, setNewPS] = useState("");
  const [confirm, setConfirm] = useState("");

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if (currentPS !== user.password) {
        toast.error("Current password is wrong");
        return;
      }
      if (newPS !== confirm) {
        toast.error("Confirm password is wrong");
        return;
      }
      await axios.post(`http://localhost:8000/user/update/${user._id}`, {
        password: newPS,
      });
      loginByGmail(user.username, dispatch, navigate, null);
      toast.success("Update password success");
    } catch (error) {
      toast.error("Update password fail");
    }
  };

  return (
    <Flex alignItems="start" justifyContent="center" p="4">
      <br />
      <Box
        w="50vw"
        color="black"
        backgroundColor="white"
        m="4"
        p="4"
        borderRadius="10px"
        minHeight="100vh"
      >
        <Text fontSize="6xl">Change your password</Text>
        <form onSubmit={updatePassword}>
          <FormControl>
            <FormLabel>Current password</FormLabel>
            <Input
              type="password"
              required
              onChange={(e) => setCurrentPS(e.target.value)}
              value={currentPS}
            />
          </FormControl>
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
            Update password
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default UpdatePS;
