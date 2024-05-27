import FormRegister from "../components/FormRegister";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { errorAlertWithMessage, successAlert } from "../helper/alert";
import api from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const onRegister = async (values) => {
    try {
      const data = {
        name: values.name,
        username: values.username,
        birthdate: values.birthdate,
        gender: values.gender,
        phone: values.phone,
        email: values.email,
        password: values.password,
        confirmation: values.confirmation,
        addres: values.addres,
        location: values.location,
      };
      console.log("ini data", data);
      const res = await api.post(`/auth/register`, data);

      successAlert(res.data.message);
      navigate("/login");

      console.log("res ini", res);
    } catch (error) {
      errorAlertWithMessage(error.response.data.message);
      console.log("err", error);
    }
  };

  return (
    <div>
      <div>
        <FormRegister onRegister={onRegister} />
      </div>
    </div>
  );
};
export default Register;
