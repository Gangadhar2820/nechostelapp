import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { Permission, Leave } from "../interfaces/Request";
import { formatDate, formatDateWithTime, formatTime } from "../interfaces/Date";

function History() {
  const [selectionOption, setSelectionOption] = useState<string>("");

  const [tableData, setTableData] = useState<Permission[] | Leave[]>([]);

  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const tableFooter = `Total : ${
    tableData ? tableData.length : 0
  } ${selectionOption} Requests.`;

  const Permissions: Permission[] = [
    {
      name: "Gangadhar",
      rollNo: "21471A0521",
      hostelId: "BH1",
      date: new Date("12-12-2002"),
      toTime: new Date("12-12-2002"),
      fromTime: new Date("12-12-2002"),
      reason: "Outing",
      id: "mmm",
      type: "LEAVE",
      status: "SUBMITTED",
      submitted: null,
      accepted: null,
      rejected: null,
      arrived: null,
      phoneNo: "11111111111",
      parentPhoneNo: "33333333333",
      isActive:false

    },
    {
      name: "Gangadhar",
      rollNo: "21471A0521",
      hostelId: "BH1",
      date: new Date("12-12-2002"),
      toTime: new Date("12-12-2002"),
      fromTime: new Date("12-12-2002"),
      reason: "Outing",
      id: "jjjj",
      type: "LEAVE",
      status: "SUBMITTED",
      submitted: null,
      accepted: null,
      rejected: null,
      arrived: null,
      phoneNo: "11111111111",
      parentPhoneNo: "33333333333",
      isActive:false

    },
    {
      name: "Gangadhar",
      rollNo: "21471A0521",
      hostelId: "BH1",
      date: new Date("12-12-2002"),
      toTime: new Date("12-12-2002"),
      fromTime: new Date("12-12-2002"),
      reason: "Outing",
      id: "ghhak",
      type: "LEAVE",
      status: "SUBMITTED",
      submitted: null,
      accepted: null,
      rejected: null,
      arrived: null,
      phoneNo: "11111111111",
      parentPhoneNo: "33333333333",
      isActive:false

    },
  ];

  const Leaves: Leave[] = [
    {
      id: "BH121471A0521L004",
      type: "LEAVE",
      status: "SUBMITTED",
      submitted: { time: new Date("12-12-2002") },
      phoneNo: "9182233993",
      parentPhoneNo: "111111111",
      name: "Gangadhar",
      rollNo: "21471A0521",
      hostelId: "BH1",
      fromDate: new Date("12-12-2002"),
      toDate: new Date("12-12-2002"),
      reason: "Home",
      accepted: { time: new Date("12-12-2002"), name: "ganga", eid: "121" },
      rejected: null,
      arrived: null,
      isActive:false
    },
    {
      id: "BH121471A0521L001",
      type: "LEAVE",
      status: "SUBMITTED",
      submitted: { time: new Date("12-12-2002") },
      phoneNo: "9182233993",
      parentPhoneNo: "111111111",
      name: "Ganga",
      rollNo: "21471A0521",
      hostelId: "BH1",
      fromDate: new Date("7-1-2024"),
      toDate: new Date("10-07-2024"),
      reason: "Home",
      accepted: { time: new Date("11-22-2023"), name: "bbbb", eid: "123" },
      rejected: null,
      arrived: { time: new Date("11-29-2023"), name: "cccc", eid: "456" },
      isActive:false

    },
    {
      id: "BH121471A0521L002",
      type: "LEAVE",
      status: "SUBMITTED",
      submitted: { time: new Date("12-12-2002") },
      phoneNo: "9182233993",
      parentPhoneNo: "111111111",
      name: "Ganga",
      rollNo: "21471A0521",
      hostelId: "BH1",
      fromDate: new Date("10-07-2024"),
      toDate: new Date("10-07-2024"),
      reason: "Home",
      accepted: null,
      rejected: { time: new Date("11-30-2023"), name: "cccc", eid: "456" },
      arrived: null,
      isActive:false

    },
  ];

  useEffect(() => {
    if (selectionOption === "Permissions") {
      setTableData(Permissions);
    } else if (selectionOption === "Leaves") {
      setTableData(Leaves);
    }
  }, [selectionOption]);

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={() => {
            setGlobalFilterValue("");
          }}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={(e) => {
              setGlobalFilterValue(e.target.value);
            }}
            placeholder="Search"
            name="stu-hist-globalsearch"
          />
        </IconField>
      </div>
    );
  };
  const tableHeader = renderHeader();

  const submittedTime = (data: any) => {
    if(data.submitted){
      const date = data?.submitted?.time;
    const formatDate = data ? formatDateWithTime(date) : "";
    return formatDate;
    }
    return ""
  };

  const acceptedTime = (data: any) => {
    if(data.accepted){
      const date = data?.accepted?.time;
    const formatDate = data ? formatDateWithTime(date) : "";
    return formatDate;
    }
    return ""
  };

  const rejectedTime = (data: any) => {
    if(data.rejected){
      const date = data?.rejected?.time;
    const formatDate = data ? formatDateWithTime(date) : "";
    return formatDate;
    }
    return ""
  };

  const arrivedTime = (data: any) => {
    if(data.arrived){
      const date = data?.arrived?.time;
    const formatDate = data ? formatDateWithTime(date) : "";
    return formatDate;
    }
    return ""
  };

  const acceptedName = (data: any) => {
    if(data.accepted){
      const name = data?.accepted?.name;
      return name;
      }
      return "";
  };

  const rejectedName = (data: any) => {
    if(data.rejected){
    const name = data?.rejected?.name;
    return name;
    }
    return "";
  };

  const arrivedName = (data: any) => {
    if(data.arrived){
      const name = data?.arrived?.name;
      return name;
      }
      return "";
  };

  const fromDateTemplate = (data: any) => {
    if(data.fromDate){
    const fromDate = formatDateWithTime(data?.fromDate);
    return fromDate;
    }
    return ""
  };

  const toDateTemplate = (data: any) => {
    if(data.toDate){
      const toDate = formatDateWithTime(data?.toDate);
      return toDate;
      }
      return ""
  };

  const dateTemplate = (data:any)=>{

    if(data.date){
      const date = formatDate(data.date);
      return date
    }
    return "";
  }

  const fromTimeTemplate = (data:any)=>{
    if(data.fromTime){
      const time = formatTime(data.fromTime);
      return time
    }
    return "";
  }

  const toTimeTemplate = (data:any)=>{
    if(data.toTime){
      const time = formatTime(data.toTime);
      return time
    }
    return "";
  }

  return (
    <>
      <div
        className="p-1 w-11"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Request History">
          <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-3">
              <div className="flex align-items-center">
                <RadioButton
                  inputId="not-app-permissions"
                  name="Permissions"
                  value="Permissions"
                  onChange={(e: RadioButtonChangeEvent) =>
                    setSelectionOption(e.value)
                  }
                  checked={selectionOption === "Permissions"}
                />
                <label htmlFor="not-app-permissions" className="ml-2">
                  Permissions
                </label>
              </div>
              <div className="flex align-items-center">
                <RadioButton
                  inputId="not-app-leaves"
                  name="Leaves"
                  value="Leaves"
                  onChange={(e: RadioButtonChangeEvent) =>
                    setSelectionOption(e.value)
                  }
                  checked={selectionOption === "Leaves"}
                />
                <label htmlFor="not-app-leaves" className="ml-2">
                  Leaves
                </label>
              </div>
            </div>
          </div>
        </Card>

        <Card title={selectionOption} className="mt-2">
          {selectionOption === "Leaves" ? (
            <DataTable
              value={tableData}
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
                field="id"
                className="font-bold"
                header="Request Id"
                sortable
              ></Column>
              <Column
                header="From Date"
                field="fromDate"
                style={{ minWidth: "120px" }}
                body={fromDateTemplate}
              ></Column>
              <Column
                header="To Date"
                field="toDate"
                style={{ minWidth: "120px" }}
                body={toDateTemplate}
              ></Column>
              <Column field="reason" header="Reason"></Column>
              <Column field="name" header="Submitted Name"></Column>
              <Column
                field="submitted"
                header="Submitted Time"
                body={submittedTime}
                style={{ minWidth: "120px" }}
              ></Column>

              <Column
                field="accepted"
                header="Accepted Name"
                body={acceptedName}
              ></Column>
              <Column
                header="Accepted Time"
                field="accepted"
                body={acceptedTime}
                style={{ minWidth: "120px" }}
              ></Column>

              <Column
                field="rejected"
                header="Rejected Name"
                body={rejectedName}
              ></Column>
              <Column
                header="Rejected Time"
                field="rejected"
                body={rejectedTime}
                style={{ minWidth: "120px" }}
              ></Column>

              <Column
                field="arrived"
                header="Arrived Name"
                body={arrivedName}
              ></Column>
              <Column
                header="Arrived Time"
                field="arrived"
                body={arrivedTime}
                style={{ minWidth: "120px" }}
              ></Column>
            </DataTable>
          ) : (
            <DataTable
              value={tableData}
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
                field="id"
                className="font-bold"
                header="Request Id"
                sortable
              ></Column>
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
              <Column field="name" header="Submitted Name"></Column>
              <Column
                field="submitted"
                header="Submitted Time"
                body={submittedTime}
                style={{ minWidth: "120px" }}
              ></Column>

              <Column
                field="accepted"
                header="Accepted Name"
                body={acceptedName}
              ></Column>
              <Column
                header="Accepted Time"
                field="accepted"
                body={acceptedTime}
                style={{ minWidth: "120px" }}
              ></Column>

              <Column
                field="rejected"
                header="Rejected Name"
                body={rejectedName}
              ></Column>
              <Column
                header="Rejected Time"
                field="rejected"
                body={rejectedTime}
                style={{ minWidth: "120px" }}
              ></Column>

              <Column
                field="arrived"
                header="Arrived Name"
                body={arrivedName}
              ></Column>
              <Column
                header="Arrived Time"
                field="arrived"
                body={arrivedTime}
                style={{ minWidth: "120px" }}
              ></Column>
            </DataTable>
          )}
        </Card>
      </div>
    </>
  );
}

export default History;
