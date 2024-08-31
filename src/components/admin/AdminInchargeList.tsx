import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
import { Incharge } from '../interfaces/Incharge';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { getAllIncharges } from '../../services/StudentService';

function AdminInchargeList() {

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hostelId,setHostelId] = useState<string>("label");

  const [incharges,setIncharges] = useState<Incharge[]>([]);

  const handleIncSearchForm = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setIsSearching(true);

    getAllIncharges(hostelId).then((data)=>{
      setIsSearching(false);
      setIncharges(data.incharges);
    }).catch((err)=>{
      console.log("something wrong",err)
    })
  

  }


  return (
    <>
    <div
        className="p-2 w-full"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Incharge List">
          <form onSubmit={handleIncSearchForm} className="grid">
          <div className="col-12 sm:col-6 mt-3">
              <div className="custom-select-container w-12">
                <select
                  className="custom-select"
                  value={hostelId}
                  onChange={(e) => {
                    setHostelId(e.target.value)
                  }}
                >
                  <option value="label" disabled>
                    Hostel ID
                  </option>
                  <option value="all">All</option>
                  <option value="BH1">BH1</option>
                  <option value="GH1">GH1</option>
                </select>
              </div>
            </div>

            <div className="col-12 sm:col-6 mt-3 ">
              <Button
                type="submit"
                label={isSearching ? "Searching" : "Search"}
                className="w-full sm:w-auto text-center"
                disabled={isSearching}
              >
                &nbsp;&nbsp;
                {isSearching && <i className="pi pi-spin pi-spinner"></i>}
              </Button>
            </div>
          </form>
          </Card>
          {incharges && (
          <Card className="mt-2">
            <DataTable
              value={incharges}
              stripedRows
              // header={tableHeader}
              removableSort
              // globalFilter={globalFilterValue}
              scrollable
              // footer={tableFooter}
              // paginator
              rows={20}
              // rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="eid"
                header="Employee ID"
                frozen
                sortable
                className="font-bold"
              ></Column>
              <Column field="hostelId" header="Hostel ID" sortable></Column>
              <Column field="name" header="Name"></Column>
              <Column field="phoneNo" header="Phone No"></Column>
              <Column field="designation" header="Designation"></Column>
             
            </DataTable>
          </Card>
        )}
          </div>


    </>
  )
}

export default AdminInchargeList