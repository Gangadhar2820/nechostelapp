import axios from "axios";
import { Student } from "../components/interfaces/Student";
import { Incharge } from "../components/interfaces/Incharge";

const server = process.env.REACT_APP_SERVER;

export {};

const VerifyStudentRegister = async (rollnumber: string) => {
  try {
    const response = await axios.get(
      `${server}/student/register/${rollnumber}`
    );
    return response.data;
  } catch (err) {
    console.log("error : while verifying student registeration", err);
  }
};

const RegisterStudent = async (
  rollnumber: string,
  student: Student,
  password: string
) => {
  try {
    const response = await axios.post(
      `${server}/student-auth/register-student`,
      { rollNo: rollnumber, hosteler: student, password: password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error : while registering student ", err);
  }
};

const AdminInchargeRegisteration = async (
  newIncharge:Incharge,
  password: string
) => {
  try {
    const response = await axios.post(
      `${server}/incharge/create`,
      {...newIncharge,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error : while creating new incharge", err);
  }
};

const AdminStudentRegisteration = async (newStudent:Student
) => {
  try {
    const response = await axios.post(
      `${server}/student/create`,
      {
       ...newStudent
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error : while adding new student ", err);
  }
};

export {
  VerifyStudentRegister,
  RegisterStudent,
  AdminInchargeRegisteration,
  AdminStudentRegisteration,
};
