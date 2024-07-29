import axios from "axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";

interface ExcelData {
  [key: string]: string | number | boolean;
}

function AdminStudentDataUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ExcelData[] | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const uploadDataToast = useRef<Toast>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(null);
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = () => {
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
        sendDataToServer(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const sendDataToServer = async (data: ExcelData[]) => {
    setIsUploading(true);

    const response = await axios.post("http://localhost:4000/upload", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTimeout(() => {
      setIsUploading(false);
      console.log(response);

      if (response.data.status === "success") {
        if (uploadDataToast.current) {
          uploadDataToast.current.show({
            severity: "success",
            summary: "Data uploaded successfully !",
            detail: "",
          });
        }
      }
    }, 2000);
  };

  return (
    <>
      <Toast ref={uploadDataToast} position="center" />

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-4 mt-3">
          <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
        </div>
        <div className="col-12 md:col-6 lg:col-4 mt-3">
          <Button
            disabled={file ? false : true || isUploading}
            className=""
            onClick={handleFileUpload}
          >
            {isUploading ? "Uploading" : "Upload"}&nbsp;&nbsp;
            {isUploading && <i className="pi pi-spin pi-spinner"></i>}
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminStudentDataUpload;
