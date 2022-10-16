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
  Spinner,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginByGmail } from "../../redux/apiRequest";
import { format } from "date-fns";
import { TiDeleteOutline } from "react-icons/ti";
import { baseURL } from "../../utils/api";

export default function Updateprofile() {
  const user = useSelector((state) => state.auth?.login.currentUser);
  const dispatch = useDispatch();
  console.log(user);

  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar_url);

  const [fullname, setFullname] = useState(user?.fullname);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);
  const [location, setLocation] = useState(user?.location);
  const [major, setMajor] = useState(user?.major);
  const [interest, setInterest] = useState("");
  const [dob, setDob] = useState(user?.date_of_birth);
  const [loading, setLoading] = useState(false);

  const updateAvatar = async (avatarURL) => {
    try {
      await axios.post(`${baseURL}user/update/${user._id}`, {
        avatar_url: avatarURL,
      });
      setAvatar(avatarURL);
      loginByGmail(user.username, dispatch, null, null);
      toast.success("change avatar success");
    } catch (error) {
      toast.error("change avatar fail");
    }
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
      setLoading(true);
      axios
        .post(
          "https://api.cloudinary.com/v1_1/mklaaicogido123/image/upload",
          formData
        )
        .then((response) => {
          // setUrl(response.data.url);
          // setAvatar(response.data.url);
          setLoading(false);
          updateAvatar(response.data.url);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else {
      toast.error("choice image before change");
    }
  };

  const updateProfile = async () => {
    try {
      await axios.post(`${baseURL}user/update/${user._id}`, {
        fullname: fullname,
        about: about,
        gender: gender,
        location: location,
        major: major,
        date_of_birth: dob,
      });
      loginByGmail(user.username, dispatch, null, null);
      toast.success("Update profile success");
    } catch (error) {
      toast.error("Update profile fail fail");
    }
  };

  const removeInterest = async (value) => {
    try {
      await axios.post(`${baseURL}user/removeInterest/${user._id}`, {
        interest: value,
      });
      loginByGmail(user.username, dispatch, null, null);
      toast.success("Update profile success");
    } catch (error) {
      toast.error("Update profile fail");
    }
  };

  const addInterest = async (value) => {
    try {
      await axios.post(`${baseURL}user/addInterest/${user._id}`, {
        interest: value,
      });
      loginByGmail(user.username, dispatch, null, null);
      toast.success("Update profile success");
    } catch (error) {
      toast.error("Update profile fail");
    }
  };
  const removeSelectedImage = () => {
    setImage();
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
          {image && (
            <div>
              <Image
                src={URL.createObjectURL(image)}
                w="400px"
                h="400px"
                alt="Thumb"
              />
              <Button onClick={removeSelectedImage}>Remove This Image</Button>
            </div>
          )}
          <Button onClick={uploadImage}>change avatar</Button>
        </Box>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          ""
        )}
        <br></br>
        <FormControl mt="2">
          <FormLabel>Full name</FormLabel>
          <Input
            type="email"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>About</FormLabel>
          <Textarea
            // value={value}
            // onChange={handleInputChange}
            placeholder=""
            size="sm"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Date of birth</FormLabel>
          <Box border="1px" w="30%">
            <DatePicker
              value={dob}
              onChange={(date) => {
                const dResult = new Date(date);
                const result = format(dResult, "MM-dd-yyyy");
                setDob(result);
              }}
            />
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            border="1px"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Major</FormLabel>
          <Input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Interest</FormLabel>
          <Box style={{ minWidth: "100%" }}>
            {user?.interrests?.map((interest, index) => {
              return (
                <Button
                  border="1px"
                  key={index}
                  _hover={{
                    bg: "gray",
                    color: "white",
                  }}
                  m="2"
                  onClick={() => {
                    removeInterest(interest);
                  }}
                >
                  {interest}{" "}
                  <TiDeleteOutline size={20} style={{ marginLeft: "5px" }} />
                </Button>
              );
            })}
          </Box>
          <Input
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          ></Input>
          <Box w="50%">
            <Button
              w="100%"
              onClick={() => {
                addInterest(interest);
                setInterest("");
              }}
              m="4"
            >
              Add interest
            </Button>
          </Box>
        </FormControl>
        <Button onClick={updateProfile} m="4">
          Update
        </Button>
      </Box>
    </Flex>
  );
}
