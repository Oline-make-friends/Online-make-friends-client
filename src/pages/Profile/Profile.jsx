import React from "react";
import "animate.css";
import TrackVisibility from "react-on-screen";
import headerImg from "../../assets/img/header-img.svg";
import { Flex, Box } from "@chakra-ui/react";

export default function Profile() {
  return (
    <div style={{ height: "100vh" }}>
      <Flex flexDirection="row" h="80vh">
        <Box w="80vw"></Box>
        <TrackVisibility w="20vw">
          {({ isVisible }) => (
            <div
              className={isVisible ? "animate__animated animate__zoomIn" : ""}
            >
              <img src={headerImg} alt="Header Img" style={{ width: "80vh" }} />
            </div>
          )}
        </TrackVisibility>
      </Flex>
    </div>
  );
}
