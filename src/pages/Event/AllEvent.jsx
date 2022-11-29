import { Flex, Input, Text, Link, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./style.css";
// install Virtual module
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllEvent.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import * as CONSTANT from "../../constants/constans";

SwiperCore.use([Virtual, Navigation, Pagination]);
const AllEvent = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const getAllEvent = async () => {
    try {
      const res = await axios.get(`${CONSTANT.SERVER}/event/getAll`);
      setEvents(res.data?.reverse());
      console.log(res.data);
    } catch (error) {
      toast.error("Can not get event list");
    }
  };
  useEffect(() => {
    getAllEvent();
    // eslint-disable-next-line
  }, []);
  return (
    <Flex
      justifyContent="center"
      minHeight="100vh"
      color="black"
      direction="column"
      alignItems="center"
      bg="linear-gradient(rgba(13, 13, 14, 0.5), rgba(28, 27, 27, 0.5))"
    >
      <Button
        my="4"
        onClick={() => {
          navigate("/createEvent");
        }}
      >
        Create event
      </Button>
      {/* <Input w="50vw" bg="white" placeholder="Find event" /> */}

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
        {events?.map((event) => {
          return (
            <SwiperSlide style={{ backgroundColor: "black", margin: "20px" }}>
              <Flex
                direction="column"
                align="start"
                m="0"
                className="event"
                p="2"
              >
                <div className="topEvent">
                  <Flex
                    m="4"
                    bg="white"
                    p="2"
                    borderRadius="10px"
                    direction="column"
                    alignItems="center"
                    minwidth="15%"
                    height="100%"
                  >
                    <Text>{event?.date_time}</Text>
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
                  <Link
                    cursor="pointer"
                    onClick={() => {
                      navigate("/event", {
                        state: {
                          event,
                        },
                      });
                    }}
                  >
                    <Text color="white" as="b">
                      {event?.title}
                    </Text>
                  </Link>
                  <Text fontSize="xs" color="white">
                    Type:{event?.type}
                  </Text>
                </Flex>
              </Flex>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* 
      //////////////////// */}

      <Text color="white" as="bold" mt="4">
        Your event
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
        {events?.map((event) => {
          if (event?.created_by?._id === user?._id) {
            return (
              <SwiperSlide style={{ backgroundColor: "black", margin: "20px" }}>
                <Flex
                  direction="column"
                  align="start"
                  m="0"
                  className="event"
                  p="2"
                >
                  <div className="topEvent">
                    <Flex
                      m="4"
                      bg="white"
                      p="2"
                      borderRadius="10px"
                      direction="column"
                      alignItems="center"
                      minwidth="15%"
                      height="100%"
                    >
                      <Text>{event?.date_time}</Text>
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
                    <Link
                      cursor="pointer"
                      onClick={() => {
                        navigate("/event", {
                          state: {
                            event,
                          },
                        });
                      }}
                    >
                      <Text color="white" as="b">
                        {event?.title}
                      </Text>
                    </Link>
                    <Text fontSize="xs" color="white">
                      Type:{event?.type}
                    </Text>
                  </Flex>
                </Flex>
              </SwiperSlide>
            );
          } else {
            return <></>;
          }
        })}
      </Swiper>
    </Flex>
  );
};

export default AllEvent;
