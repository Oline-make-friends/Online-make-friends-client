import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import AvatarUser from "../AvatarUser";
import { Button } from "react-bootstrap";

export default function FriendRequest({ listRequest }) {
  console.log(listRequest);
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
              <AvatarUser user={request.sender_id} />
              <Text>{request.sender_id.fullname}</Text>
              <Button onClick={() => console.log("accept")}>Accept</Button>
              <Button onClick={() => console.log("decline")}>Decline</Button>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
