import axios from "axios";

const server = "http://192.168.14.124:5000";

// const server = "https://hostelportal-backend.onrender.com"

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

const AuthenticateAdminLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "https://hostelportal-backend.onrender.com/api/admins/login",
        { username: username, password: password },
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


const VerifyStuFPassMail = async (email:string)=>{
  try{
    const response = await axios.post("https://hostelportal-backend.onrender.com/api/hostler-credentials/emailvalidate",{email:email},{
      headers:{
        "Content-Type":"application/json"
      }
    })

    return response.data
  }catch(err){
    console.log("Error : ",err)
  }
}


const UpdateStuNewPassword = async (email:string,password:string)=>{
  try{
    const response = await axios.put("https://hostelportal-backend.onrender.com/api/hostler-credentials",{email:email,password:password},{
      headers:{
        "Content-Type":"application/json"
      }
    })

    return response.data
  }catch(err){
    console.log("Error : ",err)
  }
}



export { AuthenticateStudentLogin , AuthenticateAdminLogin,VerifyStuFPassMail,UpdateStuNewPassword };
