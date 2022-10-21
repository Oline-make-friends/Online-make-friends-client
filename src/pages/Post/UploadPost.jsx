import React, { useState } from "react";
import axios from "axios";
import { Box, Flex, Text, Textarea, Spinner, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UploadPost = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.login.currentUser);
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
          handleUploadPost(response.data.url);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else {
      toast.error("choice image before upload");
    }
  };
  const handleUploadPost = async (url) => {
    try {
      await axios.post("http://localhost:8000/post/add", {
        created_by: user._id,
        content: description,
        imageUrl: url,
      });
      setDescription("");
      toast.success("Upload success");
      navigate("/profile");
    } catch (error) {
      toast.error("upload fail, check again");
    }
  };

  return (
    <Flex justifyContent="center" w="100vw" h="99vh">
      <Flex
        alignItems="center"
        w="80%"
        minHeight="100%"
        bg="white"
        direction="column"
        justifyContent="center"
        padding="20px"
      >
        <Text fontSize="6xl">Upload post</Text>
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
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          m="4"
          p="4"
        />
        <Button
          onClick={() => {
            uploadImage();
          }}
        >
          Upload
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
      </Flex>
    </Flex>
  );
};

export default UploadPost;

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
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
