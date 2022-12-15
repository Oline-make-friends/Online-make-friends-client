import {
  Tooltip,
  Box,
  Button,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  useDisclosure,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineSearch, AiFillBell } from "react-icons/ai";
import { toast } from "react-toastify";
import { loginByGmail } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import * as CONSTANT from "../../constants/constans";

const SideDrawer = (props) => {
  const user = props.user;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // const [loadingChat, setLoadingChat] = useState();

  const handleSearch = () => {
    if (!search) {
      toast.error("please input something");
      return;
    }
    try {
      loginByGmail(user.username, dispatch, null, null);
      const result = [];
      user.friends?.forEach((item) => {
        if (item?.fullname.toLowerCase().includes(search.toLowerCase()))
          result.push(item);
      });
      setSearchResult(result);
    } catch (error) {
      toast.error("can not find");
    }
  };

  const accessChat = async (userId) => {
    try {
      await axios.post(`${CONSTANT.SERVER}`, {
        userId,
      });
    } catch (error) {}
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="99vw"
        borderWidth="5px"
        p="10px 5px"
      >
        <Tooltip label="Search user to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen} ref={btnRef}>
            <AiOutlineSearch />
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search friend to chat
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Chat Page
        </Text>
        <Box mx="4">
          <Menu>
            <MenuButton>
              <AiFillBell size={25} />
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search user</DrawerHeader>

          <DrawerBody>
            <Flex pb={2}>
              <Input
                placeholder=" Search your friend "
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}> Go </Button>
            </Flex>
            {searchResult?.map((user) => {
              return (
                <Flex
                  my="2"
                  h="65px"
                  w="100%"
                  bg="#E8E8E8"
                  alignItems="center"
                  p="2"
                  cursor="pointer"
                  _hover={{
                    background: "#38B2AC",
                    color: "white",
                  }}
                  onClick={() => {
                    accessChat(user?._id);
                  }}
                  key={user?._id}
                >
                  <Avatar src={user?.avatar_url} />
                  <Flex flexDirection="column">
                    <Text mx="4" as="b">
                      {user?.fullname}
                    </Text>
                    <Text mx="4" fontSize="xs">
                      Email: {user?.username}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
