import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// This hook redirects user based on user's authentication status
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();
  useEffect(() => {
    // This function Redirects user once compnent is mounted
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};
