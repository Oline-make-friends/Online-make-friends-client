import React from "react";
import { useGoogleAuth } from "./GoogleAuthContext";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
  const { signIn } = useGoogleAuth();

  return <Button onClick={signIn}>Login</Button>;
};

export default LoginButton;
