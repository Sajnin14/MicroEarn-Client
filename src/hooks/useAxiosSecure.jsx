import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://pico-server.vercel.app'
})

const useAxiosSecure = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`
       return config;
    }, function(error){
        return Promise.reject(error);
    } )

    axiosSecure.interceptors.response.use(function(response){
        return(response);
    }, async(error) => {
        const status = error.response.status;
        if(status === 401 || status === 400 || status === 403){
            await logout();
            navigate('/login')
        }
        return Promise.reject(error) ;
    })


    return axiosSecure;
};

export default useAxiosSecure;