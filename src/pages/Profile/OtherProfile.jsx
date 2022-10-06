import React from "react";
import "animate.css";
import { Banner } from "../../components/ProfilePage/Banner";
import { Contact } from "../../components/ProfilePage/Contact";
import { Interest } from "../../components/ProfilePage/Interest";
import { Box } from "@chakra-ui/react";
import { ListPost } from "../../components/ProfilePage/ListPost";
import { useLocation } from "react-router-dom";

export default function OtherProfile() {
  const { state } = useLocation();
  const user = state.user;
  console.log(user);
  return (
    <Box>
      <Banner user={user} />
      <Interest user={user} />
      <ListPost user={user} />
      <Contact />
    </Box>
  );
}
