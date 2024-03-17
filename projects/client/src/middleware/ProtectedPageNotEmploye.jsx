import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProtectedPageNotEmploye({
  children,
  adminOnly = false,
  needLogin = false,
}) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      adminOnly &&
      !(user?.role === "employe" || user?.role === "super admin")
    ) {
      localStorage.removeItem("token");
      return navigate("/");
    }
  }, []);

  return children;
}
