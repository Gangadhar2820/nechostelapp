import { Card } from "primereact/card";
import React, {  useEffect, useState } from "react";
import { getTodayHostelStats, getTotalHostelStats } from "../../services/InchargeService";
import { Chip } from "primereact/chip";
// import { InchargeContext } from "./InchargeHome";

interface TotalCount {
  hostel: number;
  permissions: number;
  leaves: number;
  total: number;
}

interface TodayStats{
  leaves:number,
  permissions:number,
  total:number
}

function AdminDashboard() {

 
  const [BH1TotalStats, setBH1TotalStats] = useState<TotalCount | null>(null);
  const [GH1TotalStats, setGH1TotalStats] = useState<TotalCount | null>(null);

  const [BH1TodayStats, setBH1TodayStats] = useState<TodayStats | null>(null);
  const [GH1TodayStats, setGH1TodayStats] = useState<TodayStats | null>(null);



  useEffect(() => {
    getTotalHostelStats("BH1")
      .then((data) => {
        setBH1TotalStats({
          hostel: data.hostel,
          permissions: data.permission,
          leaves: data.leave,
          total: data.total,
        });
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });

    getTotalHostelStats("GH1")
      .then((data) => {
        setGH1TotalStats({
          hostel: data.hostel,
          permissions: data.permission,
          leaves: data.leave,
          total: data.total,
        });
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });

      getTodayHostelStats("BH1").then((data)=>{
        setBH1TodayStats({leaves:data.leave,permissions:data.permission,total:data.total})
      })

      getTodayHostelStats("GH1").then((data)=>{
        setGH1TodayStats({leaves:data.leave,permissions:data.permission,total:data.total})
      })
      
  }, []);

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
        <div className="p-card grid mt-1 p-0">
          <div className="col-12 flex align-items-center justify-content-center">
            <Chip
              label="Boys Hostel (BH1)"
              className="bg-primary mt-2"
              icon="pi pi-circle-fill"
            />
          </div>
          <Card header={todayCardHeader} className=" col-12 sm:col-6 lg:col-4 ">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Permissions
              </div>
              <div className="text-900 font-bold m-1">{BH1TodayStats?.permissions}</div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">Leaves</div>
              <div className="text-900 font-bold m-1">{BH1TodayStats?.leaves}</div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">{BH1TodayStats?.total}</div>
            </div>
          </Card>
          
          <Card header={studentCardHeader} className="col-12 sm:col-6 lg:col-4">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                In Hostel
              </div>
              <div className="text-900 font-bold m-1">
                {BH1TotalStats?.hostel}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                On Permission
              </div>
              <div className="text-900 font-bold m-1">
                {BH1TotalStats?.permissions}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">On Leave</div>
              <div className="text-900 font-bold m-1">
                {BH1TotalStats?.leaves}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">
                {BH1TotalStats?.total}
              </div>
            </div>
          </Card>
        </div>

        <div className="p-card grid mt-2 p-0">
          <div className="col-12 flex align-items-center justify-content-center">
            <Chip
              label="Girls Hostel (GH1)"
              className="bg-primary mt-2"
              icon="pi pi-circle-fill"
            />
          </div>
          <Card header={todayCardHeader} className=" col-12 sm:col-6 lg:col-4 ">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Permissions
              </div>
              <div className="text-900 font-bold m-1">{GH1TodayStats?.permissions}</div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">Leaves</div>
              <div className="text-900 font-bold m-1">{GH1TodayStats?.permissions}</div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">{GH1TodayStats?.permissions}</div>
            </div>
          </Card>
          
          <Card header={studentCardHeader} className="col-12 sm:col-6 lg:col-4">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                In Hostel
              </div>
              <div className="text-900 font-bold m-1">
                {GH1TotalStats?.hostel}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                On Permission
              </div>
              <div className="text-900 font-bold m-1">
                {GH1TotalStats?.permissions}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">On Leave</div>
              <div className="text-900 font-bold m-1">
                {GH1TotalStats?.leaves}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">
                {GH1TotalStats?.total}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
