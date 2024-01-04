import { useState } from "react";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { errorAlertWithMessage, successAlert } from "../helper/alert";
import { useNavigate } from "react-router-dom";
import { login } from "../reducer/userSlice";
import api from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/login`, {
        username: username,
        password: password,
      });
      console.log("res.log", res);

      dispatch(login(res.data.userExist));
      localStorage.setItem("token", res.data.token.token);

      if (
        (res && res.data && res.data.userExist.m_role_id === 2) ||
        (res && res.data && res.data.userExist.m_role_id === 3)
      ) {
        // Jika m_role_id adalah 2, baru lakukan navigasi
        navigate("/dashboard/products");
      } else if (res && res.data && res.data.userExist.m_role_id === 1) {
        navigate("/");
      }
      successAlert(res && res.data && res.data.message ? res.data.message : "");
    } catch (error) {
      console.log("Error Login", error);
      errorAlertWithMessage(error.response.data.message);
    }
  }
  return (
    <div>
      <div>
        <LoginForm
          handleSubmit={handleSubmit}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};
export default Login;
