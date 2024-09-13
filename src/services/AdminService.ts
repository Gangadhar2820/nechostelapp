import axios from "axios";
import { Incharge } from "../components/interfaces/Incharge";
import { Student } from "../components/interfaces/Student";
import { LOG } from "../components/interfaces/Log";
import { Admin } from "../components/interfaces/Admin";

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

export const getAllAdmins = async ()=>{
  try{
    const response = await axios.get(`${server}/admin/getAdmins`);
    return response.data;

  }catch(error){
    console.log("Error : While getting all admins data",error)
  }
}

export const updateAdmin = async (admin: Admin) => {
  try {
    const response = await axios.put(
      `${server}/admin/update/${admin.eid}`,
      admin,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error : while Updating Admin details", error);
  }
};

export const deleteAdmin = async (eid: string) => {
  try {
    const response = await axios.delete(`${server}/admin/delete/${eid}`);
    return response.data;
  } catch (error) {
    console.log("Error : while Deleting Admin details", error);
  }
};

export const UpdateMultipleStudents = async (rollNumbers:string[],year:string)=>{

  try {
    const response = await axios.put(`${server}/student/updateMany`,{rollNumbers:rollNumbers,year:year},{
      headers:{
        "Content-Type":"application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error : while Updating  Multiple students", error);
  }

}

export const DeleteMultipleStudents = async (rollNumbers:string[]) => {
  try {
    const response = await axios.delete(`${server}/student/deleteMany`,
      {data:{rollNumbers:rollNumbers},headers:{"Content-Type":"application/json"}});
    return response.data;
  } catch (error) {
    console.log("Error : while Deleting Multiple students", error);
  }
};

export const FetchFacultyData = async ()=>{
  try{
    const response = await axios.get(`${server}/faculty/get`);
    return response.data;
  }catch(error){
    console.log("Error : While fetching faculty credentials",error)
  }
}

export const UpdateFacultyData = async (username:string,password:string)=>{

  try {
    const response = await axios.put(`${server}/faculty/update`,{username:username,password:password},{
      headers:{
        "Content-Type":"application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error : while Updating  Faculty data", error);
  }

}

export const deleteLogs = async () => {
  try {
    const response = await axios.delete(`${server}/logs/delete-logs`);
    return response.data;
  } catch (error) {
    console.log("Error : while Deleting Logs", error);
  }
};

export {};
