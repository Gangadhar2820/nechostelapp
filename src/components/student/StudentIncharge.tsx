import { Card } from "primereact/card";
import React, { useContext, useEffect, useState } from "react";
import InchargeCard from "./InchargeCard";
import { Incharge} from "../interfaces/Incharge";
import { useNavigate } from "react-router-dom";
import { getAllIncharges } from "../../services/StudentService";
import { StudentContext } from "./StudentHome";


function StudentIncharge() {

  const {student , setStudent} = useContext(StudentContext);

  const [incharges,setIncharges] = useState<Incharge[]>([]);

  useEffect(()=>{
    if(student){
      getAllIncharges(student?.hostelId).then((data)=>{
        setIncharges(data.incharges);
      }).catch((err)=>{
        console.log("something wrong",err)
      })
    }
  },[student])


  return (
    <>
      <div
        className=" w-12 mt-2"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Hostel Incharges" className="pt-2 pb-2">
          <div className="grid">
          {incharges.map((incharge)=>{return (
            <div key={incharge.eid} className="col-12 " >
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
