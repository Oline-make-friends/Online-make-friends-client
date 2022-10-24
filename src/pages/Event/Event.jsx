import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router";
import Map from "./Map";

const Event = () => {
  const { state } = useLocation();
  const event = state.event;
  return (
    <Flex
      w="100vw"
      minHeight="100vh"
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Text color="white" as="b" fontSize="3xl">
        {event?.title}
      </Text>
      <Text fontSize="lg" color="white">
        {event?.description}
      </Text>
      <Text fontSize="lg" color="white">
        Type:{event?.type}
      </Text>
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div
            style={{
              height: `90vh`,
              margin: `auto`,
              border: "2px solid black",
            }}
          />
        }
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Flex>
  );
};

export default Event;
