import { updateStudentProfile } from "./StudentService";
import api from "../utils/Api";


const server = process.env.REACT_APP_SERVER;

export const getIncharge = async (eid:string)=>{
    try{
        const response = await api.get(`${server}/incharge/${eid}`);
        return response.data
    }catch(error){
        console.log("Error : while getting Incharge details",error)
    }
}

export const getAllStudents = async (data:any)=>{
    try{
        const response =await  api.post(`${server}/student/getAll`,data);
        return response.data
    }catch(error){
        console.log("Error : while getting All students details",error)
    }
}


export const getPendingRequests = async (hostelId:string)=>{
    try{
        const response =await  api.get(`${server}/requests/pending/${hostelId}`);
        return response.data
    }catch(error){
        console.log("Error : while getting Pending Requests",error)
    }
}

export const AcceptORRejectRequest = async (id:string,data:any)=>{
    await updateStudentProfile(data.rollNo,data,(data.status==="ACCEPTED"?data.type.toUpperCase():"HOSTEL"))
    try{
        const response =await  api.post(`${server}/requests/approve/${id}`,data);
        return response.data
    }catch(error){
        console.log("Error : while updating Pending Requests",error)
    }
}


export const getActiveRequests = async (hostelId:string)=>{
    try{
        const response =await  api.get(`${server}/requests/activeRequest/${hostelId}`);
        return response.data
    }catch(error){
        console.log("Error : while getting Active Requests",error)
    }
}

export const ArriveRequest = async (id:string,data:any)=>{
    await updateStudentProfile(data.rollNo,data,"HOSTEL")

    try{
        const response =await  api.post(`${server}/requests/arrive/${id}`,data);
        return response.data
    }catch(error){
        console.log("Error : while updating Arrive Requests",error)
    }
}

export const getArrivedRequests = async (hostelId:string,startDate:Date,endDate:Date)=>{
    try{
        const response =await  api.post(`${server}/requests/getArrivedRequests/${hostelId}`,{startDate:startDate,endDate:endDate});
        return response.data
    }catch(error){
        console.log("Error : while getting Arrive Requests",error)
    }

}

export const getTotalHostelStats = async (hostelId:string)=>{
    try{
        const response = await api.get(`${server}/student/get/counts/${hostelId}`);
        return response.data;
    }catch(error){
        console.log("Error : while getting hostel statistics",error)
    }
}

export const getTodayAcceptedHostelStats = async (hostelId:string)=>{
    try{
        const response = await api.get(`${server}/requests/getTodayAcceptedRequests/${hostelId}`);
        return response.data;
    }catch(error){
        console.log("Error : while getting Today Accepted hostel statistics",error)
    }
}

export const getTodayArrivedHostelStats = async (hostelId:string)=>{
    try{
        const response = await api.get(`${server}/requests/getTodayArrivedRequests/${hostelId}`);
        return response.data;
    }catch(error){
        console.log("Error : while getting Today Arrived hostel statistics",error)
    }
}

export const AcceptedHistory = async (hostelId:string,startDate:Date,endDate:Date)=>{
    try{
        const response =await  api.post(`${server}/requests/getAcceptedRequests/${hostelId}`,{startDate:startDate,endDate:endDate});
        return response.data
    }catch(error){
        console.log("Error : while getting Accepted History",error)
    }
}


export const getCollegeYearWiseData = async (hostelId:string)=>{
    try{
        const response = await api.get(`${server}/student/get/countsByClg/${hostelId}`);
        return response.data;
    }catch(error){
        console.log("Error : while getting Colleges  year wise data",error)
    }
}


export {}