import axios from "axios";
import { loginFail, loginStart, loginSuccess, logOut } from "./authSlice";
import { CometChat } from "@cometchat-pro/chat";
import * as CONSTANT from "../constants/constans";

export const loginUser = async (user, dispatch, navigate, toast) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/auth/login", user);
    dispatch(loginSuccess(res.data));
    CometChat.login(`${res.data?._id}`, CONSTANT.AUTH_KEY)
      .then(console.log("Login success"))
      .catch(() => {
        console.log("Login fail");
        CometChat.createUser(`${res.data?._id}`, CONSTANT.AUTH_KEY).then(() => {
          CometChat.login(`${res.data?._id}`, CONSTANT.AUTH_KEY);
        });
      });

    if (res.data === "This account has been baned") {
      return toast.error("This account is not active!!");
    }
    toast.success("Login success!");
    navigate("/allPost");
  } catch (error) {
    dispatch(loginFail());
    toast.error("Check username and password");
  }
};
export const loginByGmail = async (email, dispatch, navigate, toast) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `http://localhost:8000/auth/loginByGmail/${email}`
    );
    CometChat.login(`${res.data?._id}`, CONSTANT.AUTH_KEY)
      .then(console.log("Login success"))
      .catch(() => {
        console.log("Login fail");
        CometChat.createUser(`${res.data?._id}`, CONSTANT.AUTH_KEY).then(() => {
          CometChat.login(`${res.data?._id}`, CONSTANT.AUTH_KEY);
        });
      });

    if (res.data === "This account has been baned") {
      return toast.error("This account is not active!!");
    }
    dispatch(loginSuccess(res.data));
    navigate("/allPost");
  } catch (error) {
    dispatch(loginFail());
    toast.error(error.message);
  }
};

export const logOutUser = (dispatch, navigate) => {
  try {
    CometChat.logout().then(
      () => {
        console.log("Logout completed successfully");
      },
      (error) => {
        console.log("Logout failed with exception:", { error });
      }
    );
    dispatch(logOut());
    navigate("/");
  } catch (error) {}
};

// export const handleSendEmailResetPassword = async (toast, username) => {
//   try {
//     await axios.post(
//       `http://localhost:8000/sendMail/sendEmailResetPassword/${username}`
//     );

//     toast.success("send email success");
//   } catch (error) {
//     toast.error("can not find user");
//   }
// };
