import React from "react";
import "animate.css";
import { Banner } from "../../components/ProfilePage/Banner";
import { Contact } from "../../components/ProfilePage/Contact";
import { useSelector } from "react-redux";
import { Interest } from "../../components/ProfilePage/Interest";
import { Box } from "@chakra-ui/react";

export default function Profile() {
  const user = useSelector((state) => state.auth?.login.currentUser);
  console.log(user);
  return (
    <Box>
      <Banner user={user} />
      <Interest user={user} />
      <Contact />
    </Box>
  );
}
