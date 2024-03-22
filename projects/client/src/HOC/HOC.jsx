import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../api/api";

import Spinner from "../components/Spinner";
import { login } from "../reducer/userSlice";

export default function HOC({ children }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        const user = await api
          .get("/auth/v1/" + token)
          .then((res) => res.data.user);

        dispatch(login(user));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [dispatch]);

  if (isLoading) return <Spinner />;
  return children;
}
