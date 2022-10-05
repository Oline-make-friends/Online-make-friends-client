import axios from "axios";
import { loginFail, loginStart, loginSuccess, logOut } from "./authSlice";
import { CometChat } from "@cometchat-pro/chat";

export const loginUser = async (user, dispatch, navigate, toast) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/auth/login", user);
    dispatch(loginSuccess(res.data));
    CometChat.login(
      "6335a9c9a66b7ceb017988ba",
      "6e29092985743855d31852a40ad9d8aa9a3dd6d9"
    )
      .then(console.log("Login success"))
      .catch(console.log("Login fail"));
    toast.success("Login success!");
    navigate("/profile");
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
    dispatch(loginSuccess(res.data));
    navigate("/profile");
  } catch (error) {
    dispatch(loginFail());
    toast.error(error.message);
  }
};

export const logOutUser = (dispatch) => {
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
