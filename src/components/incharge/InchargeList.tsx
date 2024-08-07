import { Card } from "primereact/card";
import React from "react";
import InchargeCard from "../student/InchargeCard";
import { Incharge } from "../interfaces/Incharge";

function InchargeList() {

  const incList:Incharge[] = [
    {eid:"521",name:"Gangadhar",phoneNo:"9988776655",designation:"--",hostelId:"BH1"},
    {eid:"522",name:"Gangadhar",phoneNo:"9988776655",designation:"--",hostelId:"BH1"},
    {eid:"523",name:"Gangadhar",phoneNo:"9988776655",designation:"--",hostelId:"BH1"},
    {eid:"524",name:"Gangadhar",phoneNo:"9988776655",designation:"--",hostelId:"BH1"},
  ]
  return (
    <>
      <div
        className="p-2 w-12"
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

export default InchargeList;
