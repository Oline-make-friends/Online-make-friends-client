import React, { useState } from "react";
import axios from "axios";
import { Box, Flex, Text, Textarea, Spinner, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CreateGroup = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.login.currentUser);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const uploadImage = () => {
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
          handleCreateGroup(response.data.url);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else {
      toast.error("choice image before upload");
    }
  };
  const handleCreateGroup = async (url) => {
    try {
      await axios.post("http://localhost:8000/group/add", {
        userid: user._id,
        name: name,
        content: description,
        avatar_url: url,
      });
      setDescription("");
      toast.success("Upload success");
      navigate("/allGroup");
    } catch (error) {
      toast.error("upload fail, check again");
    }
  };
  return (
    <Flex justifyContent="center" w="100vw" minHeight="99vh">
      <Flex
        alignItems="center"
        w="80%"
        minHeight="100%"
        bg="white"
        direction="column"
        justifyContent="start"
        padding="20px"
      >
        <Text fontSize="6xl">Create group</Text>
        <Text>Group image</Text>
        {image && (
          <div style={styles.preview}>
            <img
              src={URL.createObjectURL(image)}
              style={styles.image}
              alt="Thumb"
            />
            {/* <button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </button> */}
          </div>
        )}
        <Box>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </Box>
        <form style={{ width: "100%" }}>
          <Text ml="4">Name of group</Text>
          <Textarea
            value={name}
            onChange={(e) => setName(e.target.value)}
            m="4"
            p="4"
          />
          <Text ml="4">Description</Text>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            m="4"
            p="4"
          />
          <Button
            ml="4"
            onClick={() => {
              uploadImage();
            }}
          >
            Create
          </Button>
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
        </form>
      </Flex>
    </Flex>
  );
};

export default CreateGroup;

// Just some styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    height: "100vh",
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: "600px" },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
