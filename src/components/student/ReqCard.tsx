import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import ReqTimeline from "./ReqTimeline";
import { formatDate, formatDateWithTime, formatTime } from "../interfaces/Date";

function ReqCard(props: any) {
  const { request } = props;

  //permission
  const [date, setDate] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");

  //leave
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  useEffect(() => {
    if (request?.type === "LEAVE") {
      let startDate = formatDateWithTime(request?.fromDate);
      let endDate = formatDateWithTime(request?.toDate);
      setFromDate(startDate);
      setToDate(endDate);
    } else if (request?.type === "PERMISSION") {
      let date = formatDate(request?.date);
      let fromTime = formatTime(request?.fromTime);
      let toTime = formatTime(request?.toTime);
      setDate(date);
      setFromTime(fromTime);
      setToTime(toTime);
    }
  }, [request]);

  const requestCardHeader = (
    <div className="text-center">
      <Chip
        label={request?.type}
        className="bg-primary mt-2"
        icon="pi pi-circle-fill"
      />
    </div>
  );
  return (
    <>
      <div
        className="mt-2 w-12"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card header={requestCardHeader}>
          <div className="grid">
            <div className="timeline col-12 sm:col-6 md:col-5">
              <ReqTimeline submitted={request?.submitted} accORrej={{acc:request?.accepted,rej:request?.rejected }} arrived={request?.arrived}/>
            </div>
            <div className="flex align-items-start justify-content-center col-12 sm:col-6 md:col-7">
              <div className="p-0 m-0 w-10">
                <div className="flex align-items-center  justify-content-start mt-2">
                  <div className="text-500 font-bold font-medium w-6">
                    Request ID
                  </div>
                  <div className="text-900 font-bold w-6">{request?.id}</div>
                </div>
                <div className="flex align-items-center  justify-content-start mt-2">
                  <div className="text-500 font-bold font-medium w-6">
                    Roll Number
                  </div>
                  <div className="text-900 font-bold w-6">
                    {request?.rollNo}
                  </div>
                </div>
                <div className="flex align-items-center  justify-content-start mt-2">
                  <div className="text-500 font-bold font-medium w-6">Name</div>
                  <div className="text-900 font-bold w-6">{request?.name}</div>
                </div>
                {request?.type === "LEAVE" ? (
                  <>
                    <div className="flex align-items-center  justify-content-start mt-2">
                      <div className="text-500 font-bold font-medium w-6">
                        Start Date
                      </div>
                      <div className="text-900 font-bold w-6">{fromDate}</div>
                    </div>
                    <div className="flex align-items-center  justify-content-start mt-2">
                      <div className="text-500 font-bold font-medium w-6">
                        End Date
                      </div>
                      <div className="text-900 font-bold w-6">{toDate}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex align-items-center  justify-content-start mt-2">
                      <div className="text-500 font-bold font-medium w-6">
                        Date
                      </div>
                      <div className="text-900 font-bold w-6">{date}</div>
                    </div>
                    <div className="flex align-items-center  justify-content-start mt-2">
                      <div className="text-500 font-bold font-medium w-6">
                        From Time
                      </div>
                      <div className="text-900 font-bold w-6">{fromTime}</div>
                    </div>
                    <div className="flex align-items-center  justify-content-start mt-2">
                      <div className="text-500 font-bold font-medium w-6">
                        To Time
                      </div>
                      <div className="text-900 font-bold w-6">{toTime}</div>
                    </div>
                  </>
                )}
                <div className="flex align-items-center  justify-content-start mt-2">
                  <div className="text-500 font-bold font-medium w-6">
                    Reason
                  </div>
                  <div className="text-900 font-bold w-6">
                    {request?.reason}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default ReqCard;
