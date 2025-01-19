import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { refetch, isLoading, data: userInfo = [] } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    });

    return [userInfo, refetch, isLoading];

};

export default useUser;