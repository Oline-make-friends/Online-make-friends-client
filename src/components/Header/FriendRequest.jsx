import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import AvatarUser from "../AvatarUser";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserFriends } from "react-icons/fa";
import "./friendRequest.css";
import { loginByGmail } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

export default function FriendRequest({
  listRequest,
  getFriendRequest,
  user,
  socket,
}) {
  const dispatch = useDispatch();
  const accept = async (sender_id, receiver_id, request_id) => {
    try {
      await axios.post("http://localhost:8000/user/addFriend", {
        sender_id: sender_id,
        receiver_id: receiver_id,
      });
      await axios.delete(
        "http://localhost:8000/friendRequest/deleteFrRq/" + request_id
      );

      loginByGmail(user?.username, dispatch, null, null);
      toast.success("success");
      getFriendRequest();
      socket();
    } catch (error) {
      toast.error("fail");
    }
  };
  const decline = async (request_id) => {
    try {
      await axios.delete(
        "http://localhost:8000/friendRequest/deleteFrRq/" + request_id
      );

      toast.success("declined");
      getFriendRequest();
    } catch (error) {
      toast.error("fail");
    }
  };
  // useEffect(() => {}, []);

  return (
    <Menu mx="4">
      <MenuButton>
        <div className="icon">
          <FaUserFriends className="iconImg" />
          {listRequest.length === 0 ? (
            <></>
          ) : (
            <div className="counter">{listRequest.length}</div>
          )}
        </div>
      </MenuButton>
      <MenuList bg="black" color="white" minHeight="50px">
        {/* <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem> */}
        {listRequest.length === 0 ? <Text>Empty</Text> : <></>}
        {listRequest?.map((request) => {
          return (
            <MenuItem key={request?._id} p="2">
              <AvatarUser user={request?.sender_id} />
              <Button
                onClick={() =>
                  accept(
                    request?.sender_id?._id,
                    request?.receiver_id,
                    request?._id
                  )
                }
              >
                Accept
              </Button>
              <Button onClick={() => decline(request?._id)}>Decline</Button>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
