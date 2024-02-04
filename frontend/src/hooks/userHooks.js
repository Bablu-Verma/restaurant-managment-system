// utils/auth.js
import cookie from "js-cookie";
import { useState, useEffect } from "react";

export const useUserToken = () => {
  const [userToken, setUserToken] = useState(null);
  const TOKEN_COOKIE_NAME = "resturent_user_token";
  useEffect(() => {
    const tokenFromCookie = cookie.get(TOKEN_COOKIE_NAME);
    if (tokenFromCookie) {
      setUserToken(tokenFromCookie);
    }
  }, []);

  return {
    userToken,
  };
};



export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const USER_DATA_COOKIE_NAME = "resturent_user_data";
  useEffect(() => {
    const userdataFromCookie = cookie.get(USER_DATA_COOKIE_NAME);
    if (userdataFromCookie) {
      setUserData(JSON.parse(userdataFromCookie));
    }
  }, []);

  return {
    userData,
  };
};
