import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import AvatarUser from "../AvatarUser";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export default function FriendRequest({ listRequest }) {
  const accept = async (sender_id, receiver_id) => {
    try {
      await axios.post("http://localhost:8000/user/addFriend", {
        sender_id: sender_id,
        receiver_id: receiver_id,
      });

      toast.success("success");
    } catch (error) {
      toast.error("fail");
      console.log(error.message);
    }
  };
  return (
    <Menu mx="4">
      <MenuButton>Friend request</MenuButton>
      <MenuList bg="black" color="white">
        {/* <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem> */}
        {listRequest?.map((request) => {
          return (
            <MenuItem key={request?._id} p="2">
              <AvatarUser user={request?.sender_id} />
              <Text>{request?.sender_id?.fullname}</Text>
              <Button
                onClick={() =>
                  accept(request?.sender_id?._id, request?.receiver_id)
                }
              >
                Accept
              </Button>
              <Button onClick={() => console.log("decline")}>Decline</Button>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
