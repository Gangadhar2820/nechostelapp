import axios from "axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

interface ExcelData {
  [key: string]: string | number | boolean;
}

function AdminStudentBulkDataUpload() {

  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ExcelData[] | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const uploadDataToast = useRef<Toast>(null);

  const [isExcelFormat,setIsExcelForamt] = useState<boolean | null> (null);
  const [noOfColumnsPresent,setNoOfColumnsPresent] = useState<number>(0);
  
  const [requiredKeys,setRequiredKeys] = useState<any>(["name","hostelId","rollNo",
    "college","year","branch","gender","dob","phoneNo","email"
,"parentName","parentPhoneNo","currentStatus","requestCount","lastRequest"]);

  const [missingKeys,setMissingKeys] = useState<{ [key: string]: boolean } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(null);
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      if(event.target.files[0].name.split(".").pop() === "xls" ||event.target.files[0].name.split(".").pop() === "xlsx"){
      setIsExcelForamt(true)
      }else{
      setIsExcelForamt(false)
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

    if(data){
        let keys = Object.keys(data[0]);
        let missingKeys:{[key: string]: boolean } = {};
        for(let i of requiredKeys){
          let present = false;
          for(let j of keys){
            if(i===j){
              present = true;
              missingKeys[i] = true
              setNoOfColumnsPresent(prevValue=>prevValue+1) 
              break;
            }
          }
          if(!present){
            missingKeys[i] = false;
          }
        }
        setMissingKeys(missingKeys);
    }
  }, [data]);


  const handleFileUpload = () => {
    
    const exactData = data?.filter((element)=>element.rollNo !== "__");
    console.log(exactData)
  };

  // const sendDataToServer = async (data: ExcelData[]) => {
  //   setIsUploading(true);

  //   const response = await axios.post("http://localhost:4000/upload", data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   setTimeout(() => {
  //     setIsUploading(false);
  //     console.log(response);

  //     if (response.data.status === "success") {
  //       if (uploadDataToast.current) {
  //         uploadDataToast.current.show({
  //           severity: "success",
  //           summary: "Data uploaded successfully !",
  //           detail: "",
  //         });
  //       }
  //     }
  //   }, 2000);
  // };

  return (
    <>
      <Toast ref={uploadDataToast} position="center" />
      <div className="instructions">
          <strong style={{color:"red"}}>Requirements : </strong>
          <ul>
            <li>File should be in <i><b>Excel (.xls or .xlsx)</b></i> Format. {isExcelFormat !== null && (isExcelFormat ? <i className="pi pi-check-circle" style={{color:"green"}}></i> : <i className="pi pi-times-circle" style={{color:"red"}}></i> )} </li>
            <li>File should contain 15 columns { (noOfColumnsPresent===15 ? <i className="pi pi-check-circle" style={{color:"green"}}></i> : <i className="pi pi-times-circle" style={{color:"red"}}></i> )} </li>
            <li>File should contains columns with exact names (case sensitive).
              <ol style={{fontWeight:"bold",fontStyle:"italic"}}>

                {requiredKeys.map((key:any) => {
                  return <li key={key}>{key} &nbsp;&nbsp; {missingKeys && (missingKeys[key] ? <i className="pi pi-check-circle" style={{color:"green"}}></i> : <i className="pi pi-times-circle" style={{color:"red"}}></i>)}</li>
                })
                }
              
              </ol>
            </li>
            <li>In First row , every column should have value ` <b>__</b>`. { (noOfColumnsPresent===15 ? <i className="pi pi-check-circle" style={{color:"green"}}></i> : <i className="pi pi-times-circle" style={{color:"red"}}></i> )} </li>
          </ul>
        </div>

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-4 m-3">
          <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
        </div>
        <div className="col-12 md:col-6 lg:col-4 m-3">
          <Button
            disabled={(file && isExcelFormat && noOfColumnsPresent === 15) ? false : true || isUploading}
            className=""
            onClick={handleFileUpload}
          >
            {isUploading ? "Uploading" : "Upload"}&nbsp;&nbsp;
            {isUploading && <i className="pi pi-spin pi-spinner"></i>}
          </Button>
        </div>
        {!(file && isExcelFormat && noOfColumnsPresent === 15) && <>
        <strong style={{color:"red"}}>Some of the above Requirements are not met.Please check.</strong>
        </>}
      </div>
    </>
  );
}

export default AdminStudentBulkDataUpload;
