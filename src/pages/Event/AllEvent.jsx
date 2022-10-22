import { Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./style.css";
// install Virtual module
import { useNavigate } from "react-router-dom";
import "./AllEvent.css";
SwiperCore.use([Virtual, Navigation, Pagination]);
const AllEvent = () => {
  return (
    <Flex
      justifyContent="center"
      minHeight="100vh"
      color="black"
      direction="column"
      alignItems="center"
    >
      <Input w="50vw" bg="white" placeholder="Find event" />

      <Text color="white" as="bold">
        ALL Event
      </Text>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        virtual
        style={{ height: "", width: "100%" }}
      >
        <SwiperSlide style={{ backgroundColor: "black", margin: "20px" }}>
          <Flex direction="column" align="start" m="0" className="event" p="2">
            <div className="topEvent">
              <Flex
                m="4"
                bg="white"
                p="2"
                borderRadius="10px"
                direction="column"
                alignItems="center"
                width="15%"
                height="100%"
              >
                <Text>21</Text>
                <Text>Dec</Text>
              </Flex>
            </div>
            <Flex
              direction="column"
              alignItems=""
              justifyContent="flex-end"
              width="100%"
              height="80%"
              p="2"
            >
              <Text mx="1" color="white" as="b">
                Glowing Art Performance
              </Text>
              <Text fontSize="xs" color="white">
                (xs) In love with React & Next
              </Text>
            </Flex>
          </Flex>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "black", margin: "20px" }}>
          <Flex direction="column" align="start" m="0" className="event" p="2">
            <div className="topEvent">
              <Flex
                m="4"
                bg="white"
                p="2"
                borderRadius="10px"
                direction="column"
                alignItems="center"
                width="15%"
                height="100%"
              >
                <Text>21</Text>
                <Text>Dec</Text>
              </Flex>
            </div>
            <Flex
              direction="column"
              alignItems=""
              justifyContent="flex-end"
              width="100%"
              height="80%"
              p="2"
            >
              <Text mx="1" color="white" as="b">
                Glowing Art Performance
              </Text>
              <Text fontSize="xs" color="white">
                (xs) In love with React & Next
              </Text>
            </Flex>
          </Flex>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "black", margin: "20px" }}>
          <Flex direction="column" align="start" m="0" className="event" p="2">
            <div className="topEvent">
              <Flex
                m="4"
                bg="white"
                p="2"
                borderRadius="10px"
                direction="column"
                alignItems="center"
                width="15%"
                height="100%"
              >
                <Text>21</Text>
                <Text>Dec</Text>
              </Flex>
            </div>
            <Flex
              direction="column"
              alignItems=""
              justifyContent="flex-end"
              width="100%"
              height="80%"
              p="2"
            >
              <Text mx="1" color="white" as="b">
                Glowing Art Performance
              </Text>
              <Text fontSize="xs" color="white">
                (xs) In love with React & Next
              </Text>
            </Flex>
          </Flex>
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};

export default AllEvent;
