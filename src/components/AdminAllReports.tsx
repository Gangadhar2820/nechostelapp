import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { RadioButton ,RadioButtonChangeEvent} from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

        
        
interface Request{
    _id?:string;
    name:string;
    rollNumber:string;
    hostelID : string;
    requestType:string;
    start:string;
    end:string;
    returnTime:string;
    returnStatus:string;
    accepted:string
}

function AdminAllReports() {
    const [selectionOption, setSelectionOption] = useState<string>('');

    const [tableData, setTableData] = useState<Request[]>([]);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const tableFooter = `Total : ${tableData ? tableData.length : 0} ${selectionOption} Requests.`

    const All:Request[] = [
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"Leave"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"permission"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"Leave"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"permission"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"Leave"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"permission"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"Leave"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"permission"},
    ]

    const Delayed:Request[] = [
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"permission"},
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"permission"},
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"permission"},
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"permission"},
    ]

    const NotReturned:Request[] = [
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"Leave"},
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"permission"},
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"Leave"},
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"permission"},
    ]

    const Returned:Request[] = [
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"Leave"},
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Not Delayed",accepted:"21471A0521",requestType:"permission"},
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"Leave"},
      {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",start:"16/07/2024 11:22am",end:"18/07/2024 05:30pm",returnTime:"18/07/2024 4:30pm",returnStatus:"Delayed",accepted:"21471A0521",requestType:"permission"},
    ]
    
    useEffect(()=>{
        if(selectionOption === "All"){
            setTableData(All)
        }else if(selectionOption === "Delayed"){
            setTableData(Delayed);
        }else if(selectionOption === "Not Returned"){
          setTableData(NotReturned)
        }else if(selectionOption === "Returned"){
          setTableData(Returned)
        }
    },[selectionOption])

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                 <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={()=>{setGlobalFilterValue("")}} />
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={(e)=>{setGlobalFilterValue(e.target.value)}} placeholder="Search" />
                </IconField>
            </div>
        );
    };
    const tableHeader = renderHeader();


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
     <Card title="All Reports">
     <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                    <RadioButton inputId="all-rep-all" name="All" value="All" onChange={(e: RadioButtonChangeEvent) => setSelectionOption(e.value)} checked={selectionOption === 'All'} />
                    <label htmlFor="all-rep-all" className="ml-2">All</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="all-rep-delayed" name="Delayed" value="Delayed" onChange={(e: RadioButtonChangeEvent) => setSelectionOption(e.value)} checked={selectionOption === 'Delayed'} />
                    <label htmlFor="all-rep-delayed" className="ml-2">Delayed</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="all-rep-notreturned" name="Not-Returned" value="Not Returned" onChange={(e: RadioButtonChangeEvent) => setSelectionOption(e.value)} checked={selectionOption === 'Not Returned'} />
                    <label htmlFor="all-rep-notreturned" className="ml-2">Not Returned</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="all-rep-returned" name="Returned" value="Returned" onChange={(e: RadioButtonChangeEvent) => setSelectionOption(e.value)} checked={selectionOption === 'Returned'} />
                    <label htmlFor="all-rep-returned" className="ml-2">Returned</label>
                </div>
        
            </div>
        </div>
     </Card>

     <Card title={selectionOption} className="mt-2">
     <DataTable value={tableData} stripedRows header={tableHeader} removableSort globalFilter={globalFilterValue} scrollable footer={tableFooter} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  tableStyle={{ minWidth: '50rem' }}>
        <Column field="rollNumber" header="Roll Number" frozen className="font-bold"></Column>       
        <Column field="name" header="Name"></Column>       
        <Column field="hostelID" header="Hostel Id"></Column>       
        <Column field="requestType" header="Request Type"></Column>       
        <Column field="start" header="Started" sortable ></Column>       
        <Column field="end" header="Ended" sortable></Column>       
        <Column field="returnTime" header="Returned" ></Column>       
        <Column field="returnStatus" header="Return Status"></Column>       
        <Column field="accepted" header="Accepted By"></Column>       
    </DataTable>
     </Card>


      </div>
    </>
  );
}

export default AdminAllReports;
