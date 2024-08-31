import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { Student } from "../interfaces/Student";
import { getStudent } from "../../services/StudentService";
import ReqCard from "../student/ReqCard";
import { formatDate, parseDate } from "../interfaces/Date";


function AdminViewStudent() {

  const [rollNumber, setRollNumber] = useState<string>("");
  const [student,setStudent] = useState<Student|null>(null);


  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchFormValid, setIsSearchFormValid] = useState<boolean>(false);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isUpdateFormValid, setIsUpdateFormValid] = useState<boolean>(false);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const ViewStudentToast = useRef<Toast>(null);


  const validateSearchForm = () => {
    setIsSearchFormValid(false);
    const isRollValid = /^[a-zA-Z0-9]{10}$/.test(rollNumber);
    if (isRollValid) {
      setIsSearchFormValid(true);
    }
  };

  useEffect(() => {
    validateSearchForm();
  }, [rollNumber]);

  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearching(true);
    getStudent(rollNumber).then((data)=>{
      setStudent(data)
      setIsSearching(false);
    }).catch((err)=>{
      console.log(err)
    })
    
  };

  const handleStudentUpdate = () => {
    const accept = () => {
      setIsUpdating(true);
      setTimeout(() => {
        setIsUpdating(false);
        if (ViewStudentToast.current) {
          ViewStudentToast.current.show({
            severity: "success",
            summary: "Updated Successfully !",
            detail: "Student data has been updated",
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

  const handleStudentDelete = () => {
    const accept = () => {
      setIsDeleting(true);
      setTimeout(() => {
        setIsDeleting(false);
        setRollNumber("")
        setStudent(null)
        if (ViewStudentToast.current) {
          ViewStudentToast.current.show({
            severity: "error",
            summary: "Deleted Successfully !",
            detail: "Student has been removed",
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

  const validateUpdateForm = () => {
    setIsUpdateFormValid(false);
    const isHostelIdValid = student?.hostelId !== "label";
    const isRollValid = /^[a-zA-Z0-9]{10}$/.test(rollNumber);
    const isNameValid = student?.name !== "";
    const isCollegeValid = student?.college !== "label";
    const isYearValid = student?.year !== "label";
    const isGenderValid = student?.gender !== "";
    const isDOBValid =
      student?.dob !== null && student?.dob && student.dob.toString() !== "";
    const isPhonenoValid = /^[0-9]{10}$/.test(student?.phoneNo as string);
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(student?.email as string);
    const isParentNameValid = student?.parentName !== "";
    const isParentPhoneNoValid = /^[0-9]{10}$/.test(student?.parentPhoneNo as string);

    const isformValid =
      isRollValid &&
      isHostelIdValid &&
      isNameValid &&
      isCollegeValid &&
      isYearValid &&
      isGenderValid &&
      isPhonenoValid &&
      isParentNameValid &&
      isParentPhoneNoValid &&
      isDOBValid &&
      isEmailValid;

    if (isformValid) {
      setIsUpdateFormValid(true);
    } else {
      setIsUpdateFormValid(false);
    }
  };

  useEffect(() => {
    validateUpdateForm();
  }, [student]);


  return (
    <>
      <Toast ref={ViewStudentToast} position="center" />
      <ConfirmDialog />
      <div
        className="w-full"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Search Student">
          <form onSubmit={handleSearchFormSubmit} className="grid">
            <div className="col-12 sm:col-6 mt-3 ">
              <FloatLabel>
                <InputText
                  id="ad-view-rollno"
                  type="text"
                  className="w-full"
                  value={rollNumber}
                  onChange={(e) => {
                    setRollNumber(e.target.value.toUpperCase());
                  }}
                  required
                />
                <label htmlFor="ad-view-rollno">Roll Number</label>
              </FloatLabel>
            </div>
            <div className="col-12 sm:col-6 mt-3">
              <Button
                type="submit"
                label={isSearching ? "Searching" : "Search"}
                disabled={!isSearchFormValid || isSearching}
                className="w-full sm:w-auto text-center"
              >
                &nbsp;&nbsp;
                {isSearching && <i className="pi pi-spin pi-spinner"></i>}
              </Button>
            </div>
          </form>

        {student && (
            <form action="" className="grid mt-3">
            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-view-stu-rollno"
                  type="text"
                  className="w-12"
                  value={student.rollNo}
                  disabled
                  required
                />
                <label htmlFor="ad-view-stu-rollno">Roll Number</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <div className="custom-select-container w-12">
                <select
                  className="custom-select"
                  value={student?.hostelId}
                  onChange={(e) => {
                    setStudent({
                      ...student,
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
                  value={student.name}
                  onChange={(e) => {
                    setStudent({
                      ...student,
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
                      setStudent({
                        ...student,
                        gender: e.value,
                      } as Student)
                    }
                    checked={student.gender === "male"}
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
                      setStudent({
                        ...student,
                        gender: e.value,
                      } as Student)
                    }
                    checked={student.gender === "female"}
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
                      setStudent({
                        ...student,
                        gender: e.value,
                      } as Student)
                    }
                    checked={student.gender === "other"}
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
                  value={parseDate(
                    formatDate(new Date(student?.dob as Date))
                  )}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      dob: e.value,
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
                  value={student.phoneNo}
                  onChange={(e) => {
                    setStudent({
                      ...student,
                      phoneNo: e.target.value,
                    } as Student);
                  }}
                  required
                />
                <label htmlFor="ad-stu-phoneno">Phone Number</label>
              </FloatLabel>
              {!/^[0-9]{10}$/.test(student.phoneNo) &&
                student.phoneNo !== "" && (
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
                  value={student.email}
                  onChange={(e) => {
                    setStudent({
                      ...student,
                      email: e.target.value,
                    } as Student);
                  }}
                  required
                />
                <label htmlFor="ad-stu-rollno">EMail</label>
              </FloatLabel>
              {!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                student.email
              ) &&
                student.email !== "" && (
                  <small id="email-help" className="text-red-500">
                    Invalid Email Format
                  </small>
                )}
            </div>

            <div className="col-12 sm:col-6 md:col-4 mt-3">
              <div className="custom-select-container w-full">
                <select
                  className="custom-select"
                  value={student.college}
                  onChange={(e) => {
                    setStudent({
                      ...student,
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
                  value={student.year}
                  onChange={(e) => {
                    setStudent({
                      ...student,
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
                  value={student.branch}
                  onChange={(e) => {
                    setStudent({
                      ...student,
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
                  value={student.parentName}
                  onChange={(e) => {
                    setStudent({
                      ...student,
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
                  value={student.parentPhoneNo}
                  onChange={(e) => {
                    setStudent({
                      ...student,
                      parentPhoneNo: e.target.value,
                    } as Student);
                  }}
                  required
                />
                <label htmlFor="ad-stu-fathermobile">Father Mobile No</label>
              </FloatLabel>
              {!/^[0-9]{10}$/.test(student.parentPhoneNo) &&
                student.parentPhoneNo !== "" && (
                  <small id="fphoneno-help" className="text-red-500">
                    Phone number must be 10 digits
                  </small>
                )}
            </div>
              <div className="col-6 md:col-6 lg:col-4 mt-3">
                <Button
                  type="button"
                  className="bg-teal-600"
                  onClick={handleStudentUpdate}
                  disabled={!isUpdateFormValid}
                >
                  {isUpdating && <i className="pi pi-spin pi-spinner"></i>}
                  &nbsp;&nbsp;
                  {isUpdating ? "Updating" : "Update"}
                </Button>
              </div>
              <div className="col-6 md:col-6 lg:col-4 mt-3 ">
                <Button
                  className="bg-red-500"
                  type="button"
                  onClick={handleStudentDelete}
                >
                  {isDeleting && <i className="pi pi-spin pi-spinner"></i>}
                  &nbsp;&nbsp;
                  {isDeleting ? "Deleting" : "Delete"}
                </Button>
              </div>
            </form>
        )}
        </Card>


        {student !== null && student?.lastRequest !== null && (
          <Card title="Last Request" >
            <ReqCard request={student?.lastRequest} />
          </Card>
        )}


      </div>
    </>
  );
}

export default AdminViewStudent;
