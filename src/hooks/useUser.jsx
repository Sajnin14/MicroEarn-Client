import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
// import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic();

    const { refetch, isLoading, data: userInfo = [] } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            // const res = await axiosPublic.get(`/users/${user.email}`)
            return res.data;
        }
    });

    return [userInfo, refetch, isLoading];

};

export default useUser;