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
  InputRightElement,
  InputGroup,
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
    const User = {
      username: email,
      password: password,
    };
    loginUser(User, dispatch, navigate, toast);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <div className="bg">
      <Flex minH={"100vh"} align={"center"} justify={"center"} color="black">
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} color="white">
              Sign in to your account
            </Heading>
            <Text fontSize={"lg"} color="white">
              OMF helps you connect and share with the people in your life.
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={logIn}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup id="password">
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={5}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  ></Stack>

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
                  <Center>
                    <Link color={"blue.400"} href="/ResetPS">
                      Forgotten password?
                    </Link>
                  </Center>
                  <Center
                    borderBottom="1px"
                    borderBottomColor="gray"
                    paddingBottom="2"
                  >
                    <Text>Dont have an account? </Text>

                    <Link mx="1" color={"blue.400"} href="/Register">
                      Sign up
                    </Link>
                  </Center>
                  <Center>OR</Center>
                  <Flex alignItems="center" justifyContent="center">
                    <Button
                      onClick={() => {
                        signInWithGoogle(dispatch, navigate, toast);
                      }}
                      maxW={"md"}
                      variant={"outline"}
                      backgroundColor="blue.200"
                      p="0"
                    >
                      <FcGoogle size={30} />
                      <Text mx="2">Login with google</Text>
                    </Button>
                  </Flex>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
