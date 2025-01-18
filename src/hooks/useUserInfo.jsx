import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUserInfo = () => {

    const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentUserInfo, setCurrentUserInfo] = useState();
  useEffect(() => {
    axiosSecure.get(`/users/${user?.email}`)
    .then(res => {
        setCurrentUserInfo(res.data);
        console.log(res.data);
      })
  },[axiosSecure, user?.email])
  
  
    return currentUserInfo;
};

export default useUserInfo;