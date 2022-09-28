import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { signInWithGoogle } from "../../firebase";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (e) => {
    e.preventDefault();
    const newUser = {
      username: email,
      password: password,
    };
    loginUser(newUser, dispatch, navigate, toast);
  };
  return (
    <div className="bg">
      <Flex minH={"100vh"} align={"center"} justify={"center"} color="black">
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} color="white">
              Sign in to your account
            </Heading>
            <Text fontSize={"lg"} color="white">
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Flex alignItems="center" justifyContent="center">
              <Button
                onClick={() => {
                  signInWithGoogle(dispatch, navigate, toast);
                }}
                w="50px"
                h="50px"
                maxW={"md"}
                variant={"outline"}
                backgroundColor="blue.50"
              >
                <Center>
                  <FcGoogle />
                </Center>
              </Button>
            </Flex>
            <hr style={{ margin: "10px" }}></hr>
            <form onSubmit={logIn}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    // type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={5}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"blue.400"} href="/ResetPS">
                      Forgot password?
                    </Link>
                  </Stack>

                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign in
                  </Button>

                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"blue.400"} href="/Register">
                      Sign up
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
