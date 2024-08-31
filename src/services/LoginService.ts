import axios from "axios";

// const server = "http://192.168.14.124:5000";

const server = "https://hostelportal-backend.onrender.com"

// const server = "http://192.168.129.51:5000"


export {};

const AuthenticateStudentLogin = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${server}/student-auth/login`,
      { rollNo: username, password: password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("there is some error");
  }
};

const AuthenticateInchargeLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${server}/incharge-auth/login`,
        { eid: username, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("there is some error");
    }
  };


const VerifyStuFPassMail = async (rollNo:string)=>{
  try{
    const response = await axios.get(`${server}/student/verify/${rollNo}`);

    return response.data
  }catch(err){
    console.log("Error : while verifying student roll no ",err)
  }
}

export const VerifyStuOTP = async (rollNo:string,otp:string)=>{
  try{
    const response = await axios.post(`${server}/student-auth/verifyOTP`,{rollNo:rollNo,otp:otp},{
      headers:{
        "Content-Type":"application/json"
      }
    });
    return response.data
  }catch(err){
    console.log("Error : while verifying student OTP ",err)
  }
}


const UpdateStuNewPassword = async (rollNo:string,password:string)=>{
  try{
    const response = await axios.put(`${server}/student-auth/update-password`,{rollNo:rollNo,newPassword:password},{
      headers:{
        "Content-Type":"application/json"
      }
    })

    return response.data
  }catch(err){
    console.log("Error : while updating student new password ",err)
  }
}


export const VerifyINCFPassMail = async (eid:string)=>{
  try{
    const response = await axios.get(`${server}/incharge/verify/${eid}`);
    return response.data
  }catch(err){
    console.log("Error : while verifying Incharge id ",err)
  }
}


export const VerifyINCOTP = async (eid:string,otp:string)=>{
  try{
    const response = await axios.post(`${server}/incharge-auth/verifyOTP`,{eid:eid,otp:otp},{
      headers:{
        "Content-Type":"application/json"
      }
    });
    return response.data
  }catch(err){
    console.log("Error : while verifying Incharge OTP ",err)
  }
}


export const UpdateINCNewPassword = async (eid:string,password:string)=>{
  try{
    const response = await axios.put(`${server}/incharge-auth/update-password`,{eid:eid,newPassword:password},{
      headers:{
        "Content-Type":"application/json"
      }
    })

    return response.data
  }catch(err){
    console.log("Error : while updating incharge new password ",err)
  }
}

export const AuthenticateAdminLogin = async (eid: string, password: string) => {
  try {
    const response = await axios.post(
      `${server}/admin-auth/login`,
      { eid: eid, password: password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("there is some error");
  }
};



export { AuthenticateStudentLogin , AuthenticateInchargeLogin,VerifyStuFPassMail,UpdateStuNewPassword };
