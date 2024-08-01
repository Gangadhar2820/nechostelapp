import { Card } from "primereact/card";
import React from "react";
import InchargeCard from "./InchargeCard";

function Incharge() {
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
            <div className="col-12 sm:col-6">
              <InchargeCard />
            </div>
            <div className="col-12 sm:col-6">
              <InchargeCard />
            </div>
            <div className="col-12 sm:col-6">
              <InchargeCard />
            </div>
            <div className="col-12 sm:col-6">
              <InchargeCard />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Incharge;
