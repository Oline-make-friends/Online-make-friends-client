import React, { useEffect, useState } from "react";
import "animate.css";
import { Banner } from "../../components/ProfilePage/Banner";
import { Contact } from "../../components/ProfilePage/Contact";
import { Interest } from "../../components/ProfilePage/Interest";
import { Box } from "@chakra-ui/react";
import { ListPost } from "../../components/ProfilePage/ListPost";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function OtherProfile() {
  const { state } = useLocation();
  const [user, setUser] = useState(state.user);
  const handleGetUser = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/user/getUser/` + state.user._id
      );
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Box>
      <Banner user={user} />
      <Interest user={user} />
      <ListPost user={user} />
      <Contact />
    </Box>
  );
}
