import { Card } from "primereact/card";
import React from "react";

function InchargeCard(props: any) {
  const { incharge , showId} = props;
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
                  <i className="pi pi-user"></i>&nbsp;&nbsp; Name
                </div>
                <div className="text-900 font-bold w-6">
                  {incharge?.name || ""}
                </div>
              </div>
              {(showId) && <div className="flex align-items-center  justify-content-start mt-2">
                <div className="text-500 font-bold font-medium w-6">
                  <i className="pi pi-id-card"></i>&nbsp;&nbsp; Id
                </div>
                <div className="text-900 font-bold w-6">
                  {incharge?.eid || ""}
                </div>
              </div>}
              <div className="flex align-items-center  justify-content-start mt-2">
                <div className="text-500 font-bold font-medium w-6">
                  <i className="pi pi-phone"></i>&nbsp;&nbsp; Contact
                </div>
                <div className="text-900 font-bold w-6">
                  {incharge?.phoneNo || ""}
                </div>
              </div>
              <div className="flex align-items-center  justify-content-start mt-2">
                <div className="text-500 font-bold font-medium w-6">
                  <i className="pi pi-building"></i>&nbsp;&nbsp; Hostel ID
                </div>
                <div className="text-900 font-bold w-6">
                  {incharge?.hostelId || ""}
                </div>
              </div>
              <div className="flex align-items-center  justify-content-start mt-2">
                <div className="text-500 font-bold font-medium w-6">
                  <i className="pi pi-map-marker"></i>&nbsp;&nbsp; Designation
                </div>
                <div className="text-900 font-bold w-6">
                  {incharge?.designation || ""}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default InchargeCard;
