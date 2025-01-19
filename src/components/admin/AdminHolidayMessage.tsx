import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Admin } from "../interfaces/Admin";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { createLog, SendHolidayMessage } from "../../services/AdminService";
import { AdminContext } from "./AdminHome";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";
import { formatDate } from "../interfaces/Date";
import axios from "axios";
import { LOG } from "../interfaces/Log";

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

  const handleHolidayMessageForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const occasionTEL = await axios.get(
      `https://api.mymemory.translated.net/get?q=${holidayMessage.occasion}&langpair=en|te`
    );
    const teluguOccasionName = occasionTEL.data.responseData.translatedText;

    const accept = () => {
      setIsSendingMessage(true);

      SendHolidayMessage({
        sendBy: admin.name,
        college: JSON.parse(JSON.stringify(holidayMessage.college)).code,
        year: JSON.parse(JSON.stringify(holidayMessage.year)).code,
        fromDate: formatDate(holidayMessage.fromDate as Date),
        toDate: formatDate(holidayMessage.toDate as Date),
        occasion: holidayMessage.occasion,
      })
        .then((data) => {
          setIsSendingMessage(false);
          if (data?.success) {
            let myLog: LOG = {
              date: new Date(),
              userId: admin.eid,
              username: admin.name as string,
              action: `Holiday Message : ${messageFORlog}`,
            };
            createLog(myLog);

            if (holidayToast?.current) {
              holidayToast?.current.show({
                severity: "success",
                summary: `Success !`,
                detail: `Total ${data.totalMessagesSent} messages sended`,
              });
            }
          } else {
            if (holidayToast?.current) {
              holidayToast?.current.show({
                severity: "error",
                summary: `Failure !`,
                detail: `Failed to send messages`,
              });
            }
          }
          // setHolidayMessage({
          //   year: "",
          //   college: "",
          //   fromDate: null,
          //   toDate: null,
          //   occasion: "",
          // });
        })
        .catch((err) => {
          console.log("Error : while sending holiday messages ", err);
        });
    };
    const reject = () => {};

    const messageFORlog = `ప్రియమైన తల్లిదండ్రులకు, మీ పిల్లలు చదువుకుంటున్న ${holidayMessage.college === "ALL" ? "NEC/NIT/NIPS" : JSON.parse(JSON.stringify(holidayMessage.college)).code} కళాశాలలో ${teluguOccasionName} సందర్భంగా ${formatDate(holidayMessage.fromDate as Date)} నుండి ${formatDate(holidayMessage.toDate as Date)} వరకు సెలవులు ప్రకటించబడినట్లు తెలియజేస్తున్నాము. NEC హాస్టల్స్ - GEDNEC`

    const message = (
      <p>
        ప్రియమైన తల్లిదండ్రులకు, మీ పిల్లలు చదువుకుంటున్న{" "}
        <span
          style={{
            color: "blue",
            fontWeight: "bold",
            fontStyle: "italic",
            textDecoration: "underline",
          }}
        >
          {holidayMessage.college === "ALL"
            ? "NEC/NIT/NIPS"
            : JSON.parse(JSON.stringify(holidayMessage.college)).code}
        </span>{" "}
        కళాశాలలో{" "}
        <span
          style={{
            color: "blue",
            fontWeight: "bold",
            fontStyle: "italic",
            textDecoration: "underline",
          }}
        >
          {teluguOccasionName}
        </span>{" "}
        సందర్భంగా{" "}
        <span
          style={{
            color: "blue",
            fontWeight: "bold",
            fontStyle: "italic",
            textDecoration: "underline",
          }}
        >
          {formatDate(holidayMessage.fromDate as Date)}
        </span>{" "}
        నుండి{" "}
        <span
          style={{
            color: "blue",
            fontWeight: "bold",
            fontStyle: "italic",
            textDecoration: "underline",
          }}
        >
          {formatDate(holidayMessage.toDate as Date)}
        </span>{" "}
        వరకు సెలవులు ప్రకటించబడినట్లు తెలియజేస్తున్నాము. NEC హాస్టల్స్ - GEDNEC
      </p>
    );

    confirmDialog({
      message: message,
      header: "Preview Holiday Message",
      icon: "pi pi-eye",
      defaultFocus: "reject",
      acceptClassName: "p-button-success",
      accept,
      reject,
      id: "adminholidaymessagedialog",
    });
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

  const holidayToast = useRef<Toast>(null);

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
        <ConfirmDialog
          id="inchargependingrequestdialog"
          className="w-10 md:w-6 "
        />

        <Toast ref={holidayToast} position="center"></Toast>

        <Card title="Send Holiday Message" className="special-font">
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
