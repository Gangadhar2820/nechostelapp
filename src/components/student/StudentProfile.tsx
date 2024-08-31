import React, { useContext } from "react";
import { StudentContext } from "./StudentHome";
import { Chip } from "primereact/chip";
import { Card } from "primereact/card";

import { formatDate } from "../interfaces/Date";

function StudentProfile() {
  const { student, setStudent } = useContext(StudentContext);

  return (
    <>
      <div
        className="p-1 w-12"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card>
          <div className="surface-0">
            <div className="flex align-items-start justify-content-between">
              <div className="font-medium text-3xl text-900 mb-3">
                <i className="pi pi-user font-medium text-3xl text-900"></i>
                &nbsp;&nbsp;My Profile
              </div>
              <div className="status">
                <Chip
                  className={`${
                    student?.currentStatus === "HOSTEL"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  } text-white-alpha-90`}
                  icon={"pi pi-circle-fill"}
                  label={student?.currentStatus}
                ></Chip>
              </div>
            </div>

            <ul className="list-none p-0 m-0" style={{wordWrap:"break-word"}}>
              <li className="grid  py-3 px-2 border-top-1 border-300">
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Name</div>
                  <div className="text-900 w-6">
                    {student?.name}
                  </div>
                </div>
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Roll Number</div>
                  <div className="text-900 w-6">
                    {student?.rollNo}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Hostel ID</div>
                  <div className="text-900 w-6">
                    {student?.hostelId}
                  </div>
                </div>
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">College</div>
                  <div className="text-900 w-6 ">
                    {student?.college}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex  mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 w-6 font-medium">Year</div>
                  <div className="text-900 w-6">
                    {student?.year}
                  </div>
                </div>
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Branch</div>
                  <div className="text-900 w-6">
                    {student?.branch}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 w-6 font-medium">Gender</div>
                  <div className="text-900 w-6">
                    {student?.gender}
                  </div>
                </div>
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Date Of Birth</div>
                  <div className="text-900 w-6">
                    {formatDate(new Date(student?.dob))}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 w-6 font-medium">Phone No</div>
                  <div className="text-900 w-6">
                    {student?.phoneNo}
                  </div>
                </div>
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6" >Email</div>
                  <div className="text-900 w-6" style={{wordWrap:"break-word"}} >
                    {student?.email}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 w-6 font-medium">Parent Name</div>
                  <div className="text-900 w-6">
                    {student?.parentName}
                  </div>
                </div>
                <div className="flex mt-1 mb-1 w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Parent PhoneNo</div>
                  <div className="text-900 w-6">
                    {student?.parentPhoneNo}
                  </div>
                </div>
              </li>

              
            </ul>
          </div>
        </Card>
      </div>
    </>
  );
}

export default StudentProfile;
