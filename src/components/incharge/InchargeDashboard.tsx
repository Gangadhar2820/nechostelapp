import { Card } from "primereact/card";
import React, { useContext, useEffect, useState } from "react";
import {
  getTodayAcceptedHostelStats,
  getTotalHostelStats,
  getTodayArrivedHostelStats,
} from "../../services/InchargeService";
import { InchargeContext } from "./InchargeHome";
import { Chip } from "primereact/chip";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import TodayRequestsView from "./TodayRequestsView";
import { Leave, Permission } from "../interfaces/Request";

interface TotalCount {
  hostel: number;
  permissions: number;
  leaves: number;
  total: number;
}

interface TodayStats {
  leaves: number;
  permissions: number;
  total: number;
  leavesList:[],
  permissionsList:[]
}

function InchargeDashboard() {
  const incharge = useContext(InchargeContext);

  const [totalHostelStats, setTotalHostelStats] = useState<TotalCount | null>(
    null
  );
  const [todayAcceptedHostelStats, settodayAcceptedHostelStats] =
    useState<TodayStats | null>(null);
  const [todayArrivedHostelStats, settodayArrivedHostelStats] =
    useState<TodayStats | null>(null);

  const [showDialog,setShowDialog] = useState<boolean>(false);

  const [activePermissionList,setActivePermissionList] = useState<Permission[]>([]);
  const [activeLeaveList,setActiveLeaveList] = useState<Leave[]>([]);

  const [title,setTitle] = useState<string>("");


  useEffect(() => {
    if (incharge) {
      getTotalHostelStats(incharge?.hostelId)
        .then((data) => {
          setTotalHostelStats({
            hostel: data.hostel,
            permissions: data.permission,
            leaves: data.leave,
            total: data.total,
          });
        })
        .catch((err) => {
          console.log("something went wrong", err);
        });
      getTodayAcceptedHostelStats(incharge?.hostelId).then((data) => {
        settodayAcceptedHostelStats({
          leaves: data.leave,
          permissions: data.permission,
          total: data.total,
          leavesList:data.leaveArray,
          permissionsList:data.permissionArray
        });
      });
      getTodayArrivedHostelStats(incharge?.hostelId).then((data) => {
        settodayArrivedHostelStats({
          leaves: data.leave,
          permissions: data.permission,
          total: data.total,
          leavesList:data.leaveArray,
          permissionsList:data.permissionArray
        });
      });
    }
  }, [incharge]);

  const todayAcceptedCardHeader = () => {
    return <h4 className="text-center">Today Accepted Requests</h4>;
  };

  const todayAcceptedCardFooter = () => {
    return (
      <>
        <Button link label="view details" onClick={()=>{
          setTitle(`Today Accepted Requests (${incharge.hostelId})`);
          setActiveLeaveList(todayAcceptedHostelStats?.leavesList as Leave[])
          setActivePermissionList(todayAcceptedHostelStats?.permissionsList as Permission[])
          setShowDialog(true);
        }}></Button>
      </>
    );
  };

  const todayArrivedCardHeader = () => {
    return <h4 className="text-center">Today Arrived Students</h4>;
  };

  const todayArrivedCardFooter = () => {
    return (
      <>
        <Button link label="view details" onClick={()=>{
          setTitle(`Today Arrived Requests ${incharge.hostelId}`);
          setActiveLeaveList(todayArrivedHostelStats?.leavesList as Leave[])
          setActivePermissionList(todayArrivedHostelStats?.permissionsList as Permission[])
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
              label={
                incharge?.hostelId === "BH1"
                  ? "Boys Hostel (BH1)"
                  : incharge?.hostelId === "GH1"
                  ? "Girls Hostel (GH1)"
                  : ""
              }
              className="bg-primary mt-2"
              icon="pi pi-circle-fill"
            />
          </div>
          <Card
            header={studentCardHeader}
            className="col-12 sm:col-6 lg:col-4 mt-2"
          >
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                In Hostel
              </div>
              <div className="text-900 font-bold m-1">
                {totalHostelStats?.hostel}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                On Permission
              </div>
              <div className="text-900 font-bold m-1">
                {totalHostelStats?.permissions}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">On Leave</div>
              <div className="text-900 font-bold m-1">
                {totalHostelStats?.leaves}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">
                {totalHostelStats?.total}
              </div>
            </div>
          </Card>
          <Card
            header={todayAcceptedCardHeader}
            footer={todayAcceptedCardFooter}
            className=" col-12 sm:col-6 lg:col-4 mt-2 "
          >
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Permissions
              </div>
              <div className="text-900 font-bold m-1">
                {todayAcceptedHostelStats?.permissions}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">Leaves</div>
              <div className="text-900 font-bold m-1">
                {todayAcceptedHostelStats?.leaves}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">
                {todayAcceptedHostelStats?.total}
              </div>
            </div>
          </Card>

          <Card
            header={todayArrivedCardHeader}
            footer={todayArrivedCardFooter}
            className=" col-12 sm:col-6 lg:col-4 mt-2"
          >
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">
                Permissions
              </div>
              <div className="text-900 font-bold m-1">
                {todayArrivedHostelStats?.permissions}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between">
              <div className="text-500 font-bold font-medium m-1">Leaves</div>
              <div className="text-900 font-bold m-1">
                {todayArrivedHostelStats?.leaves}
              </div>
            </div>
            <div className="flex align-items-center  justify-content-between mt-1 border-top-1 border-bottom-1">
              <div className="text-500 font-bold font-medium m-1">Total</div>
              <div className="text-900 font-bold m-1">
                {todayArrivedHostelStats?.total}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default InchargeDashboard;
