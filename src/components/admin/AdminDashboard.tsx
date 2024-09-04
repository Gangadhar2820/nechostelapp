import { Card } from "primereact/card";
import React, {  useEffect, useState } from "react";
import { getTodayAcceptedHostelStats, getTotalHostelStats,getTodayArrivedHostelStats } from "../../services/InchargeService";
import { Chip } from "primereact/chip";
import { Button } from "primereact/button";
import { Leave, Permission } from "../interfaces/Request";
import { Dialog } from "primereact/dialog";
import TodayRequestsView from "../incharge/TodayRequestsView";
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
  total:number,
  leavesList:[],
  permissionsList:[]
}

function AdminDashboard() {

 
  const [BH1TotalStats, setBH1TotalStats] = useState<TotalCount | null>(null);
  const [GH1TotalStats, setGH1TotalStats] = useState<TotalCount | null>(null);

  const [BH1TodayAcceptedStats, setBH1TodayAcceptedStats] = useState<TodayStats | null>(null);
  const [GH1TodayAcceptedStats, setGH1TodayAcceptedStats] = useState<TodayStats | null>(null);

  const [BH1TodayArrivedStats, setBH1TodayArrivedStats] = useState<TodayStats | null>(null);
  const [GH1TodayArrivedStats, setGH1TodayArrivedStats] = useState<TodayStats | null>(null);

  const [showDialog,setShowDialog] = useState<boolean>(false);

  const [activePermissionList,setActivePermissionList] = useState<Permission[]>([]);
  const [activeLeaveList,setActiveLeaveList] = useState<Leave[]>([]);

  const [title,setTitle] = useState<string>("");

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

      getTodayAcceptedHostelStats("BH1").then((data)=>{
        setBH1TodayAcceptedStats({leaves:data.leave,permissions:data.permission,total:data.total,permissionsList:data.permissionArray,leavesList:data.leaveArray})
      })

      getTodayAcceptedHostelStats("GH1").then((data)=>{
        setGH1TodayAcceptedStats({leaves:data.leave,permissions:data.permission,total:data.total,permissionsList:data.permissionArray,leavesList:data.leaveArray})
      })

      getTodayArrivedHostelStats("BH1").then((data)=>{
        setBH1TodayArrivedStats({leaves:data.leave,permissions:data.permission,total:data.total,permissionsList:data.permissionArray,leavesList:data.leaveArray})
      })

      getTodayArrivedHostelStats("GH1").then((data)=>{
        setGH1TodayArrivedStats({leaves:data.leave,permissions:data.permission,total:data.total,permissionsList:data.permissionArray,leavesList:data.leaveArray})
      })

      
  }, []);

  const todayAcceptedCardHeader = () => {
    return <h4 className="text-center">Today Accepted Requests</h4>;
  };

  const todayAcceptedCardFooter = (hostelId:string) => {
    return (
      <>
        <Button link label="view details" onClick={()=>{
          if(hostelId==="BH1"){
          setTitle(`Today Accepted Requests (BH1)`);
          setActiveLeaveList(BH1TodayAcceptedStats?.leavesList as Leave[])
          setActivePermissionList(BH1TodayAcceptedStats?.permissionsList as Permission[])
          }else if(hostelId==="GH1"){
            setTitle(`Today Accepted Requests (GH1)`);
          setActiveLeaveList(GH1TodayAcceptedStats?.leavesList as Leave[])
          setActivePermissionList(GH1TodayAcceptedStats?.permissionsList as Permission[])
          }
          setShowDialog(true);
        }}></Button>
      </>
    );
  };

  const todayArrivedCardHeader = () => {
    return <h4 className="text-center">Today Arrived Students</h4>;
  };

  const todayArrivedCardFooter = (hostelId:string) => {
    return (
      <>
        <Button link label="view details" onClick={()=>{
          if(hostelId==="BH1"){
            setTitle(`Today Arrived Students (BH1)`);
            setActiveLeaveList(BH1TodayArrivedStats?.leavesList as Leave[])
            setActivePermissionList(BH1TodayArrivedStats?.permissionsList as Permission[])
            }else if(hostelId==="GH1"){
              setTitle(`Today Arrived Students (GH1)`);
            setActiveLeaveList(GH1TodayArrivedStats?.leavesList as Leave[])
            setActivePermissionList(GH1TodayArrivedStats?.permissionsList as Permission[])
            }
          setShowDialog(true);
        }}></Button>
      </>
    );
  };

  const studentCardHeader = () => {
    return <h4 className="text-center">Students</h4>;
  };
  return (
    <>
            <Dialog
        header={title}
        visible={showDialog}
        position="top"
        style={{ width: "50vw" }}
        onHide={() => {
          setShowDialog(false);
        }}
        className="w-11 lg:w-8"
      >
        <TodayRequestsView  permissions={activePermissionList} leaves={activeLeaveList} />
      </Dialog>
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
          
          
          <Card header={studentCardHeader}  className="col-12 sm:col-6 lg:col-4">
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
          <Card header={todayAcceptedCardHeader} footer={todayAcceptedCardFooter("BH1")} className=" col-12 sm:col-6 lg:col-4 ">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Permissions
              </div>
              <div className="text-900 font-bold m-1">{BH1TodayAcceptedStats?.permissions}</div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">Leaves</div>
              <div className="text-900 font-bold m-1">{BH1TodayAcceptedStats?.leaves}</div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">{BH1TodayAcceptedStats?.total}</div>
            </div>
          </Card>
          <Card header={todayArrivedCardHeader} footer={todayArrivedCardFooter("BH1")}  className=" col-12 sm:col-6 lg:col-4 mt-2">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Permissions
              </div>
              <div className="text-900 font-bold m-1">
                {BH1TodayArrivedStats?.permissions}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">Leaves</div>
              <div className="text-900 font-bold m-1">
                {BH1TodayArrivedStats?.leaves}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">
                {BH1TodayArrivedStats?.total}
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
          <Card header={todayAcceptedCardHeader} footer={todayAcceptedCardFooter("GH1")} className=" col-12 sm:col-6 lg:col-4 ">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Permissions
              </div>
              <div className="text-900 font-bold m-1">{GH1TodayAcceptedStats?.permissions}</div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">Leaves</div>
              <div className="text-900 font-bold m-1">{GH1TodayAcceptedStats?.permissions}</div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">{GH1TodayAcceptedStats?.permissions}</div>
            </div>
          </Card>
          <Card header={todayArrivedCardHeader} footer={todayArrivedCardFooter("GH1")} className=" col-12 sm:col-6 lg:col-4 mt-2">
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Permissions
              </div>
              <div className="text-900 font-bold m-1">
                {GH1TodayArrivedStats?.permissions}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">Leaves</div>
              <div className="text-900 font-bold m-1">
                {GH1TodayArrivedStats?.leaves}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">
                {GH1TodayArrivedStats?.total}
              </div>
            </div>
          </Card>

        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
