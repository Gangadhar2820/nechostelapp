import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { AdminStudentRegisteration } from "../../services/RegisterService";
import { Student } from "../interfaces/Student";
import AdminStudentBulkDataUpload from "./AdminStudentBulkDataUpload";

function AdminAddStudent() {
  const [newStudent, setNewStudent] = useState<Student>({
    hostelId: "label",
    rollNo: "",
    name: "",
    college: "label",
    branch: "label",
    year: 0,
    gender: "",
    dob: new Date(),
    phoneNo: "",
    email: "",
    parentPhoneNo: "",
    parentName: "",
    currentStatus: "HOSTEL",
    requestCount: 0,
    lastRequest: null,
  });

  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const ValidateForm = () => {
    setIsFormValid(false);
    const isRollValid = /^[a-zA-Z0-9]{10}$/.test(newStudent.rollNo);
    const isHostelIdValid = newStudent.hostelId !== "label";
    const isFullNameValid = newStudent.name !== "";
    const isYearValid = newStudent.year !== 0;
    const isBranchValid = newStudent.branch !== "label";
    const isCollegeValid = newStudent.college !== "label";
    const isGenderValid = newStudent.gender !== "";
    const isPhonenoValid = /^[0-9]{10}$/.test(newStudent.phoneNo);
    const isFatherNameValid = newStudent.parentName !== "";
    const isFatherMobileValid = /^[0-9]{10}$/.test(newStudent.parentPhoneNo);
    const isDOBValid =
      newStudent.dob !== null &&
      newStudent.dob &&
      newStudent.dob.toString() !== "";
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newStudent.email);

    const isformValid =
      isRollValid &&
      isHostelIdValid &&
      isFullNameValid &&
      isYearValid &&
      isBranchValid &&
      isGenderValid &&
      isPhonenoValid &&
      isFatherNameValid &&
      isFatherMobileValid &&
      isDOBValid &&
      isEmailValid &&
      isCollegeValid;

    if (isformValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    ValidateForm();
  }, [newStudent]);

  const adminStudentToast = useRef<Toast>(null);

  const handleAdminStudentRegister = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsRegistering(true);

    AdminStudentRegisteration(newStudent)
      .then((data) => {
        setIsRegistering(false);
        const { success, message } = data;
        if (success) {
          if (adminStudentToast.current) {
            adminStudentToast.current.show({
              severity: "success",
              summary: "Registered Successfully !",
              detail: "New Student has been added",
            });
          }
          setNewStudent({
            hostelId: "",
            rollNo: "",
            name: "",
            college: "label",
            branch: "label",
            year: 0,
            gender: "",
            dob: new Date(),
            phoneNo: "",
            email: "",
            parentPhoneNo: "",
            parentName: "",
            currentStatus: "HOSTEL",
            requestCount: 0,
            lastRequest: null,
          });
        } else {
          if (adminStudentToast.current) {
            adminStudentToast.current.show({
              severity: "error",
              summary: "Register Failed",
              detail: "Student already exist",
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDataUpload = () => {
    console.log("data uploaded");
  };

  return (
    <>
      <Toast ref={adminStudentToast} position="bottom-center"></Toast>

      <div
        className="p-2 w-10"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Add Student">
          <form
            action=""
            className="grid"
            onSubmit={handleAdminStudentRegister}
          >
            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-rollno"
                  type="text"
                  className="w-12"
                  value={newStudent.rollNo}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      rollNo: e.target.value.toUpperCase(),
                    } as Student);
                  }}
                  required
                />
                <label htmlFor="ad-stu-rollno">Roll Number</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <div className="custom-select-container w-12">
                <select
                  className="custom-select"
                  value={newStudent?.hostelId}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      hostelId: e.target.value.toUpperCase(),
                    } as Student);
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
                  id="ad-stu-fullname"
                  type="text"
                  className="w-12"
                  value={newStudent.name}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      name: e.target.value,
                    } as Student);
                  }}
                  required
                />
                <label htmlFor="ad-stu-fullname">Full Name</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 lg:col-8 mt-3 flex">
              <h4 className="mr-3">Gender</h4>
              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ad-stu-male"
                    name="gender"
                    value="male"
                    onChange={(e: RadioButtonChangeEvent) =>
                      setNewStudent({
                        ...newStudent,
                        gender: e.value,
                      } as Student)
                    }
                    checked={newStudent.gender === "male"}
                  />
                  <label htmlFor="ad-stu-male" className="ml-2">
                    Male
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ad-stu-female"
                    name="gender"
                    value="female"
                    onChange={(e: RadioButtonChangeEvent) =>
                      setNewStudent({
                        ...newStudent,
                        gender: e.value,
                      } as Student)
                    }
                    checked={newStudent.gender === "female"}
                  />
                  <label htmlFor="ad-stu-female" className="ml-2">
                    Female
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ad-stu-other"
                    name="gender"
                    value="other"
                    onChange={(e: RadioButtonChangeEvent) =>
                      setNewStudent({
                        ...newStudent,
                        gender: e.value,
                      } as Student)
                    }
                    checked={newStudent.gender === "other"}
                  />
                  <label htmlFor="ad-stu-other" className="ml-2">
                    Other
                  </label>
                </div>
              </div>
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <Calendar
                  required
                  dateFormat="dd/mm/yy"
                  inputId="ad-stu-birth_date"
                  value={newStudent.dob}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      dob: e.target.value,
                    } as Student)
                  }
                  className="w-12"
                />
                <label htmlFor="ad-stu-birth_date">Date of Birth</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-phoneno"
                  type="text"
                  className="w-12"
                  value={newStudent.phoneNo}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      phoneNo: e.target.value,
                    } as Student);
                  }}
                  required
                />
                <label htmlFor="ad-stu-phoneno">Phone Number</label>
              </FloatLabel>
              {!/^[0-9]{10}$/.test(newStudent.phoneNo) &&
                newStudent.phoneNo !== "" && (
                  <small id="phoneno-help" className="text-red-500">
                    Phone number must be 10 digits
                  </small>
                )}
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-email"
                  type="text"
                  className="w-12"
                  value={newStudent.email}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      email: e.target.value,
                    } as Student);
                  }}
                  required
                />
                <label htmlFor="ad-stu-rollno">EMail</label>
              </FloatLabel>
              {!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                newStudent.email
              ) &&
                newStudent.email !== "" && (
                  <small id="email-help" className="text-red-500">
                    Invalid Email Format
                  </small>
                )}
            </div>

            <div className="col-12 sm:col-6 md:col-4 mt-3">
              <div className="custom-select-container w-full">
                <select
                  className="custom-select"
                  value={newStudent.college}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      college: e.target.value,
                    } as Student);
                  }}
                >
                  <option value="label" disabled>
                    Select College
                  </option>
                  <option value="NEC">NEC</option>
                  <option value="NIPS">NIPS</option>
                </select>
              </div>
            </div>

            <div className="col-12 sm:col-6 md:col-4 mt-3">
              <div className="custom-select-container w-full">
                <select
                  className="custom-select"
                  value={newStudent.year}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      year: Number(e.target.value),
                    } as Student);
                  }}
                >
                  <option value="0" disabled>
                    Select Year
                  </option>
                  <option value="1">I Year</option>
                  <option value="2">II Year</option>
                  <option value="3">III Year</option>
                  <option value="4">IV Year</option>
                </select>
              </div>
            </div>

            <div className="col-12 sm:col-6 md:col-4 mt-3">
              <div className="custom-select-container w-full">
                <select
                  className="custom-select"
                  value={newStudent.branch}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      branch: e.target.value,
                    } as Student);
                  }}
                >
                  <option value="label" disabled>
                    Select Branch
                  </option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
              </div>
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-fathername"
                  type="text"
                  className="w-12"
                  value={newStudent.parentName}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      parentName: e.target.value,
                    } as Student);
                  }}
                  required
                />
                <label htmlFor="ad-stu-fathername">Father's Name</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-fathermobile"
                  type="text"
                  className="w-12"
                  value={newStudent.parentPhoneNo}
                  onChange={(e) => {
                    setNewStudent({
                      ...newStudent,
                      parentPhoneNo: e.target.value,
                    } as Student);
                  }}
                  required
                />
                <label htmlFor="ad-stu-fathermobile">Father Mobile No</label>
              </FloatLabel>
              {!/^[0-9]{10}$/.test(newStudent.parentPhoneNo) &&
                newStudent.parentPhoneNo !== "" && (
                  <small id="fphoneno-help" className="text-red-500">
                    Phone number must be 10 digits
                  </small>
                )}
            </div>
            <div className="col-12 md:col-6 lg:col-4 mt-3 flex justify-content-start">
              <Button type="submit" disabled={!isFormValid || isRegistering}>
                {isRegistering && <i className="pi pi-spin pi-spinner"></i>}
                &nbsp;&nbsp;
                {isRegistering ? "Registering" : "Register"}
              </Button>
            </div>
          </form>
        </Card>

        <Divider align="center">
          <span className="p-tag">OR</span>
        </Divider>

        <Card title="Import Data (.xls / .xlsx)">
        
        <AdminStudentBulkDataUpload/>
        </Card>
      </div>
    </>
  );
}

export default AdminAddStudent;
