import { Leave, Permission } from "./Request";

export interface Student{

    hostelId:"BH1" | "GH1" | string,
    rollNo:string,
    name:string,
    college:"NEC" | "NIPS" | string,
    year:1|2|3|4|number,
    branch:"CSE" | "ECE" | "EEE" | "MECH" | "CIVIL" | "MBA" | string,
    gender:"MALE" | "FEMALE" | "OTHER" | string,
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