import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Select,
  Text,
  Textarea,
  Image,
  Button,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginByGmail } from "../../redux/apiRequest";

export default function Updateprofile() {
  const user = useSelector((state) => state.auth?.login.currentUser);
  const dispatch = useDispatch();
  console.log(user.username);
  const [startDate, setStartDate] = useState(new Date());
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar_url);

  const updateAvatar = async (avatarURL) => {
    try {
      await axios.post(`http://localhost:8000/user/update/${user._id}`, {
        avatar_url: avatarURL,
      });
      setAvatar(avatarURL);
      loginByGmail(user.username, dispatch, null, toast);
      toast.success("change avatar success");
    } catch (error) {}
  };

  const uploadImage = (e) => {
    e.preventDefault();
    if (image) {
      // Tạo một form data chứa dữ liệu gửi lên
      const formData = new FormData();
      // Hình ảnh cần upload
      formData.append("file", image);
      // Tên preset vừa tạo ở bước 1
      formData.append("upload_preset", "oi7qyalz");
      // Tải ảnh lên cloudinary
      // API: https://api.cloudinary.com/v1_1/{Cloudinary-Name}/image/upload
      axios
        .post(
          "https://api.cloudinary.com/v1_1/mklaaicogido123/image/upload",
          formData
        )
        .then((response) => {
          // setUrl(response.data.url);
          // setAvatar(response.data.url);
          updateAvatar(response.data.url);
        })
        .catch((err) => console.error(err));
    } else {
      toast.error("choice image before change");
    }
  };

  return (
    <Flex alignItems="start" justifyContent="center" p="4">
      <br />
      <Box
        w="50vw"
        color="black"
        backgroundColor="white"
        m="4"
        p="4"
        borderRadius="10px"
      >
        <Text fontSize="6xl">Update your profile</Text>

        <Box>
          <Image src={avatar} alt="Avatar" />
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <Button onClick={uploadImage}>change avatar</Button>
        </Box>
        <br></br>
        <FormControl mt="2">
          <FormLabel>Full name</FormLabel>
          <Input type="email" />
        </FormControl>

        <FormControl>
          <FormLabel>About</FormLabel>
          <Textarea
            // value={value}
            // onChange={handleInputChange}
            placeholder=""
            size="sm"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Date of birth</FormLabel>
          <Box border="1px" w="30%">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            border="1px"
            // value={gender}
            // onChange={(e) => {
            //   setGender(e.target.value);
            // }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Major</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Interest</FormLabel>
          <Input type="text" />
        </FormControl>
      </Box>
    </Flex>
  );
}
