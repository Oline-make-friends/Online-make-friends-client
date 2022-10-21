import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Flex, Text, Link, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./AllGroup.css";
import { BsThreeDots } from "react-icons/bs";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./style.css";
// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination]);
const AllGroup = () => {
  const navigate = useNavigate();
  const [groups, setGroup] = useState([]);
  const handleGetAllGroup = async () => {
    try {
      const res = await axios.get("http://localhost:8000/group/getAll");

      setGroup(res.data);
      toast.success("get all group success!");
    } catch (error) {
      toast.error("get all group  fail!");
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleGetAllGroup();
    // eslint-disable-next-line
  }, []);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <Flex
      justifyContent="center"
      minHeight="100vh"
      color="black"
      direction="column"
      alignItems="center"
    >
      <Text color="white" as="bold">
        ALL GROUP
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
        style={{ height: "200px", width: "60%" }}
      >
        {groups?.map((group) => {
          return (
            <SwiperSlide
              key={group?._id}
              style={{ backgroundColor: "black", margin: "20px" }}
              className="aas"
            >
              <Flex
                direction="column"
                align="start"
                border="1px"
                borderColor="black"
                m="0"
                className="card"
              >
                <Flex
                  className="hero"
                  direction="column"
                  p="2"
                  alignItems="start"
                  justify="center"
                >
                  <Flex justify="space-between" width="100%">
                    <Text className="group_text">
                      {capitalizeFirstLetter(group?.name)}
                    </Text>
                    <Button
                      bg="none"
                      onClick={() => {
                        navigate("/group", {
                          state: {
                            group,
                          },
                        });
                      }}
                    >
                      <BsThreeDots size={25} />
                    </Button>
                  </Flex>

                  <Text className="group_text">
                    {capitalizeFirstLetter(group?.content)}
                  </Text>
                </Flex>
                <Flex>
                  <Text mx="1">{group?.members.length + " "}Members -</Text>
                  <Text>{group?.members.length + " "}Posts</Text>
                </Flex>
              </Flex>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* {groups?.map((group) => {
        return (
          <Box
            key={group?._id}
            my="2"
            border="white"
            bg="white"
            p="2"
            borderRadius="10px"
            width="500px"
            height="150px"
          >
            <Flex
              className="hero"
              direction="column"
              p="2"
              alignItems="start"
              justify="center"
            >
              <Flex justify="space-between" width="100%">
                <Text className="group_text">
                  {capitalizeFirstLetter(group?.name)}
                </Text>
                <Button
                  bg="none"
                  onClick={() => {
                    navigate("/group", {
                      state: {
                        group,
                      },
                    });
                  }}
                >
                  <BsThreeDots size={25} />
                </Button>
              </Flex>

              <Text className="group_text">
                {capitalizeFirstLetter(group?.content)}
              </Text>
            </Flex>
            <Flex>
              <Text mx="1">{group?.members.length + " "}Members -</Text>
              <Text>{group?.members.length + " "}Posts</Text>
            </Flex>
          </Box>
        );
      })} */}
    </Flex>
  );
};

export default AllGroup;
