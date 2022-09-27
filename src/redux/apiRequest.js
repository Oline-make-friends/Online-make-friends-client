import axios from "axios";
import { loginFail, loginStart, loginSuccess, logOut } from "./authSlice";

export const loginUser = async (user, dispatch, navigate, toast) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/auth/login", user);
    dispatch(loginSuccess(res.data));
    toast.success("Login success!");
    navigate("/profile");
  } catch (error) {
    dispatch(loginFail());
    toast.error("Check username and password");
  }
};

export const logOutUser = (dispatch) => {
  try {
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
