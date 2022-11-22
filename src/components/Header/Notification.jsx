import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { MdNotifications } from "react-icons/md";
import axios from "axios";

export default function Notification({
  listNotification,
  toast,
  getNotification,
}) {
  const handleDeleteNoti = async (id) => {
    try {
      await axios.post("http://localhost:8000/noti/delete/" + id);
      getNotification();
    } catch (error) {
      console.log(error.message);
      toast.error("delete notification  fail!");
    }
  };
  return (
    <Menu mx="4">
      <MenuButton>
        <div className="icon">
          <MdNotifications className="iconImg" />
          {listNotification.length === 0 ? (
            <></>
          ) : (
            <div className="counter">{listNotification.length}</div>
          )}
        </div>
      </MenuButton>
      <MenuList bg="black" color="white" minHeight="50px">
        {listNotification.length === 0 ? <Text>Empty</Text> : <></>}
        {listNotification?.map((noti) => {
          return (
            <MenuItem key={noti?._id} p="2" _hover={{ bg: "gray.800" }}>
              <Flex direction="row">
                <Text as="b">{noti?.title + " "}:</Text>
                <Text mx="1"> {noti?.content}</Text>
                <Button bg="blue" onClick={() => handleDeleteNoti(noti?._id)}>
                  Mark as read
                </Button>
              </Flex>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
