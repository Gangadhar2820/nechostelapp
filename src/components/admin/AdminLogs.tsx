import { log } from 'console'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { FloatLabel } from 'primereact/floatlabel'
import { Nullable } from 'primereact/ts-helpers'
import React, { useState } from 'react'
import { formatDate, formatDateWithTime } from '../interfaces/Date'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'

import {LOG} from "../interfaces/Log"
import { getLogs } from '../../services/AdminService'

function AdminLogs() {

  const [date, setDate] = useState<Nullable<Date>>(null);
  const [isSearching,setIsSearching] = useState<boolean>(false);
  const [logs,setLogs] = useState<LOG[] | null>(null);

  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");



  const handleLogsFormSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setIsSearching(true);
    getLogs(date as Date).then((data)=>{
      setIsSearching(false);
      setLogs(data)
    }).catch((err)=>{
      console.log("something went wrong",err)
    })

  }

  const renderHeader = ()=>{
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label=""
          outlined
          onClick={() => {
            setGlobalFilterValue("");
          }}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            id="ad-pen-req-filter"
            onChange={(e) => {
              setGlobalFilterValue(e.target.value);
            }}
            placeholder="Search"
          />
        </IconField>
      </div>
    );
  }

  const tableHeader = renderHeader();

  const tableFooter = <strong>Total : {logs?.length} logs</strong>;

  const dateTemplate = (data: any) => {
      const date = data?.date;
      const formatDate = data ? formatDateWithTime(new Date(date)) : "";
      return formatDate;
  };

  return (
    <>
      <div
        className="w-full"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
         <Card title="Trace Logs">
          <form onSubmit={handleLogsFormSubmit} className="grid">
                <div className="col-12 sm:col-6  mt-3">
                  <FloatLabel>
                    <Calendar
                      required
                      inputId="inc-arr-req-fromDate"
                      value={date}
                      onChange={(e) => setDate(e.value)}
                      className="w-12"
                      showButtonBar
                      hourFormat="12"
                      dateFormat="dd/mm/yy"

                    />
                    <label htmlFor="inc-arr-req-fromDate">Enter Date</label>
                  </FloatLabel>
                </div> 

            <div className="col-12 sm:col-6 md:col-4 mt-3">
              <Button type="submit" disabled={isSearching}
                className="w-full sm:w-auto text-center"
                label={isSearching ? "Searching" : "Search"}
             >
                &nbsp;&nbsp;
                {isSearching && <i className="pi pi-spin pi-spinner"></i>}
              </Button>
            </div>
          </form>

          { logs && <>
            <DataTable
        value={logs}
        stripedRows
        className='mt-2'
        header={tableHeader}
        footer={tableFooter}
        selectionMode="single"
        globalFilter={globalFilterValue}
        removableSort
      >
        <Column
                header="Logged Time"
                field="date"
                body={dateTemplate}
                // style={{ minWidth: "120px" }}
                sortable
              ></Column>

        <Column field="userId" header="User ID" sortable></Column>
        <Column field="username" header="Username"></Column>
        <Column field="action" header="Action" className='w-auto'></Column>

      </DataTable>
          </>}
          </Card>

      </div>
    </>
  )
}

export default AdminLogs