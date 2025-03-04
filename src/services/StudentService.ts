import axios from "axios";
import { Leave, Permission } from "../components/interfaces/Request";
import api, { getExistingToken } from "../utils/Api";

const server = process.env.REACT_APP_SERVER;

// get current
export const getStudent = async (rollNumber: string) => {
  try {
    const response = await api.get(`${server}/student/${rollNumber}`);
    return response.data;
  } catch (error) {
    console.log("Error : while fetching the Student data", error);
  }
};

export const applyRequest = async (request: Permission | Leave | null) => {
  if (request) {
    try {
      const response = await api.post(`${server}/requests`, request);
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
      const response = await api.put(
        `${server}/student/update/${rollNumber.toUpperCase()}`,
        {lastRequest:lastRequest,
          currentStatus:currentStatus,
          requestCount:requestCount}
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
    const response = await api.get(`${server}/requests/${rollNumber}`);
    return response.data;
  } catch (error) {
    console.log("Error : while fetching the Student data", error);
  }
};


export const getAllIncharges = async (hostelId:"BH1"|"GH1"|string)=>{
  try{
    const response = await api.get(`${server}/incharge/getIncharges/${hostelId}`);
    return response.data;
  }catch(error){
    console.log("Error : while fetching inchrages data",error)
  }
}

export {};
