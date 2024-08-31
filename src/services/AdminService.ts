
import axios from "axios"

// const server = "http://192.168.14.124:5000";
// const server = "http://192.168.129.51:5000"


const server = "https://hostelportal-backend.onrender.com"


export const getAdmin = async (eid:string)=>{
    try{
        const response = await axios.get(`${server}/admin/getadmin/${eid}`);
        return response.data
    }catch(error){
        console.log("Error : while getting Admin details",error)
    }
}
export {}