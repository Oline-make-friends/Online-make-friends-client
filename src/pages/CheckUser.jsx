import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Center,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { TiDelete, TiTick } from "react-icons/ti";
import { AiFillSetting } from "react-icons/ai";
import { GrStatusGoodSmall } from "react-icons/gr";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckUser = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const handleGetUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/user/getAllProveAccount`
      );
      setUserList(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get list fail");
    }
  };
  useEffect(() => {
    handleGetUsers();
    // eslint-disable-next-line
  }, []);

  const handleStatusUser = async (id) => {
    try {
      await axios.post(`http://localhost:8000/user/blockUser/${id}`);
      await axios.post(`http://localhost:8000/user/proveUser/${id}`);
      handleGetUsers();
    } catch (error) {
      toast("check user information");
    }
  };

  const ModalImage = ({ url }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button onClick={onOpen} cursor="pointer">
          Show Image
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Image prove</ModalHeader>
            <ModalCloseButton />
            <ModalBody alignItems="center">
              <Image src={url} height="100%" width="100%" />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  return (
    <Box
      style={{
        overflow: "scroll",
        height: "800px",
        width: "100%",
        color: "white",
      }}
    >
      <Flex direction="row" align="center" justify="start" width="100%">
        <Text
          fontSize="4xl"
          style={{ fontWeight: "bold", color: "black" }}
          ml="40px"
        >
          Manage User
        </Text>
      </Flex>
      <TableContainer
        style={{ color: "black" }}
        bg="white"
        m="4"
        borderRadius="20px"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Date create</Th>
              <Th>Image prove</Th>
              <Th>Status</Th>
              <Th>Status prove</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userList?.map((user, index) => {
              return (
                <Tr key={user._id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Flex>
                      <Avatar
                        m={[2, 2]}
                        name="Dan Abrahmov"
                        src={user?.avatar_url}
                      />
                      <Center
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Text>
                          <b>{user.fullname}</b>
                        </Text>
                      </Center>
                    </Flex>
                  </Td>
                  <Td>{user.createdAt.substring(0, 10)}</Td>
                  <Td>
                    <ModalImage url={user?.proveImage_url} />
                  </Td>
                  <Td>
                    <Flex align="center">
                      {user.is_active === true ? (
                        <GrStatusGoodSmall
                          size={12}
                          style={{ color: "green" }}
                        />
                      ) : (
                        <GrStatusGoodSmall size={12} style={{ color: "red" }} />
                      )}

                      <Text mx="1">
                        {user.is_active === true ? "Active" : "Not active"}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center">
                      {user.is_prove === true ? (
                        <GrStatusGoodSmall
                          size={12}
                          style={{ color: "green" }}
                        />
                      ) : (
                        <GrStatusGoodSmall size={12} style={{ color: "red" }} />
                      )}

                      <Text mx="1">
                        {user.is_active === true ? "Yes" : "Not yet"}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex>
                      <Link>
                        <AiFillSetting
                          size={30}
                          style={{ color: "#0076f6" }}
                          onClick={() => {
                            navigate("/profile/" + user._id);
                          }}
                        />
                      </Link>

                      {user.is_active === true ? (
                        <TiDelete
                          size={30}
                          style={{ color: "red" }}
                          onClick={() => handleStatusUser(user._id)}
                          cursor="pointer"
                        />
                      ) : (
                        <TiTick
                          size={30}
                          style={{ color: "green" }}
                          onClick={() => handleStatusUser(user._id)}
                          cursor="pointer"
                        />
                      )}
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CheckUser;
