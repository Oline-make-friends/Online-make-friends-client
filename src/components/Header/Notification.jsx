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
import { useSelector } from "react-redux";
import * as CONSTANT from "../../constants/constans";

export default function Notification({
  listNotification,
  toast,
  getNotification,
}) {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const handleDeleteNoti = async (id) => {
    try {
      await axios.post(`${CONSTANT.SERVER}/noti/delete/` + id);
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
      <MenuList
        bg="black"
        color="white"
        minHeight="50px"
        maxHeight="250px"
        overflowY="scroll"
      >
        {listNotification.length === 0 ? <Text>Empty</Text> : <></>}
        {listNotification?.map((noti) => {
          return (
            <MenuItem key={noti?._id} p="2" _hover={{ bg: "gray.800" }}>
              <Flex direction="row">
                <Text as="b">{noti?.title + " "}:</Text>
                <Text mx="1"> {noti?.content}</Text>
                {noti?.user_id?._id === user._id ? (
                  <Button bg="blue" onClick={() => handleDeleteNoti(noti?._id)}>
                    Mark as read
                  </Button>
                ) : (
                  <></>
                )}
              </Flex>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
