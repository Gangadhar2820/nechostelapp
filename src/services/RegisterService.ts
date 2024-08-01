import axios from "axios";

export {}

const VerifyStudentRegister = async (rollnumber:string)=>{

    try{
        const response = await axios.post("https://hostelportal-backend.onrender.com/api/hostelers/validate",{RollNo:rollnumber},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        return response.data
    }catch(err){
        console.log("error :",err)
    }
}

const RegisterStudent = async (rollnumber:string,password:string)=>{

    try{
        const response = await axios.post("https://hostelportal-backend.onrender.com/api/hostler-credentials",{RollNumber:rollnumber,password:password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        return response.data;
    }catch(err){
        console.log("Error : ",err);
    }

}

const AdminInchargeRegisteration = async (hostelid:string,name:string,phoneno:string,username:string,password:string)=>{

    try{
        const response = await axios.post("https://hostelportal-backend.onrender.com/api/admins",{hostelid:hostelid,name:name,phoneNo:phoneno,username:username,password:password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        return response.data;
    }catch(err){
        console.log("Error : ",err);
    }

}


const AdminStudentRegisteration = async (rollNumber:string,hostelId:string,firstname:string,
    lastname:string,gender:string,phoneno:string,fatherName:string,fatherMobile:string,
    dateOfBirth:any,email:string,semester:string,department:string)=>{
    try{
        const response = await axios.post("https://hostelportal-backend.onrender.com/api/hostelers",{RollNo:rollNumber,hostelid:hostelId,FirstName:firstname,LastName:lastname,Semester:semester,Gender:gender,
            Department:department,PhoneNo:phoneno,FatherName:fatherName,FatherMobileNumber:fatherMobile,DOB:dateOfBirth,Email:email},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        return response.data;
    }catch(err){
        console.log("Error : ",err);
    }

}





export {VerifyStudentRegister,RegisterStudent,AdminInchargeRegisteration,AdminStudentRegisteration}