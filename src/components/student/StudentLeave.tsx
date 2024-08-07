import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Messages } from "primereact/messages";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { Nullable } from "primereact/ts-helpers";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Student } from "../interfaces/Student";
import { StudentContext } from "./StudentHome";
import { Permission , Leave } from "../interfaces/Request";
import { Link } from "react-router-dom";
import { applyRequest } from "../../services/StudentService";

function StudentLeave() {
  const [selectionOption, setSelectionOption] = useState<string>("Permission");

  //permission
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [fromTime, setFromTime] = useState<Nullable<Date>>(null);
  const [toTime, setToTime] = useState<Nullable<Date>>(null);

  //leave
  const [fromDate, setFromDate] = useState<Nullable<Date>>(null);
  const [toDate, setToDate] = useState<Nullable<Date>>(null);

  const [reason, setReason] = useState<string>("");

  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const PermissionLeaveToast = useRef<Toast>(null);
  const msgs = useRef<Messages>(null);

  const { student, updateStudent } = useContext(StudentContext);


  const ValidateForm = () => {
    setIsFormValid(false);

    const isDateValid = date !== null && date && date.toString() !== "";
    const isFromDateValid =
      fromDate !== null && fromDate && fromDate.toString() !== "";
    const isToDateValid = toDate !== null && toDate && toDate.toString() !== "";
    const isFromTimeValid =
      fromTime !== null && fromTime && fromTime.toString() !== "";
    const isToTimeValid = toTime !== null && toTime && toTime.toString() !== "";
    const isReasonValid = reason !== "";

    if (selectionOption === "Leave") {
      if (
        isFromDateValid &&
        isToDateValid &&
        isReasonValid
      ) {
        setIsFormValid(true);
      }
    } else if (selectionOption === "Permission") {
      if (isDateValid && isFromTimeValid && isToTimeValid && isReasonValid) {
        setIsFormValid(true);
      }
    }
  };

  useEffect(() => {
    ValidateForm();
  }, [date, fromDate, fromTime, toDate, toTime, reason]);

  useEffect(() => {
    msgs.current?.clear();
    msgs.current?.show({
      id: "1",
      icon:"pi pi-send",
      sticky: true,
      severity: "info",
      summary: "Request Info",
      content: (
      <>
        <div className="ml-2">Your Request has been submitted successfully.
        <Link to={`/student/${student.rollNo}/dashboard`} className="no-underline cursor-pointer p-3 w-full">
        <span className="font-medium">View Details</span>
        </Link>
        </div>
      </>
    ),
      closable: false,
  })
    
  });

  const createRequest =  ()=>{
    let request:Permission|Leave|null = null;

     if(selectionOption === "Leave"){
      request = {id:`${student?.hostelId}${student?.rollNo}L`+(student?.requestCount+1).toString().padStart(3,"0"),type:"LEAVE",
      status:"SUBMITTED",submitted:{time:new Date()},accepted:null,rejected:null,
      arrived:null,name:student?.name,rollNo:student?.rollNo,hostelId:student?.hostelId,
      phoneNo:student?.phoneNo,parentPhoneNo:student?.parentPhoneNo,reason:reason,fromDate:fromDate as Date,toDate:toDate as Date,isActive:true};
    }else if(selectionOption==="Permission"){
      request = {id:`${student?.hostelId}${student?.rollNo}P`+(student?.requestCount+1).toString().padStart(3,"0"),type:"PERMISSION",
      status:"SUBMITTED",submitted:{time:new Date()},accepted:null,rejected:null,
      arrived:null,name:student?.name,rollNo:student?.rollNo,hostelId:student?.hostelId,
      phoneNo:student?.phoneNo,parentPhoneNo:student?.parentPhoneNo,reason:reason,date:date as Date,fromTime:fromTime as Date,toTime:toTime as Date,isActive:true};
    }
    updateStudent({...student,lastRequest:request,requestCount:student?.requestCount+1} as Student)
    return request;
  }

  const handleLeavePermissionForm = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsApplying(true);
    let request = createRequest();

    applyRequest(request).then((data)=>{
      setIsApplying(false);

      if(data.success){
      if (selectionOption === "Leave") {
        if (PermissionLeaveToast.current) {
          PermissionLeaveToast.current.show({
            severity: "success",
            summary: "Your Leave has been Submitted successfully !",
            detail: "Wait for Incharge Acceptance",
          });
        }
    } else if (selectionOption === "Permission"){
        if (PermissionLeaveToast.current) {
          PermissionLeaveToast.current.show({
            severity: "success",
            summary: "Your Permission has been Submitted successfully !",
            detail: "Wait for Incharge Acceptance",
          });
        }
    }
  }
   
    }).catch((err)=>{
      console.log(err)
    })

  };

  return (
    <>
      <Toast ref={PermissionLeaveToast} position="center"></Toast>
      <div
        className="p-2 w-10"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Apply Leave / Permission">
          <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-3">
              <div className="flex align-items-center">
                <RadioButton
                  inputId="stu-pl-permission"
                  name="Permission"
                  value="Permission"
                  onChange={(e: RadioButtonChangeEvent) =>
                    setSelectionOption(e.value)
                  }
                  checked={selectionOption === "Permission"}
                />
                <label htmlFor="stu-pl-permission" className="ml-2">
                  Permission
                </label>
              </div>
              <div className="flex align-items-center">
                <RadioButton
                  inputId="stu-pl-leave"
                  name="Leave"
                  value="Leave"
                  onChange={(e: RadioButtonChangeEvent) =>
                    setSelectionOption(e.value)
                  }
                  checked={selectionOption === "Leave"}
                />
                <label htmlFor="stu-pl-leave" className="ml-2">
                  Leave
                </label>
              </div>
            </div>
          </div>
        </Card>

        {!(student?.lastRequest?.isActive) ? (
          <Card title={selectionOption} className="mt-2">
            <form
              action=""
              className="grid"
              onSubmit={handleLeavePermissionForm}
              name="LPForm"
            >
              <div className="col-12 md:col-6  mt-3">
                <FloatLabel>
                  <InputText
                    id="stu-pl-name"
                    type="text"
                    className="w-12 md:w-8"
                    value={student?.name || ""}
                    required
                    disabled
                  />
                  <label htmlFor="stu-pl-name">Name</label>
                </FloatLabel>
              </div>

              <div className="col-12 md:col-6  mt-3">
                <FloatLabel>
                  <InputText
                    id="stu-pl-rollno"
                    type="text"
                    className="w-12 md:w-8"
                    value={student?.rollNo || ""}
                    required
                    disabled
                  />
                  <label htmlFor="stu-pl-rollno">Roll Number</label>
                </FloatLabel>
              </div>

              <div className="col-12 md:col-6  mt-3">
                <FloatLabel>
                  <InputText
                    id="stu-pl-hostelid"
                    type="text"
                    className="w-12 md:w-8"
                    value={student?.hostelId || ""}
                    required
                    disabled
                  />
                  <label htmlFor="stu-pl-hostelid">Hostel id</label>
                </FloatLabel>
              </div>

              {selectionOption === "Permission" && (
                <>
                  <div className="col-12 md:col-6  mt-3">
                    <FloatLabel>
                      <Calendar
                        required
                        inputId="stu-pl-date"
                        value={date}
                        onChange={(e) => setDate(e.value)}
                        className="w-12 md:w-8"
                        showButtonBar
                        dateFormat="dd/mm/yy"
                      />
                      <label htmlFor="stu-pl-date">Date</label>
                    </FloatLabel>
                  </div>

                  <div className="col-12 md:col-6  mt-3">
                    <FloatLabel>
                      <Calendar
                        timeOnly
                        hourFormat="12"
                        required
                        inputId="stu-pl-fromTime"
                        value={fromTime}
                        onChange={(e) => setFromTime(e.value)}
                        className="w-12 md:w-8"
                      />
                      <label htmlFor="stu-pl-fromTime">From Time</label>
                    </FloatLabel>
                  </div>
                  <div className="col-12 md:col-6  mt-3">
                    <FloatLabel>
                      <Calendar
                        timeOnly
                        hourFormat="12"
                        required
                        inputId="stu-pl-toTime"
                        value={toTime}
                        onChange={(e) => setToTime(e.value)}
                        className="w-12 md:w-8"
                      />
                      <label htmlFor="stu-pl-toTime">To Time</label>
                    </FloatLabel>
                  </div>
                </>
              )}

              {selectionOption === "Leave" && (
                <>
                  <div className="col-12 md:col-6  mt-3">
                    <FloatLabel>
                      <Calendar
                        required
                        inputId="stu-pl-fromDate"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.value)}
                        className="w-12 md:w-8"
                        showButtonBar
                        showTime
                        hourFormat="12"
                      />
                      <label htmlFor="stu-pl-fromDate">From Date</label>
                    </FloatLabel>
                  </div>

                  <div className="col-12 md:col-6  mt-3">
                    <FloatLabel>
                      <Calendar
                        required
                        inputId="stu-pl-toDate"
                        value={toDate}
                        onChange={(e) => setToDate(e.value)}
                        className="w-12 md:w-8"
                        showButtonBar
                        showTime
                        hourFormat="12"
                      />
                      <label htmlFor="stu-pl-toDate">To Date</label>
                    </FloatLabel>
                  </div>
                </>
              )}

              <div className="col-12 md:col-6  mt-3">
                <FloatLabel>
                  <InputTextarea
                    className="w-12 md:w-8"
                    id="stu-pl-reason"
                    autoResize
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={2}
                    required
                  />
                  <label htmlFor="stu-pl-reason">Reason</label>
                </FloatLabel>
              </div>

              <div className="col-12 md:col-6 lg:col-4 mt-3 flex justify-content-start">
                <Button
                  type="submit"
                  style={{ height: "50px" }}
                  disabled={!isFormValid || isApplying}
                >
                  {isApplying && <i className="pi pi-spin pi-spinner"></i>}
                  &nbsp;&nbsp;
                  {isApplying
                    ? `Applying ${selectionOption}`
                    : `Apply ${selectionOption}`}
                </Button>
              </div>
            </form>
          </Card>
        ):(<Messages ref={msgs} />) }
      </div>
    </>
  );
}

export default StudentLeave;
