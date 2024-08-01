import React, { useContext } from "react";
import { Student } from "../interfaces/Student";
import { UserContext } from "./Home";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Card } from "primereact/card";

function Profile() {
  const { user, updateUser } = useContext(UserContext);

  return (
    <>
      <div
        className="p-2 w-10"
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
                    user?.currentStatus === "HOSTEL"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  } text-white-alpha-90`}
                  icon={"pi pi-circle-fill"}
                  label={user?.currentStatus}
                ></Chip>
              </div>
            </div>

            <ul className="list-none p-0 m-0">
              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Name</div>
                  <div className="text-900 w-6">
                    {user?.name}
                  </div>
                </div>
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Roll Number</div>
                  <div className="text-900 w-6">
                    {user?.rollNo}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Hostel ID</div>
                  <div className="text-900 w-6">
                    {user?.hostelId}
                  </div>
                </div>
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">College</div>
                  <div className="text-900 w-6 ">
                    {user?.college}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 w-6 font-medium">Year</div>
                  <div className="text-900 w-6">
                    {user?.year}
                  </div>
                </div>
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Branch</div>
                  <div className="text-900 w-6">
                    {user?.branch}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 w-6 font-medium">Gender</div>
                  <div className="text-900 w-6">
                    {user?.gender}
                  </div>
                </div>
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Date Of Birth</div>
                  <div className="text-900 w-6">
                    {user?.dob.getFullYear()}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 w-6 font-medium">Phone No</div>
                  <div className="text-900 w-6">
                    {user?.phoneNo}
                  </div>
                </div>
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Email</div>
                  <div className="text-900 w-6">
                    {user?.email}
                  </div>
                </div>
              </li>

              <li className="grid py-3 px-2 border-top-1 border-300">
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 w-6 font-medium">Parent Name</div>
                  <div className="text-900 w-6">
                    {user?.parentName}
                  </div>
                </div>
                <div className="flex w-12 md:w-6 align-items-center justify-content-start">
                  <div className="text-500 font-medium w-6">Parent PhoneNo</div>
                  <div className="text-900 w-6">
                    {user?.parentPhoneNo}
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

export default Profile;
