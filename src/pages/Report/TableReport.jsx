import React from "react";
// import { BsPencil } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function TableReport({ user }) {
  const [reports, setReports] = useState([]);
  const handleGetAllReport = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/report/getUser/${user._id}`
      );
      setReports(res.data);
    } catch (error) {
      toast.error("get notification  fail!");
    }
  };
  const handleDeleteReport = async (id) => {
    try {
      await axios.post("http://localhost:8000/report/delete/" + id);
      handleGetAllReport();
      toast.success("Delete noti success!");
    } catch (error) {
      toast.error("get notification  fail!");
    }
  };
  //   const handleStatusReport = async (id) => {
  //     try {
  //       await axios.post("http://localhost:8000/report/updateStatus/" + id);
  //       handleGetAllReport();
  //       toast.success("Delete noti success!");
  //     } catch (error) {
  //       toast.error("get notification  fail!");
  //     }
  //   };
  useEffect(() => {
    handleGetAllReport();
    // eslint-disable-next-line
  }, []);

  return (
    <Box w="100%">
      <TableContainer
        style={{ color: "black" }}
        bg="white"
        m="4"
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
              return (
                <Tr key={report?._id}>
                  <Td>{datestring}</Td>
                  <Td>{report?.sent_by?.fullname}</Td>
                  <Td>{report.content}</Td>
                  {/* <Td>{report.status === true ? "Done" : "Pending"}</Td> */}
                  {report.status === true ? (
                    <Td bg="green">Done</Td>
                  ) : (
                    <Td bg="yellow">Pending</Td>
                  )}
                  <Td>
                    <Flex>
                      {/* <BsPencil
                        onClick={() => {
                          handleStatusReport(report._id);
                        }}
                        size={40}
                        style={{
                          background: "#28a745",
                          padding: "10px",
                          borderRadius: "5px",
                          margin: "0 10px",
                        }}
                      /> */}
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
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}