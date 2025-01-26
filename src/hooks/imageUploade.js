import axios from "axios"


const imageUploadKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageUploadKey}`

export const imageUploade = async(imageData) => {
    const formData = new FormData();
    formData.append('image', imageData);
     // send image to imgbb
     const {data} = await axios.post(imageHostingApi, formData )
     const imageURL = data.data.display_url;  
     
     return imageURL;

}