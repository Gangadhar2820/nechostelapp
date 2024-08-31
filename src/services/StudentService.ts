import axios from "axios";
import { Leave, Permission } from "../components/interfaces/Request";
import { Student } from "../components/interfaces/Student";

// const server = "http://192.168.14.124:5000";
// const server = "http://192.168.129.51:5000"

const server = "https://hostelportal-backend.onrender.com"


// get current
export const getStudent = async (rollNumber: string) => {
  try {
    const response = await axios.get(`${server}/student/${rollNumber}`);
    return response.data;
  } catch (error) {
    console.log("Error : while fetching the Student data", error);
  }
};

export const applyRequest = async (request: Permission | Leave | null) => {
  if (request) {
    try {
      const response = await axios.post(`${server}/requests`, request, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error : while uploading request", error);
    }
  } else {
    console.log("Request must not be null");
  }
};

export const updateStudentProfile = async (rollNumber:string,lastRequest: any,currentStatus:string,requestCount?:number) => {
  if (lastRequest) {

    try {
      const response = await axios.put(
        `${server}/student/update/${rollNumber.toUpperCase()}`,
        {lastRequest:lastRequest,
          currentStatus:currentStatus,
          requestCount:requestCount},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error : while updating student", error);
    }
  } else {
    console.log("Last Request must not be undefined");
  }
};


export const getStudentAllRequests = async (rollNumber: string) => {
  try {
    const response = await axios.get(`${server}/requests/${rollNumber}`);
    return response.data;
  } catch (error) {
    console.log("Error : while fetching the Student data", error);
  }
};


export const getAllIncharges = async (hostelId:"BH1"|"GH1"|string)=>{
  try{
    const response = await axios.get(`${server}/incharge/getIncharges/${hostelId}`);
    return response.data;
  }catch(error){
    console.log("Error : while fetching inchrages data",error)
  }
}

export {};
