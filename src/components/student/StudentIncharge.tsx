import { Card } from "primereact/card";
import React, { useEffect } from "react";
import InchargeCard from "./InchargeCard";
import { Incharge as INCHARGE } from "../interfaces/Incharge";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../utils/AuthProvider";

function StudentIncharge() {

  const Navigate = useNavigate();
  const {setUser} = useAuth();

  useEffect(()=>{
    // localStorage.removeItem("sessionToken");
    setUser(null);
    // Navigate("/",{replace:true})
    
  },[])


  const incList:INCHARGE[] = [
    {eid:"521",name:"Gangadhar",phoneNo:"9988776655",designation:"--",hostelId:"BH1"},
    {eid:"522",name:"Gangadhar",phoneNo:"9988776655",designation:"--",hostelId:"BH1"},
    {eid:"523",name:"Gangadhar",phoneNo:"9988776655",designation:"--",hostelId:"BH1"},
    {eid:"524",name:"Gangadhar",phoneNo:"9988776655",designation:"--",hostelId:"BH1"},
  ]
  return (
    <>
      <div
        className="p-2 w-12 mt-2"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Hostel Incharges" className="pt-2 pb-2">
          <div className="grid">
          {incList.map((incharge)=>{return (
            <div key={incharge.eid} className="col-12 sm:col-6">
            <InchargeCard  incharge={incharge} showId={false}/>
            </div>
            )
            
            })}
          </div>
        </Card>
      </div>
    </>
  );
}

export default StudentIncharge;
