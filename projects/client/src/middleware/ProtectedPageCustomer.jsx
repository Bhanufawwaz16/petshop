import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPageCustomer({
  children,
  adminOnly = false,
  needLogin = false,
}) {
  const user = useSelector((state) => state.user);
  console.log("user", user);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      adminOnly &&
      !(user?.role === "employe" || user?.role === "super admin")
    ) {
      localStorage.removeItem("token");
      return navigate("/");
    } else if (needLogin && !user?.id) {
      localStorage.removeItem("token");
      return navigate("/login");
    }
  }, []);

  return children;
}
