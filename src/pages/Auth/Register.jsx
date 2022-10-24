import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import * as CONSTANT from "../../constants/constans";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("Male");

  const handleRegister = async () => {
    try {
      if (confirmpassword !== password) {
        toast.error("Confirm password is wrong");
        return;
      }
      const res = await axios.post("http://localhost:8000/auth/register", {
        username: email,
        password: password,
        fullname: fullname,
        gender: gender,
      });
      toast.success("Regis success!");
      //create for chat
      var user = new CometChat.User(res.data._id);
      user.setName(fullname);
      user.setAvatar(
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-Conversation-lam-hinh-dai-dien.jpg"
      );
      CometChat.createUser(user, CONSTANT.AUTH_KEY).then(
        (user) => {
          console.log("user created", user);
        },
        (error) => {
          console.log("error", error);
        }
      );
      navigate("/Login");
    } catch (error) {
      toast.error("Regis fail!");
      console.log(error.message);
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
              Sign up
            </Heading>
            <Text fontSize={"lg"} color="white">
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            w="450px"
          >
            <form>
              <Stack spacing={4}>
                <Box>
                  <FormControl id="fullName" isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setFullname(e.target.value)}
                      isRequired
                    />
                  </FormControl>
                </Box>

                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      isRequired
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Confirm password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      isRequired
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Text>Gender</Text>
                <Box>
                  <Select
                    border="1px"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </Select>
                </Box>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleRegister}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link color={"blue.400"} href="/">
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
          {/* <Button
            onClick={() => {
              toast("success");
            }}
          >
            test
          </Button> */}
        </Stack>
      </Flex>
    </div>
  );
}
