import { Card } from "primereact/card";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Leave, Permission } from "../interfaces/Request";
import { formatDate, formatDateWithTime, formatTime } from "../interfaces/Date";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { ArriveRequest, getActiveRequests } from "../../services/InchargeService";
import { AdminContext } from "./AdminHome";

function AdminActiveRequests() {

  const admin = useContext(AdminContext);

  const [selectionOption, setSelectionOption] = useState<"Permissions" | "Leaves">("Permissions");

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);

  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const activeRequestToast = useRef<Toast>(null);

  const [isArriving,setIsArriving] = useState<boolean>(false);

  const [activeRID,setActiveRID] = useState<string>("");

  useEffect(() => {
    if (admin) {
      getActiveRequests("all")
        .then((data) => {
          let leaves: any = [];
          let permissions: any = [];

          data.forEach((request: any) => {
            if (request.type === "LEAVE") {
              leaves = [...leaves, request];
            } else if (request.type === "PERMISSION") {
              permissions = [...permissions, request];
            }
          });
          setLeaves(leaves);
          setPermissions(permissions);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [admin]);

  

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label=""
          outlined
          onClick={() => {
            setGlobalFilterValue("");
          }}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            id="ad-act-req-filter"
            onChange={(e) => {
              setGlobalFilterValue(e.target.value);
            }}
            placeholder="Search"
          />
        </IconField>
      </div>
    );
  };
  const tableHeader = renderHeader();

  const tableFooter = `Total : ${
    selectionOption === "Leaves" ? leaves.length : permissions.length
  } ${selectionOption}`;

  const fromDateTemplate = (data: any) => {
    if (data.fromDate) {
      const fromDate = formatDateWithTime(new Date(data?.fromDate));
      return fromDate;
    }
    return "";
  };

  const toDateTemplate = (data: any) => {
    if (data.toDate) {
      const toDate = formatDateWithTime(new Date(data?.toDate));
      return toDate;
    }
    return "";
  };

  const dateTemplate = (data: any) => {
    if (data.date) {
      const date = formatDate(new Date(data.date));
      return date;
    }
    return "";
  };

  const fromTimeTemplate = (data: any) => {
    if (data.fromTime) {
      const time = formatTime(new Date(data.fromTime));
      return time;
    }
    return "";
  };

  const toTimeTemplate = (data: any) => {
    if (data.toTime) {
      const time = formatTime(new Date(data.toTime));
      return time;
    }
    return "";
  };

  const ArrivedButton = (request: Permission | Leave) => {
    return (
<Button
        label={(isArriving && activeRID === request.id)?"Arriving":"Arrived"}
        icon="pi pi-sign-in"
        severity="info"
        onClick={() => {
          handleRequestArrive(request?.id,request?.rollNo, request?.type);
        }}
      >&nbsp;&nbsp;
      {(isArriving && activeRID=== request.id) && <i className="pi pi-spin pi-spinner"></i>}

      </Button>
    );
  };

  const handleRequestArrive = (id:string,rollNo: string, type: string) => {
    const accept = () => {
      setActiveRID(id);
      setIsArriving(true);

      if(type==="LEAVE"){
        let arrRequest = leaves.filter(request=>request.id===id)[0];
        let newLeaves = leaves.filter(request=>request.id!==id);
        arrRequest = {...arrRequest,status:"ARRIVED",isActive:false,arrived:{
          time:new Date(),
          name:admin.name,
          eid:admin.eid
        }}

        ArriveRequest(id,arrRequest).then((data)=>{
          setLeaves(newLeaves);
          setIsArriving(false);
          if (data.updated) {
            if (activeRequestToast?.current) {
              activeRequestToast?.current.show({
                severity: "info",
                summary: `${rollNo} is Arrived from ${type}`,
                detail: "",
              });
            }
          }
        }).catch(err=>{
          console.log(err)
        })

      }else if(type==="PERMISSION"){

        let arrRequest = permissions.filter(request=>request.id===id)[0];
        let newPermissions = permissions.filter(request=>request.id!==id);

        arrRequest = {...arrRequest,status:"ARRIVED",isActive:false,arrived:{
          time:new Date(),
          name:admin.name,
          eid:admin.eid
        }}

        ArriveRequest(id,arrRequest).then((data)=>{
          setPermissions(newPermissions);
          setIsArriving(false);
          if (data.updated) {
            if (activeRequestToast?.current) {
              activeRequestToast?.current.show({
                severity: "info",
                summary: `${rollNo} is Arrived from ${type}`,
                detail: "",
              });
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      }

    };
    const reject = () => {
    };

    confirmDialog({
      message: `Is \`${rollNo}\` Arrived from ${type} ?`,
      header: "Arrived Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-success",
      accept,
      reject,
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Toast ref={activeRequestToast} position="center" />

      <div
        className="w-full"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Active Requests">
          <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-3">
              <div className="flex align-items-center">
                <RadioButton
                  inputId="inc-act-req-permissions"
                  name="Permissions"
                  value="Permissions"
                  onChange={(e: RadioButtonChangeEvent) =>
                    setSelectionOption(e.value)
                  }
                  checked={selectionOption === "Permissions"}
                />
                <label htmlFor="inc-act-req-permissions" className="ml-2">
                  Permissions
                </label>
              </div>
              <div className="flex align-items-center">
                <RadioButton
                  inputId="inc-Act-req-leaves"
                  name="Leaves"
                  value="Leaves"
                  onChange={(e: RadioButtonChangeEvent) =>
                    setSelectionOption(e.value)
                  }
                  checked={selectionOption === "Leaves"}
                />
                <label htmlFor="inc-Act-req-leaves" className="ml-2">
                  Leaves
                </label>
              </div>
            </div>
          </div>
        </Card>

        <Card title={selectionOption} className="mt-2">
          {selectionOption === "Leaves" ? (
            <DataTable
              value={leaves}
              stripedRows
              header={tableHeader}
              removableSort
              globalFilter={globalFilterValue}
              scrollable
              footer={tableFooter}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              selectionMode="single"
            >
              <Column
                field="hostelId"
                className="font-bold"
                header="Hostel ID"
                sortable
                frozen
              ></Column>
              <Column
                field="rollNo"
                className="font-bold"
                header="Roll Number"
                sortable
                frozen
              ></Column>
              
              <Column field="name" header="Name"></Column>

              <Column
                header="Start Date"
                field="fromDate"
                style={{ minWidth: "120px" }}
                body={fromDateTemplate}
              ></Column>
              <Column
                header="End Date"
                field="toDate"
                style={{ minWidth: "120px" }}
                body={toDateTemplate}
              ></Column>
              <Column field="reason" header="Reason"></Column>
              <Column field="phoneNo" header="Phone No"></Column>
              <Column field="parentPhoneNo" header="Parent PhoneNo"></Column>
              <Column body={ArrivedButton}></Column>
            </DataTable>
          ) : (
            <DataTable
              value={permissions}
              stripedRows
              header={tableHeader}
              removableSort
              globalFilter={globalFilterValue}
              scrollable
              footer={tableFooter}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="hostelId"
                className="font-bold"
                header="Hostel Id"
                sortable
                frozen
              ></Column>
              <Column
                field="rollNo"
                className="font-bold"
                header="Roll Number"
                sortable
                frozen
              ></Column>
              
              <Column field="name" header="Name"></Column>

              <Column
                header="Date"
                field="date"
                style={{ minWidth: "120px" }}
                body={dateTemplate}
              ></Column>
              <Column
                header="From Time"
                field="fromTime"
                style={{ minWidth: "120px" }}
                body={fromTimeTemplate}
              ></Column>
              <Column
                header="To Time"
                field="toTime"
                style={{ minWidth: "120px" }}
                body={toTimeTemplate}
              ></Column>
              <Column field="reason" header="Reason"></Column>
              <Column field="phoneNo" header="Phone No"></Column>
              <Column field="parentPhoneNo" header="Parent PhoneNo"></Column>
              <Column body={ArrivedButton}></Column>
            </DataTable>
          )}
        </Card>
      </div>
    </>
  );
}

export default AdminActiveRequests;

