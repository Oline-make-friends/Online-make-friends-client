import {
  Button,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import AvatarUser from "../../components/AvatarUser";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import * as CONSTANT from "../../constants/constans";
import DatePicker from "react-datepicker";

const Event = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useLocation();
  // const event = state.event;
  const [event, setEvent] = useState(state.event);
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date());
  const [datepicker, setDatepicker] = useState(new Date());

  const handleGetEvent = async () => {
    try {
      const res = await axios.get(
        `${CONSTANT.SERVER}/event/getEvent/${event?._id}`
      );
      setEvent(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("update comment fail!");
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await axios.post(`${CONSTANT.SERVER}/event/update`, {
        id: event?._id,
        title: title,
        description: description,
        type: type,
        date_time: date,
      });
      setUpdateEvent(false);
      handleGetEvent();
      toast.success("update success");
    } catch (error) {
      toast.error("update comment fail!");
    }
  };
  const deleteEvent = async () => {
    try {
      await axios.post(`${CONSTANT.SERVER}/event/delete`, {
        id: event?._id,
      });
      toast.success("Deleted");
      navigate("/allEvent");
    } catch (error) {
      toast.error("update comment fail!");
    }
  };
  const joinEvent = async () => {
    try {
      var d1 = new Date();
      if (d1 > date) {
        toast.error("This event has expored");
        return;
      }
      const res = await axios.post(`${CONSTANT.SERVER}/event/joinEvent`, {
        eventId: event?._id,
        userId: user?._id,
      });
      if (res.data === "You already joined this event")
        toast.error("You already joined this event");
      else {
        toast.success("Join success");
        handleGetEvent();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const unJoinEvent = async () => {
    try {
      await axios.post(`${CONSTANT.SERVER}/event/unJoinEvent`, {
        eventId: event?._id,
        userId: user?._id,
      });
      handleGetEvent();
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleGetEvent();
    // eslint-disable-next-line
  }, []);

  return (
    <Flex
      w="100vw"
      minHeight="100vh"
      direction="column"
      alignItems="center"
      bg="linear-gradient(rgba(13, 13, 14, 0.5), rgba(28, 27, 27, 0.5))"
    >
      <Flex alignItems="center" color="white">
        {updateEvent ? (
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          <Text color="white" as="b" fontSize="3xl" my="2">
            {event?.title}
          </Text>
        )}

        {event?.created_by?._id === user?._id ? (
          <Menu>
            <MenuButton as={Text}>
              <BsThreeDotsVertical size={30} />
            </MenuButton>
            <MenuList color="black">
              <MenuItem
                onClick={() => {
                  setUpdateEvent(true);
                  setTitle(event?.title);
                  setDescription(event?.description);
                  setType(event?.type);
                  setDate(event?.date_time);
                }}
              >
                Update EVENT
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteEvent();
                }}
              >
                Delete EVENT
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <></>
        )}
        {updateEvent ? (
          <>
            <Button
              cursor="pointer"
              onClick={() => {
                handleUpdateEvent();
              }}
              mr="2"
              bg="white"
              color="black"
            >
              Update
            </Button>
            <Button
              cursor="pointer"
              onClick={() => {
                setUpdateEvent(false);
              }}
              mr="2"
              bg="white"
              color="black"
            >
              Cancel
            </Button>
          </>
        ) : (
          <></>
        )}
      </Flex>
      {updateEvent ? (
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          w="50%"
          color="white"
        />
      ) : (
        <Text fontSize="lg" color="white" my="2">
          Description:{" " + event?.description}
        </Text>
      )}

      <Text fontSize="lg" color="white" my="2">
        Create by:
      </Text>
      <Text fontSize="lg" color="white" my="2">
        <AvatarUser user={event?.created_by} />
      </Text>
      <Flex w="800px" p="2" justify="space-between">
        {updateEvent ? (
          <Input
            value={type}
            onChange={(e) => setType(e.target.value)}
            w="50%"
            color="white"
          />
        ) : (
          <Text fontSize="lg" color="white" my="2">
            Type:{event?.type}
          </Text>
        )}
        {updateEvent ? (
          // <Input
          //   value={date}
          //   onChange={(e) => setDate(e.target.value)}
          //   w="50%"
          //   color="white"
          // />
          <Box border="1px" w="30%" ml="4" my="2">
            <DatePicker selected={datepicker} />
          </Box>
        ) : (
          <Text fontSize="lg" color="white" my="2">
            {event?.date_time}
          </Text>
        )}
      </Flex>

      <Flex
        bg="white"
        w="800px"
        h="450px"
        p="2"
        borderRadius="15px"
        alignItems="center"
        direction="column"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.609941491696!2d106.80769431524128!3d10.841132860959375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1666594851549!5m2!1sen!2s"
          width="100%"
          height="80%"
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
        {/* // eslint-disable-next-line */}
        <Text as="b" fontSize="3xl" mt="4">
          FPT University
        </Text>
        <Flex w="100%" px="4" alignItems="center">
          <Avatar src={event?.user_joined[0]?.avatar_url} h="50px" w="50px" />
          {event?.user_joined[1] !== undefined ? (
            <Avatar
              src={event?.user_joined[1]?.avatar_url}
              h="50px"
              w="50px"
              style={{ position: "relative", left: "-10px" }}
            />
          ) : (
            <></>
          )}
          {event?.user_joined[2] !== undefined ? (
            <Avatar
              src={event?.user_joined[2]?.avatar_url}
              h="50px"
              w="50px"
              style={{ position: "relative", left: "-20px" }}
            />
          ) : (
            <></>
          )}
          <Text onClick={onOpen} cursor="pointer" ml="2">
            {event?.user_joined.length} Participants
          </Text>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Friends</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box height="400px" overflowY="scroll" p="4">
                  {event?.user_joined.map((user_joined) => {
                    return (
                      <Flex
                        alignItems="center"
                        my="2"
                        justifyContent="space-between"
                      >
                        <Flex
                          alignItems="center"
                          flexDirection="row"
                          justifyContent="space-between"
                          w="100%"
                        >
                          <AvatarUser m={[2, 2]} user={user_joined} />
                          {user?._id === user_joined?._id ? (
                            <Button
                              onClick={() => {
                                unJoinEvent();
                              }}
                            >
                              UnJoin
                            </Button>
                          ) : (
                            <></>
                          )}
                        </Flex>
                      </Flex>
                    );
                  })}
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
      <Button
        w="800px"
        mt="4"
        bg="white"
        _hover={{ bg: "#ebedf0" }}
        onClick={() => {
          joinEvent();
        }}
      >
        <Text m="4">Join</Text>
      </Button>
    </Flex>
  );
};

export default Event;
