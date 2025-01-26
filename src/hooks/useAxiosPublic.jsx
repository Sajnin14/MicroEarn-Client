import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pico-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;