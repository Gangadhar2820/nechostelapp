import { Card } from "primereact/card";
import React from "react";

function InchargeCard() {
  return (
    <>
      <div className="card flex justify-content-center w-full">
        <Card className="w-full">
          <div className="grid">
            <div className="col-12 sm:col-4">
              <img
                alt="Card"
                src="/images/Avatar.jpg"
                className=""
                style={{ height: "98px", width: "88px" }}
              />
            </div>

            <div className="col-12 sm:col-8">
              <div className="flex align-items-center  justify-content-start mt-2">
                <div className="text-500 font-bold font-medium w-6">
                    <i className="pi pi-id-card"></i>&nbsp;&nbsp;
                  Name
                </div>
                <div className="text-900 font-bold w-6">Gangadhar Rongala</div>
              </div>
              <div className="flex align-items-center  justify-content-start mt-2">
                <div className="text-500 font-bold font-medium w-6">
                <i className="pi pi-phone"></i>&nbsp;&nbsp;

                  Contact
                </div>
                <div className="text-900 font-bold w-6">9988776655</div>
              </div>
              <div className="flex align-items-center  justify-content-start mt-2">
                <div className="text-500 font-bold font-medium w-6">
                <i className="pi pi-building"></i>&nbsp;&nbsp;

                  Hostel ID
                </div>
                <div className="text-900 font-bold w-6">BH1</div>
              </div>
              <div className="flex align-items-center  justify-content-start mt-2">
                <div className="text-500 font-bold font-medium w-6">
                <i className="pi pi-map-marker"></i>&nbsp;&nbsp;

                  Designation
                </div>
                <div className="text-900 font-bold w-6">--</div>
              </div>
            </div>
            
          </div>
        </Card>
      </div>
    </>
  );
}

export default InchargeCard;
