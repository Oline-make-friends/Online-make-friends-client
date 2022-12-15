import React from "react";
import {
  Flex,
  Button,
  Textarea,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AvatarUser from "../../components/AvatarUser";
import * as CONSTANT from "../../constants/constans";

const Report = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState([]);
  const sendReport = async () => {
    try {
      await axios.post(`${CONSTANT.SERVER}/report/add`, {
        sent_by: user._id,
        content: description,
      });
      toast.success("send success");
      handleGetAllReport();
      setDescription("");
    } catch (error) {
      toast.error("get notification  fail!");
    }
  };

  const handleGetAllReport = async () => {
    try {
      const res = await axios.get(
        `${CONSTANT.SERVER}/report/getUser/${user._id}`
      );
      setReports(res.data);
    } catch (error) {
      toast.error("get notification  fail!");
    }
  };
  const handleDeleteReport = async (id) => {
    try {
      await axios.post(`${CONSTANT.SERVER}/report/delete/` + id);
      handleGetAllReport();
      toast.success("Delete noti success!");
    } catch (error) {
      toast.error("get notification  fail!");
    }
  };
  useEffect(() => {
    handleGetAllReport();
    // eslint-disable-next-line
  }, []);
  return (
    <Flex
      direction="column"
      justifyContent="center"
      align="center"
      w="100vw"
      h="99vh"
    >
      {" "}
      <Box bg="white" p="40px" borderRadius="15px">
        <Text fontSize="2xl" as="b">
          Report to admin
        </Text>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={() => {
            sendReport();
          }}
          my="4"
        >
          Report to Admin
        </Button>
        <Box w="100%">
          <TableContainer
            style={{ color: "black" }}
            bg="white"
            m="2"
            borderRadius="20px"
          >
            <Text fontSize="2xl" as="b">
              Your report
            </Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>User report</Th>
                  <Th>Content</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reports?.map((report) => {
                  var d = new Date(report?.createdAt);

                  var datestring =
                    d.getDate() +
                    "-" +
                    (d.getMonth() + 1) +
                    "-" +
                    d.getFullYear() +
                    " ";
                  console.log(report);
                  if (report?.sent_by?._id === user?._id) {
                    return (
                      <Tr key={report?._id}>
                        <Td>{datestring}</Td>
                        <Td>
                          <AvatarUser user={report?.sent_by} />
                        </Td>
                        <Td>{report.content}</Td>
                        {/* <Td>{report.status === true ? "Done" : "Pending"}</Td> */}
                        {report.status === true ? (
                          <Td bg="green">Done</Td>
                        ) : (
                          <Td bg="yellow">Pending</Td>
                        )}
                        <Td>
                          <Flex>
                            <RiDeleteBin5Fill
                              onClick={() => {
                                handleDeleteReport(report._id);
                              }}
                              size={40}
                              style={{
                                background: "#dc3545",
                                padding: "10px",
                                borderRadius: "5px",
                              }}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  }
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Flex>
  );
};

export default Report;
