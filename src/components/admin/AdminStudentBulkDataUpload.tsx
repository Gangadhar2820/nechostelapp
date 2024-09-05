import axios from "axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { UploadStudentBulkData } from "../../services/AdminService";

interface ExcelData {
  [key: string]: string | number | boolean;
}

function AdminStudentBulkDataUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ExcelData[] | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const uploadDataToast = useRef<Toast>(null);

  const [isExcelFormat, setIsExcelForamt] = useState<boolean | null>(null);
  const [noOfColumnsPresent, setNoOfColumnsPresent] = useState<number>(0);

  const [requiredKeys, setRequiredKeys] = useState<any>([
    "name",
    "rollNo",
    "college",
    "year",
    "branch",
    "gender",
    "dob",
    "phoneNo",
    "email",
    "parentName",
    "parentPhoneNo",
  ]);

  const [missingKeys, setMissingKeys] = useState<{
    [key: string]: boolean;
  } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(null);
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      if (
        event.target.files[0].name.split(".").pop() === "xls" ||
        event.target.files[0].name.split(".").pop() === "xlsx"
      ) {
        setIsExcelForamt(true);
      } else {
        setIsExcelForamt(false);
      }
    }
  };

  useEffect(() => {
    setData(null);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: "array",
        });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  useEffect(() => {
    setNoOfColumnsPresent(0);

    if (data) {
      let keys = Object.keys(data[0]);
      let missingKeys: { [key: string]: boolean } = {};
      for (let i of requiredKeys) {
        let present = false;
        for (let j of keys) {
          if (i === j) {
            present = true;
            missingKeys[i] = true;
            setNoOfColumnsPresent((prevValue) => prevValue + 1);
            break;
          }
        }
        if (!present) {
          missingKeys[i] = false;
        }
      }
      setMissingKeys(missingKeys);
    }
  }, [data]);

  const handleFileUpload = () => {
    setIsUploading(true);
    const exactData = data?.filter((element) => element.rollNo !== "__");
    const result = exactData?.map((student) => {
      let newStudent = {
        ...student,
        rollNo: student?.rollNo.toString().trim().toUpperCase(),
        branch: student?.branch.toString().trim().toUpperCase(),
        gender: student?.gender.toString().trim().toUpperCase(),
        college: student?.college.toString().trim().toUpperCase(),
        hostelId:
          student?.gender.toString().toUpperCase() === "MALE" ? "BH1" : "GH1",
        requestCount: 0,
        currentStatus: "HOSTEL",
        lastRequest: null,
      };
      return newStudent;
    });

    UploadStudentBulkData(result)
      .then((data) => {
        setIsUploading(false);
        const {added,message} = data;

        if(added){
          if(uploadDataToast.current){
            uploadDataToast.current.show({
              severity: "success",
              summary: "Data Uploaded Successfully",
              detail: message,
            })
          }
        }else{
          if(uploadDataToast.current){
            uploadDataToast.current.show({
              severity: "error",
              summary: "Data Upload Failed",
              detail: message,
            })
          }

        }
      })
      .catch((err) => console.log("something went wrong", err));
  };

  return (
    <>
      <Toast ref={uploadDataToast} position="center" />
      <div className="instructions">
        <strong style={{ color: "red" }}>Requirements : </strong>
        <ul>
          <li>
            Download Template.&nbsp;<a  style={{fontSize:"large"}} target="_blank" href="https://docs.google.com/spreadsheets/d/1rKVL7_M3MKcB7gSPTLjaOGcwNyiUKk2Y/edit?usp=drive_link&ouid=116090889097757040545&rtpof=true&sd=true">click here</a>
          </li>
          <li>
            File should be in{" "}
            <i>
              <b>Excel (.xls or .xlsx)</b>
            </i>{" "}
            Format.{" "}
            {isExcelFormat !== null &&
              (isExcelFormat ? (
                <i
                  className="pi pi-check-circle"
                  style={{ color: "green" }}
                ></i>
              ) : (
                <i className="pi pi-times-circle" style={{ color: "red" }}></i>
              ))}{" "}
          </li>
          <li>
            File should contain 11 columns{" "}
            {noOfColumnsPresent === 11 ? (
              <i className="pi pi-check-circle" style={{ color: "green" }}></i>
            ) : (
              <i className="pi pi-times-circle" style={{ color: "red" }}></i>
            )}{" "}
          </li>
          <li>
            File should contains columns with exact names (case sensitive).
            <ol style={{ fontWeight: "bold", fontStyle: "italic" }}>
              {requiredKeys.map((key: any) => {
                return (
                  <li key={key}>
                    {key} &nbsp;&nbsp;{" "}
                    {missingKeys &&
                      (missingKeys[key] ? (
                        <i
                          className="pi pi-check-circle"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="pi pi-times-circle"
                          style={{ color: "red" }}
                        ></i>
                      ))}
                  </li>
                );
              })}
            </ol>
          </li>
          <li>
            In First row , every column should have value ` <b>__</b>`.{" "}
            {noOfColumnsPresent === 11 ? (
              <i className="pi pi-check-circle" style={{ color: "green" }}></i>
            ) : (
              <i className="pi pi-times-circle" style={{ color: "red" }}></i>
            )}{" "}
          </li>
        </ul>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-4 m-3">
          <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
        </div>
        <div className="col-12 md:col-6 lg:col-4 m-3">
          <Button
            disabled={
              file && isExcelFormat && noOfColumnsPresent === 11
                ? false
                : true || isUploading
            }
            className=""
            onClick={handleFileUpload}
          >
            {isUploading ? "Uploading" : "Upload"}&nbsp;&nbsp;
            {isUploading && <i className="pi pi-spin pi-spinner"></i>}
          </Button>
        </div>
        {!(file && isExcelFormat && noOfColumnsPresent === 11) && (
          <>
            <strong style={{ color: "red" }}>
              Some of the above Requirements are not met.Please check.
            </strong>
          </>
        )}
      </div>
    </>
  );
}

export default AdminStudentBulkDataUpload;
