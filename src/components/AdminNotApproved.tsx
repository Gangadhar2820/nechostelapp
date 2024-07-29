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
    startDate:string;
    endDate:string;
    fromTime:string;
    toTime:string;
    reason:string;
}

function AdminNotApproved() {
    const [selectionOption, setSelectionOption] = useState<string>('');

    const [tableData, setTableData] = useState<Request[]>([]);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const tableFooter = `Total : ${tableData ? tableData.length : 0} ${selectionOption} Requests.`

    const Permissions:Request[] = [
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"16/07/2024",endDate:"18/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"16/07/2024",endDate:"18/07/2024",fromTime:"5:30pm",toTime:"8:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"13/07/2024",endDate:"21/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"13/07/2024",endDate:"21/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"17/07/2024",endDate:"19/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"17/07/2024",endDate:"19/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"12/07/2024",endDate:"17/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"12/07/2024",endDate:"17/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"18/07/2024",endDate:"22/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"18/07/2024",endDate:"22/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"13/07/2024",endDate:"20/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"13/07/2024",endDate:"20/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
        {name:"Gangadhar",rollNumber:"21471A0521",hostelID:"BH",startDate:"11/07/2024",endDate:"20/07/2024",fromTime:"4:30pm",toTime:"7:30pm",reason:"Outing"},
    ]

    const Leaves:Request[] = [
        {name:"Ganga",rollNumber:"21471A0521",hostelID:"BH",startDate:"16/07/2024",endDate:"20/07/2024",fromTime:"5:30am",toTime:"5:30pm",reason:"Home"},
        {name:"Ganga",rollNumber:"21471A0521",hostelID:"BH",startDate:"16/07/2024",endDate:"20/07/2024",fromTime:"5:30am",toTime:"5:30pm",reason:"Home"},
        {name:"Ganga",rollNumber:"21471A0521",hostelID:"BH",startDate:"16/07/2024",endDate:"20/07/2024",fromTime:"5:30am",toTime:"5:30pm",reason:"Home"},
    ]
    
    useEffect(()=>{
        if(selectionOption === "Permissions"){
            setTableData(Permissions)
        }else if(selectionOption === "Leaves"){
            setTableData(Leaves);
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
     <Card title="Not Approved Requests">
     <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                    <RadioButton inputId="not-app-permissions" name="Permissions" value="Permissions" onChange={(e: RadioButtonChangeEvent) => setSelectionOption(e.value)} checked={selectionOption === 'Permissions'} />
                    <label htmlFor="not-app-permissions" className="ml-2">Permissions</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="not-app-leaves" name="Leaves" value="Leaves" onChange={(e: RadioButtonChangeEvent) => setSelectionOption(e.value)} checked={selectionOption === 'Leaves'} />
                    <label htmlFor="not-app-leaves" className="ml-2">Leaves</label>
                </div>
        
            </div>
        </div>
     </Card>

     <Card title={selectionOption} className="mt-2">
     <DataTable value={tableData} stripedRows header={tableHeader} removableSort globalFilter={globalFilterValue} scrollable footer={tableFooter} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  tableStyle={{ minWidth: '50rem' }}>
        <Column field="rollNumber" header="Roll Number" frozen className="font-bold"></Column>       
        <Column field="name" header="Name"></Column>       
        <Column field="hostelID" header="Hostel Id"></Column>       
        <Column field="startDate" header="Start Date" sortable ></Column>       
        <Column field="endDate" header="End Date" sortable></Column>       
        <Column field="fromTime" header="From Time" ></Column>       
        <Column field="toTime" header="To Time"></Column>       
        <Column field="reason" header="Reason"></Column>       
    </DataTable>
     </Card>


      </div>
    </>
  );
}

export default AdminNotApproved;
