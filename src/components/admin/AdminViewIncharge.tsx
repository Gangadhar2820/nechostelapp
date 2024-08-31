import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { Incharge } from "../interfaces/Incharge";
import { getIncharge } from "../../services/InchargeService";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import InchargeCard from "../student/InchargeCard";

function AdminViewIncharge() {
  const [incEID, setIncEID] = useState<string>("");

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [incharge, setIncharge] = useState<Incharge | null>(null);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [enableEdit,setEnableEdit] = useState<boolean>(false);


  const mytoast = useRef<Toast>(null);


  const ValidateForm = () => {
    setIsFormValid(false);
    if (
      incharge?.hostelId !== "label" &&
      incharge?.name !== "" &&
      /^[0-9]{10}$/.test(incharge?.phoneNo as string) &&
      incharge?.eid != "" &&
      incharge?.designation !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    ValidateForm();
  }, [incharge]);

  const handleIncSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearching(true);
    getIncharge(incEID)
      .then((data) => {
        setIncharge(data);
        setIsSearching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInchargeUpdate = () => {
    const accept = () => {
      setIsUpdating(true);
      setTimeout(() => {
        setIsUpdating(false);
        if (mytoast.current) {
          mytoast.current.show({
            severity: "success",
            summary: "Updated Successfully !",
            detail: "Incharge data has been updated",
          });
        }
      }, 2000);
    };
    const reject = () => {};

    confirmDialog({
      message: "Do you want to Update this record?",
      header: "Update Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-success",
      accept,
      reject,
    });
  };

  const handleInchargeDelete = () => {
    const accept = () => {
      setIsDeleting(true);
      setTimeout(() => {
        setIsDeleting(false);
        if (mytoast.current) {
          mytoast.current.show({
            severity: "error",
            summary: "Deleted Successfully !",
            detail: "Incharge has been removed",
          });
        }
      }, 2000);
    };
    const reject = () => {};

    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  return (
    <>
      <Toast ref={mytoast} position="center"></Toast>
      <ConfirmDialog />


      <div
        className="p-2 w-full"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Search Incharge">
          <form onSubmit={handleIncSearchForm} className="grid">
            <div className="col-12 sm:col-6 mt-3 ">
              <FloatLabel>
                <InputText
                  id="ad-view-rollno"
                  type="text"
                  className="w-full"
                  value={incEID}
                  onChange={(e) => {
                    setIncEID(e.target.value.toUpperCase());
                  }}
                  required
                />
                <label htmlFor="ad-view-rollno">EID</label>
              </FloatLabel>
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

          {incharge && 
          <Button className="m-2" icon={ enableEdit?"pi pi-times": "pi pi-pen-to-square"}
           severity={ enableEdit ? "warning" : "info" }
           label={enableEdit ? "Cancel" : "Edit"}
           onClick={()=>{
            setEnableEdit(prevValue=>!prevValue)
           }} style={{float:"right"}}></Button>}

          {incharge ? ((enableEdit ? 
            <form action="" className="grid mt-6">
              <div className="col-12 md:col-6 lg:col-4  mt-3">
                <FloatLabel>
                  <InputText
                    id="ad-vw-inc-eid"
                    type="text"
                    className="w-12 "
                    value={incharge?.eid}
                    required
                    disabled
                  />
                  <label htmlFor="ad-vw-inc-eid">EID</label>
                </FloatLabel>
              </div>

              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <div className="custom-select-container w-12">
                  <select
                    className="custom-select"
                    value={incharge?.hostelId}
                    onChange={(e) => {
                      setIncharge({
                        ...incharge,
                        hostelId: e.target.value.toUpperCase(),
                      } as Incharge);
                    }}
                  >
                    <option value="label" disabled>
                      Hostel ID
                    </option>
                    <option value="BH1">BH1</option>
                    <option value="GH1">GH1</option>
                  </select>
                </div>
              </div>

              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <FloatLabel>
                  <InputText
                    id="ad-vw-inc-name"
                    type="text"
                    className="w-12 "
                    value={incharge?.name}
                    onChange={(e) => {
                      setIncharge({
                        ...incharge,
                        name: e.target.value,
                      } as Incharge);
                    }}
                    required
                  />
                  <label htmlFor="ad-vw-inc-name">Name</label>
                </FloatLabel>
              </div>
              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <FloatLabel>
                  <InputText
                    id="ad-vw-inc-phoneno"
                    type="text"
                    className="w-12 "
                    value={incharge?.phoneNo}
                    onChange={(e) => {
                      setIncharge({
                        ...incharge,
                        phoneNo: e.target.value,
                      } as Incharge);
                    }}
                    required
                  />
                  <label htmlFor="ad-vw-inc-phoneno">Phone Number</label>
                </FloatLabel>
                {!/^[0-9]{10}$/.test(incharge?.phoneNo as string) &&
                  incharge?.phoneNo !== "" && (
                    <small id="phoneno-help" className="text-red-500">
                      Phone number must be 10 digits
                    </small>
                  ) }
              </div>

              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <FloatLabel>
                  <InputText
                    id="ad-vw-inc-designation"
                    type="text"
                    className="w-12"
                    value={incharge?.designation}
                    onChange={(e) => {
                      setIncharge({
                        ...incharge,
                        designation: e.target.value,
                      } as Incharge);
                    }}
                    required
                  />
                  <label htmlFor="ad-vw-inc-designation">Designation</label>
                </FloatLabel>
              </div>

              <div className="col-12 mt-3 flex justify-content-around">
                <Button
                  type="button"
                  onClick={handleInchargeUpdate}
                  disabled={!isFormValid || isUpdating}
                  severity="success"
                  icon={ !isUpdating && "pi pi-save"}
                >
                  {isUpdating && <i className="pi pi-spin pi-spinner"></i>}
                  &nbsp;&nbsp;
                  {isUpdating ? "Updating" : "Update"}
                </Button>

                <Button type="button" severity="danger"
                  icon={ !isDeleting && "pi pi-trash"}
                  onClick={handleInchargeDelete}>
                  {isDeleting && <i className="pi pi-spin pi-spinner"></i>}
                  &nbsp;&nbsp;
                  {isDeleting ? "Deleting" : "Delete"}
                </Button>
              </div>
            </form>
          :
          <InchargeCard  incharge={incharge} showId={true}/>
          )) : <p>No Data Found</p>}
        </Card>
      </div>
    </>
  );
}

export default AdminViewIncharge;
