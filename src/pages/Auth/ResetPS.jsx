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

export default function ResetPS() {
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
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <Link href="/" color={"blue.400"}>
                Back
              </Link>
              <Button bg={"blue.400"}>
                <Link href="/Register" color="white">
                  Request Reset
                </Link>
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
