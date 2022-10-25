import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./AllGroup.css";
import { BsThreeDots } from "react-icons/bs";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./style.css";
// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination]);
const AllGroup = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
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
      bg="linear-gradient(rgba(13, 13, 14, 0.5), rgba(28, 27, 27, 0.5))"
    >
      <Button
        onClick={() => {
          navigate("/createGroup");
        }}
      >
        Create group
      </Button>
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
        style={{ height: "", width: "100%" }}
      >
        {groups?.map((group) => {
          return (
            <SwiperSlide
              key={group?._id}
              style={{ backgroundColor: "black", margin: "20px" }}
              className="aas"
            >
              <Flex direction="column" align="start" m="0" className="group">
                <Flex
                  className="hero"
                  direction="column"
                  alignItems="start"
                  justify="start"
                  bg={group?.avatar_url}
                >
                  <Flex
                    justify="space-between"
                    width="100%"
                    alignItems="center"
                  >
                    <Text
                      className="group_text"
                      style={{ textTransform: "uppercase" }}
                      as="b"
                    >
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
                      <BsThreeDots size={25} style={{ color: "white" }} />
                    </Button>
                  </Flex>

                  <Text className="group_text" as="cite">
                    {capitalizeFirstLetter(group?.content)}
                  </Text>
                </Flex>
                <Flex direction="column" my="4">
                  <Text mx="1">Members:{" " + group?.members.length}</Text>
                  <Text mx="1">Posts:{" " + group?.members.length}</Text>
                </Flex>
              </Flex>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Text color="white" as="bold" mt="4">
        YOUR GROUP
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
        {groups?.map((group) => {
          if (group?.admins?.includes(user?._id))
            return (
              <SwiperSlide
                key={group?._id}
                style={{ backgroundColor: "black", margin: "20px" }}
                className="aas"
              >
                <Flex direction="column" align="start" m="0" className="group">
                  <Flex
                    className="hero"
                    direction="column"
                    alignItems="start"
                    justify="start"
                    bg={group?.avatar_url}
                  >
                    <Flex
                      justify="space-between"
                      width="100%"
                      alignItems="center"
                    >
                      <Text
                        className="group_text"
                        style={{ textTransform: "uppercase" }}
                        as="b"
                      >
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
                        <BsThreeDots size={25} style={{ color: "white" }} />
                      </Button>
                    </Flex>

                    <Text className="group_text" as="cite">
                      {capitalizeFirstLetter(group?.content)}
                    </Text>
                  </Flex>
                  <Flex direction="column">
                    <Text mx="1">Members:{" " + group?.members.length}</Text>
                    <Text mx="1">Posts:{" " + group?.members.length}</Text>
                  </Flex>
                </Flex>
              </SwiperSlide>
            );
        })}
      </Swiper>
    </Flex>
  );
};

export default AllGroup;
