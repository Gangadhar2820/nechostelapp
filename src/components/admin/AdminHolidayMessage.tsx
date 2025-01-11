import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Admin } from "../interfaces/Admin";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { SendHolidayMessage } from "../../services/AdminService";
import { AdminContext } from "./AdminHome";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";
import { formatDate } from "../interfaces/Date";

interface HolidayMessage {
  year: string;
  college: string;
  fromDate: Nullable<Date>;
  toDate: Nullable<Date>;
  occasion: string;
}

function AdminHolidayMessage() {
  const [holidayMessage, setHolidayMessage] = useState<HolidayMessage>({
    year: "",
    college: "",
    fromDate: null,
    toDate: null,
    occasion: "",
  });

  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [admin, setAdmin] = useState<Admin>(useContext(AdminContext));

  const handleHolidayMessageForm = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // confirmDialog({
    //       message: ``,
    //       header: "Message Confirmation",
    //       icon: "pi pi-info-circle",
    //       defaultFocus: "reject",
    //       acceptClassName: "p-button-danger",
    //       accept,
    //       reject,
    //       id: "inchargependingrequestdialog",
    //     });
    
    SendHolidayMessage({
      sendBy: admin.name,
      college: JSON.parse(JSON.stringify(holidayMessage.college)).code,
      year: JSON.parse(JSON.stringify(holidayMessage.year)).code,
      fromDate: formatDate(holidayMessage.fromDate as Date),
      toDate: formatDate(holidayMessage.toDate as Date),
      occasion: holidayMessage.occasion,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error : while sending holiday messages ", err);
      });
    // setHolidayMessage({
    //   year: "",
    //   college: "",
    //   fromDate: null,
    //   toDate: null,
    //   occasion: "",
    // });
  };

  const colleges = [
    { name: "ALL", code: "ALL" },
    { name: "NEC", code: "NEC" },
    { name: "NIT", code: "NIT" },
    { name: "NIPS", code: "NIPS" },
  ];
  const years = [
    { name: "ALL", code: "ALL" },
    { name: "I Year", code: "1" },
    { name: "II Year", code: "2" },
    { name: "III Year", code: "3" },
    { name: "IV Year", code: "4" },
    { name: "V Year", code: "5" },
    { name: "VI Year", code: "6" },
  ];

  const validateForm = useCallback(() => {
    setIsFormValid(false);
    if (
      holidayMessage.college !== "" &&
      holidayMessage.year !== "" &&
      holidayMessage.fromDate !== null &&
      holidayMessage.toDate !== null &&
      holidayMessage.occasion !== ""
    ) {
      setIsFormValid(true);
    }
  }, [holidayMessage]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <>
      <div
        className="p-2 w-10"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <ConfirmDialog id="inchargependingrequestdialog" />
        
        {/* <Toast ref={adminToast} position="center"></Toast> */}


        <Card title="Send Holiday Message">
          <form action="" className="grid" onSubmit={handleHolidayMessageForm}>
            <div className="col-12 md:col-6 mt-3">
              <div className="w-12 md:w-8">
                <FloatLabel>
                  <Dropdown
                    inputId="ad-hm-college"
                    value={holidayMessage.college}
                    onChange={(e) =>
                      setHolidayMessage({ ...holidayMessage, college: e.value })
                    }
                    options={colleges}
                    optionLabel="name"
                    className="w-full"
                  />
                  <label htmlFor="ad-hm-college">College</label>
                </FloatLabel>
              </div>
            </div>

            <div className="col-12 md:col-6 mt-3">
              <div className="w-12 md:w-8">
                <FloatLabel>
                  <Dropdown
                    inputId="ad-hm-year"
                    value={holidayMessage.year}
                    onChange={(e) =>
                      setHolidayMessage({ ...holidayMessage, year: e.value })
                    }
                    options={years}
                    optionLabel="name"
                    className="w-full"
                  />
                  <label htmlFor="ad-hm-year">Year</label>
                </FloatLabel>
              </div>
            </div>

            <div className="col-12 md:col-6 mt-3">
              <FloatLabel>
                <Calendar
                  required
                  inputId="ad-hm-fromDate"
                  value={holidayMessage.fromDate}
                  onChange={(e) =>
                    setHolidayMessage({ ...holidayMessage, fromDate: e.value })
                  }
                  className="w-12 md:w-8"
                  showButtonBar
                  dateFormat="dd/mm/yy"
                />
                <label htmlFor="ad-hm-fromDate">From Date</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 mt-3">
              <FloatLabel>
                <Calendar
                  required
                  inputId="ad-hm-toDate"
                  value={holidayMessage.toDate}
                  onChange={(e) =>
                    setHolidayMessage({ ...holidayMessage, toDate: e.value })
                  }
                  className="w-12 md:w-8"
                  showButtonBar
                  dateFormat="dd/mm/yy"
                />
                <label htmlFor="ad-hm-toDate">To Date</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-hm-occasion"
                  className="w-12 md:w-8"
                  style={{ height: "50px" }}
                  value={holidayMessage.occasion}
                  onChange={(e) =>
                    setHolidayMessage({
                      ...holidayMessage,
                      occasion: e.target.value,
                    })
                  }
                />
                <label htmlFor="ad-hm-occasion">Occasion</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 mt-3 flex justify-content-start">
              <Button type="submit" disabled={!isFormValid || isSendingMessage}>
                {isSendingMessage && <i className="pi pi-send"></i>}
                &nbsp;&nbsp;
                {isSendingMessage ? "Sending" : "Send Message"}
                &nbsp;&nbsp;
                {isSendingMessage && <i className="pi pi-spin pi-spinner"></i>}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AdminHolidayMessage;
