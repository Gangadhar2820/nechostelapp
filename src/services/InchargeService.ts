import axios from "axios"
import { updateStudentProfile } from "./StudentService";

// const server = "http://192.168.14.124:5000";
// const server = "http://192.168.129.51:5000"


const server = "https://hostelportal-backend.onrender.com"


export const getIncharge = async (eid:string)=>{
    try{
        const response = await axios.get(`${server}/incharge/${eid}`);
        return response.data
    }catch(error){
        console.log("Error : while getting Incharge details",error)
    }
}

export const getAllStudents = async (data:any)=>{
    try{
        const response =await  axios.post(`${server}/student/getAll`,data,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return response.data
    }catch(error){
        console.log("Error : while getting All students details",error)
    }
}


export const getPendingRequests = async (hostelId:string)=>{
    try{
        const response =await  axios.get(`${server}/requests/pending/${hostelId}`);
        return response.data
    }catch(error){
        console.log("Error : while getting Pending Requests",error)
    }
}

export const AcceptORRejectRequest = async (id:string,data:any)=>{
    await updateStudentProfile(data.rollNo,data,(data.status==="ACCEPTED"?data.type.toUpperCase():"HOSTEL"))
    try{
        const response =await  axios.post(`${server}/requests/approve/${id}`,data,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return response.data
    }catch(error){
        console.log("Error : while updating Pending Requests",error)
    }
}


export const getActiveRequests = async (hostelId:string)=>{
    try{
        const response =await  axios.get(`${server}/requests/activeRequest/${hostelId}`);
        return response.data
    }catch(error){
        console.log("Error : while getting Active Requests",error)
    }
}

export const ArriveRequest = async (id:string,data:any)=>{
    await updateStudentProfile(data.rollNo,data,"HOSTEL")

    try{
        const response =await  axios.post(`${server}/requests/arrive/${id}`,data,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return response.data
    }catch(error){
        console.log("Error : while updating Arrive Requests",error)
    }
}

export const getArrivedRequests = async (hostelId:string,startDate:Date,endDate:Date)=>{
    try{
        const response =await  axios.post(`${server}/requests/getArrivedRequests/${hostelId}`,{startDate:startDate,endDate:endDate},{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return response.data
    }catch(error){
        console.log("Error : while getting Arrive Requests",error)
    }

}

export const getTotalHostelStats = async (hostelId:string)=>{
    try{
        const response = await axios.get(`${server}/student/get/counts/${hostelId}`);
        return response.data;
    }catch(error){
        console.log("Error : while getting hostel statistics",error)
    }
}

export const getTodayHostelStats = async (hostelId:string)=>{
    try{
        const response = await axios.get(`${server}/requests/getTodayrequests/${hostelId}`);
        return response.data;
    }catch(error){
        console.log("Error : while getting Today hostel statistics",error)
    }
}


export {}