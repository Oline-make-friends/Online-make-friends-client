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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSearch, AiFillBell } from "react-icons/ai";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const handleSearch = () => {};

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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
