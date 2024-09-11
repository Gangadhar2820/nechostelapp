import axios from "axios";
import { Incharge } from "../components/interfaces/Incharge";
import { Student } from "../components/interfaces/Student";
import { LOG } from "../components/interfaces/Log";

const server = process.env.REACT_APP_SERVER;

export const getAdmin = async (eid: string) => {
  try {
    const response = await axios.get(`${server}/admin/getadmin/${eid}`);
    return response.data;
  } catch (error) {
    console.log("Error : while getting Admin details", error);
  }
};

export const updateIncharge = async (incharge: Incharge) => {
  try {
    const response = await axios.put(
      `${server}/incharge/update/${incharge.eid}`,
      incharge,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error : while Updating Incharge details", error);
  }
};

export const deleteIncharge = async (eid: string) => {
  try {
    const response = await axios.delete(`${server}/incharge/delete/${eid}`);
    return response.data;
  } catch (error) {
    console.log("Error : while Deleting Incharge details", error);
  }
};

export const UploadStudentBulkData = async (students: any) => {
  try {
    const response = await axios.post(
      `${server}/upload/addStudents`,
      students,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error : while Uploading student bulk data", error);
  }
};

export const adminUpdateStudentProfile = async (student:Student) => {

    try {
      const response = await axios.put(
        `${server}/student/update/${student.rollNo.toUpperCase()}`,student,
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
};

export const deleteStudent = async (rollNo: string) => {
  try {
    const response = await axios.delete(`${server}/student/delete/${rollNo}`);
    return response.data;
  } catch (error) {
    console.log("Error : while Deleting Student details", error);
  }
};

export const createLog = async (newLog:LOG)=>{
  try{
    const response = await axios.post(`${server}/logs/add-log`,newLog,        {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data;
  }catch(error){
    console.log("Error : while creating a log",error)

  }
}

export const getLogs = async (date: Date) => {
  try {
    const response = await axios.post(`${server}/logs/getLogs`,{date:date},{
      headers:{
        "Content-Type":"application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error : while getting Log data", error);
  }
};


export {};
