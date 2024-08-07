import { Card } from "primereact/card";
import React, { useEffect, useRef, useState } from "react";
import { formatDateWithTime } from "../interfaces/Date";

function ReqTimeline(props: any) {
  const { submitted, accORrej, arrived } = props;

  const [submit, setSubmit] = useState<any>(null);
  const [accRej, setAccRej] = useState<any>(null);
  const [arrive, setArrive] = useState<any>(null);

  useEffect(() => {
    if (submitted) {
      setSubmit({
        status: "Submitted",
        time: formatDateWithTime(new Date(submitted?.time)),
      });
    } else {
      setSubmit(null);
    }

    if (accORrej) {
      if (accORrej?.acc !== null && accORrej?.rej === null) {
        setAccRej({
          status: "Accepted",
          name: accORrej?.acc?.name,
          time: formatDateWithTime(new Date(accORrej?.acc?.time)),
        });
      } else if (accORrej?.acc === null && accORrej?.rej !== null) {
        setAccRej({
          status: "Rejected",
          name: accORrej?.rej?.name,
          time: formatDateWithTime(new Date(accORrej?.rej?.time)),
        });
      }
    } else {
      setAccRej(null);
    }

    if (arrived) {
      setArrive({
        status: "Arrived",
        time: formatDateWithTime(new Date(arrived?.time)),
        name: arrived?.name,
      });
    } else {
      setArrive(null);
    }

    drawTimeline();
  }, [submitted, accORrej, arrived]);

  const mycanvas = useRef(null);

  const drawTimeline = () => {
    if (mycanvas.current) {
      const canvas = mycanvas.current as HTMLCanvasElement;
      canvas.height = 200;
      canvas.width = 270;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.lineWidth = 2;
        ctx.font = "16px serif ";

        //submitted state
        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(100, 40, 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        // accepted or rejected state
        if (accRej !== null) {
          if (accRej?.status === "Accepted") {
            ctx.strokeStyle = "green";
            ctx.fillStyle = "green";
          } else if (accRej?.status === "Rejected") {
            ctx.strokeStyle = "tomato";
            ctx.fillStyle = "red";
          }
        } else {
          ctx.strokeStyle = "silver";
          ctx.fillStyle = "white";
        }
        ctx.beginPath();
        ctx.moveTo(100, 47);
        ctx.lineTo(100, 97);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(100, 104, 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //arrived state
        if (arrive !== null) {
          if (arrive?.status === "Arrived") {
            ctx.strokeStyle = "green";
            ctx.fillStyle = "green";
          }
        } else {
          ctx.strokeStyle = "silver";
          ctx.fillStyle = "white";
        }

        ctx.beginPath();
        ctx.moveTo(100, 111);
        ctx.lineTo(100, 161);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(100, 168, 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //submitted state
        if (submit) {
          ctx.fillStyle = "black";
          ctx.direction = "rtl";
          ctx.fillText(submit?.status, 85, 43);
          ctx.direction = "ltr";
          ctx.fillText(submit?.time, 115, 43);
          ctx.fillStyle = "black";
          ctx.direction = "rtl";
          ctx.fillText(submit?.status, 85, 43);
          ctx.direction = "ltr";
          ctx.fillText(submit?.time, 115, 43);
        }

        //accepted or rejected state
        if (accRej) {
          ctx.fillStyle = "black";
          ctx.direction = "rtl";
          ctx.fillText(accRej?.status, 85, 107);
          ctx.direction = "ltr";
          ctx.fillText(accRej?.time, 115, 97);
          ctx.fillText(accRej?.name, 115, 117);
          ctx.fillStyle = "black";
          ctx.direction = "rtl";
          ctx.fillText(accRej?.status, 85, 107);
          ctx.direction = "ltr";
          ctx.fillText(accRej?.time, 115, 97);
          ctx.fillText(accRej?.name, 115, 117);
        }

        // arrived state
        if (arrive) {
          ctx.fillStyle = "black";
          ctx.direction = "rtl";
          ctx.fillText(arrive?.status, 85, 171);
          ctx.direction = "ltr";
          ctx.fillText(arrive?.time, 115, 161);
          ctx.fillText(arrive?.name, 115, 181);
          ctx.fillStyle = "black";
          ctx.direction = "rtl";
          ctx.fillText(arrive?.status, 85, 171);
          ctx.direction = "ltr";
          ctx.fillText(arrive?.time, 115, 161);
          ctx.fillText(arrive?.name, 115, 181);
        }
      }
    }
  };

  return <canvas id="mycanvas" ref={mycanvas} className=""></canvas>;
}

export default ReqTimeline;
