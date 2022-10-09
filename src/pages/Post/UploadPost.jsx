import React, { useState } from "react";
import axios from "axios";
import { Box, Flex, Text, Textarea, Spinner, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UploadPost = () => {
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
      toast.error("choice image before change");
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
    } catch (error) {
      toast.error("upload fail, check again");
    }
  };

  return (
    <Flex
      alignItems="center"
      w="99vw"
      minHeight="99vh"
      bg="white"
      direction="column"
    >
      <Text>Upload post</Text>

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
  );
};

export default UploadPost;
