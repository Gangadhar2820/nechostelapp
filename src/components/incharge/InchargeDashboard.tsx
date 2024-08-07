import { Card } from "primereact/card";
import React from "react";

function InchargeDashboard() {
  const todayCardHeader = () => {
    return <h4 className="text-center">Today</h4>;
  };

  const studentCardHeader = () => {
    return <h4 className="text-center">Students</h4>;
  };
  return (
    <>
      <div
        className="p-0 w-full"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <div className="grid w-11 m-1 p-0">
          <Card header={todayCardHeader} className="m-1 w-12 sm:w-6 lg:w-4">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Permissions
              </div>
              <div className="text-900 font-bold m-1">10</div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Leaves
              </div>
              <div className="text-900 font-bold m-1">20</div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">
                Total
              </div>
              <div className="text-900 font-bold m-1">30</div>
            </div>
          </Card>
          <Card header={studentCardHeader} className="m-1 w-12 sm:w-6 lg:w-4">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                In Hostel
              </div>
              <div className="text-900 font-bold m-1">100</div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                On Permission
              </div>
              <div className="text-900 font-bold m-1">20</div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                On Leave
              </div>
              <div className="text-900 font-bold m-1">10</div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">
                Total
              </div>
              <div className="text-900 font-bold m-1">130</div>
            </div>
          </Card>
         
        </div>
      </div>
    </>
  );
}

export default InchargeDashboard;
