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
import React, { useEffect, useRef, useState } from "react";

function StudentPermissionAndLeaves() {
  const [selectionOption, setSelectionOption] = useState<string>("Permission");
  const [rollNumber, setRollNumber] = useState<string>("21471A0521");
  const [name, setName] = useState<string>("Gangadhar Rongala");
  const [hostelId, setHostelId] = useState<string>("BH");

  const [date, setDate] = useState<Nullable<Date>>(null);

  const [fromDate, setFromDate] = useState<Nullable<Date>>(null);
  const [fromTime, setFromTime] = useState<Nullable<Date>>(null);
  const [toDate, setToDate] = useState<Nullable<Date>>(null);
  const [toTime, setToTime] = useState<Nullable<Date>>(null);

  const [reason, setReason] = useState<string>("");

  const [isApplying,setIsApplying] = useState<boolean>(false);
  const [isFormValid,setIsFormValid] = useState<boolean>(false);

  const [onPermission,setOnPermission] = useState<boolean>(false);
  const [onLeave,setOnLeave] = useState<boolean>(false);

  const PermissionLeaveToast = useRef<Toast>(null);
  const msgs = useRef<Messages>(null);

  const ValidateForm = ()=>{

    setIsFormValid(false);
    const isNameValid = name!=="";
    const isRollnoValid = /^[a-zA-Z0-9]{10}$/.test(rollNumber);
    const isHostelIdValid = hostelId!=="";
    const isDateValid = date !== null &&( date && date.toString() !== "");
    const isFromDateValid = fromDate !== null &&( fromDate && fromDate.toString() !== "");
    const isToDateValid = toDate !== null &&( toDate && toDate.toString() !== "");
    const isFromTimeValid = fromTime !== null &&( fromTime && fromTime.toString() !== "");
    const isToTimeValid = toTime !== null &&( toTime && toTime.toString() !== "");
    const isReasonValid = reason!=="";

    if(selectionOption === "Leave"){
      if(isNameValid&&isRollnoValid&&isHostelIdValid&&isFromDateValid&&isFromTimeValid&&isToDateValid&&isToTimeValid&&isReasonValid){
        setIsFormValid(true);
      }
    }else if(selectionOption === "Permission"){
      if(isNameValid&&isRollnoValid&&isHostelIdValid&&isDateValid&&isFromTimeValid&&isToTimeValid&&isReasonValid){
        setIsFormValid(true);
      }
    }
  }

  useEffect(()=>{
    ValidateForm();
  },[name,rollNumber,hostelId,date,fromDate,fromTime,toDate,toTime,reason]);


  useEffect(() => {
    msgs.current?.clear();
    if(onLeave){
    msgs.current?.show({ id: '1', sticky: true, severity: 'warn', summary: 'Not Allowed', detail: 'Currently you are on leave ,you are not allowed to apply leave or permission', closable: false });
    }else if(onPermission){
    msgs.current?.show({ id: '1', sticky: true, severity: 'warn', summary: 'Not Allowed', detail: 'Currently you are on Permission,you are not allowed to apply leave or permission', closable: false });
    }
},[onLeave,onPermission]);


  const handleLeavePermissionForm = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsApplying(true);

    if(selectionOption==="Leave"){
      setTimeout(() => {
        setIsApplying(false);
        if(PermissionLeaveToast.current){
          PermissionLeaveToast.current.show({ severity: 'success', summary: 'Your Leave has been Submitted successfully !', detail: 'New Student has been added' });
        }
        setOnLeave(true);
      }, 2000);

    }else if(selectionOption==="Permission"){
      setTimeout(() => {
        setIsApplying(false);
        if(PermissionLeaveToast.current){
          PermissionLeaveToast.current.show({ severity: 'success', summary: 'Your Permission has been Submitted successfully !', detail: 'New Student has been added' });
        }
        setOnPermission(true)
      }, 2000);

    }
    
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

       { !(onLeave || onPermission) ? <Card title={selectionOption} className="mt-2">
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  disabled
                />
                <label htmlFor="ad-stu-rollno">Name</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6  mt-3">
              <FloatLabel>
                <InputText
                  id="stu-pl-rollno"
                  type="text"
                  className="w-12 md:w-8"
                  value={rollNumber}
                  onChange={(e) => {
                    setRollNumber(e.target.value);
                  }}
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
                  value={hostelId}
                  onChange={(e) => {
                    setHostelId(e.target.value);
                  }}
                  required
                  disabled
                />
                <label htmlFor="stu-pl-hostelid">Hostel id</label>
              </FloatLabel>
            </div>

            {selectionOption === "Permission" && (
              <div className="col-12 md:col-6  mt-3">
                <FloatLabel>
                  <Calendar
                    required
                    inputId="stu-pl-date"
                    value={date}
                    onChange={(e) => setDate(e.value)}
                    className="w-12 md:w-8"
                    showButtonBar
                  />
                  <label htmlFor="stu-pl-date">Date</label>
                </FloatLabel>
              </div>
            )}

            {selectionOption === "Leave" && (
              <div className="col-12 md:col-6  mt-3">
                <FloatLabel>
                  <Calendar
                    required
                    inputId="stu-pl-fromDate"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.value)}
                    className="w-12 md:w-8"
                    showButtonBar
                  />
                  <label htmlFor="stu-pl-fromDate">From Date</label>
                </FloatLabel>
              </div>
            )}

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

            {selectionOption === "Leave" && (
              <div className="col-12 md:col-6  mt-3">
                <FloatLabel>
                  <Calendar
                    required
                    inputId="stu-pl-toDate"
                    value={toDate}
                    onChange={(e) => setToDate(e.value)}
                    className="w-12 md:w-8"
                    showButtonBar
                  />
                  <label htmlFor="stu-pl-toDate">To Date</label>
                </FloatLabel>
              </div>
            )}

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
              <Button   type="submit" style={{height:"50px"}} disabled={!isFormValid || isApplying}>
                {isApplying && <i className="pi pi-spin pi-spinner"></i>}&nbsp;&nbsp;
                {isApplying?`Applying ${selectionOption}`:`Apply ${selectionOption}`}
              </Button>
            </div>
          </form>
        </Card> : (        
          <div className="card flex justify-content-center">
            <Messages ref={msgs} />
        </div>)}
      </div>
    </>
  );
}

export default StudentPermissionAndLeaves;
function useMountEffect(arg0: () => void) {
  throw new Error("Function not implemented.");
}

