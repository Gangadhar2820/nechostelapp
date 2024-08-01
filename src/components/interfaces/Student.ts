import { Leave, Permission } from "./Request";

export interface Student{

    hostelId:"BH1" | "GH1",
    rollNo:string,
    name:string,
    college:"NEC" | "NIPS",
    year:1|2|3|4,
    branch:"CSE" | "ECE" | "EEE" | "MECH" | "CIVIL" | "MBA",
    gender:"MALE" | "FEMALE" | "OTHER",
    dob:Date,
    phoneNo:string,
    email:string,
    parentName:string,
    parentPhoneNo:string,
    currentStatus:"HOSTEL" | "PERMISSION" | "LEAVE",
    requestCount:number,
    lastRequest:Permission|Leave|null,
}

export  {}