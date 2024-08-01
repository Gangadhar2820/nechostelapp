import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import AdminStudentDataUpload from "./AdminStudentDataUpload";
import { AdminStudentRegisteration } from "../services/RegisterService";

interface Semester {
  name: string;
  code: string;
}

interface Department {
  name: string;
  code: string;
}

function AdminStudentRegister() {
  const [rollNumber, setRollNumber] = useState<string>("");
  const [hostelId, setHostelId] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phoneno, setPhoneno] = useState<string>("");
  const [fatherName, setFatherName] = useState<string>("");
  const [fatherMobile, setFatherMobile] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Nullable<Date>>(null);
  const [email, setEmail] = useState<string>("");

  const Semesters: Semester[] = [
    { name: "1-1 Semester", code: "1" },
    { name: "1-2 Semester", code: "2" },
    { name: "2-1 Semester", code: "3" },
    { name: "2-2 Semester", code: "4" },
    { name: "3-1 Semester", code: "5" },
    { name: "3-2 Semester", code: "6" },
    { name: "4-1 Semester", code: "7" },
    { name: "4-2 Semester", code: "8" },
  ];

  const Departments: Department[] = [
    { name: "Computer Science Engineering", code: "CSE" },
    { name: "Electrical and Communication Engineering", code: "ECE" },
    { name: "Electrical and Electronics Engineering", code: "EEE" },
    { name: "Mechanical Engineering", code: "MECH" },
    { name: "Civil Engineering", code: "CIVIL" },
  ];

  const [semester, setSemester] = useState<Semester|null>(null);
  const [department, setDepartment] = useState<Department|null>(null);

  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const ValidateForm = () => {
    setIsFormValid(false);
    const isRollValid = /^[a-zA-Z0-9]{10}$/.test(rollNumber);
    const isHostelIdValid = hostelId !== "";
    const isFNameValid = firstname !== "";
    const isLNameValid = lastname !== "";
    const isSemValid = semester !== null;
    const isDeptValid = department !== null;
    const isGenderValid = gender !== "";
    const isPhonenoValid = /^[0-9]{10}$/.test(phoneno);
    const isFatherNameValid = fatherName !== "";
    const isFatherMobileValid = /^[0-9]{10}$/.test(fatherMobile);
    const isDOBValid =
      dateOfBirth !== null && dateOfBirth && dateOfBirth.toString() !== "";
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const isformValid =
      isRollValid &&
      isHostelIdValid &&
      isFNameValid &&
      isLNameValid &&
      isSemValid &&
      isDeptValid &&
      isGenderValid &&
      isPhonenoValid &&
      isFatherNameValid &&
      isFatherMobileValid &&
      isDOBValid &&
      isEmailValid;

    if (isformValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    ValidateForm();
  }, [
    rollNumber,
    hostelId,
    firstname,
    lastname,
    gender,
    phoneno,
    fatherName,
    fatherMobile,
    dateOfBirth,
    email,semester,department
  ]);

  const adminStudentToast = useRef<Toast>(null);

  const handleAdminStudentRegister = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsRegistering(true);

    AdminStudentRegisteration(rollNumber,hostelId,firstname,lastname,gender,phoneno,fatherName,fatherMobile,dateOfBirth,email,JSON.stringify(semester),JSON.stringify(department))
    .then((data)=>{
      const {success,message} = data;
      setIsRegistering(false);
    }).catch((err)=>{
      console.log(err)
    })

    // setTimeout(() => {
    //   if (rollNumber !== "21471A0521") {
    //     if (adminStudentToast.current) {
    //       adminStudentToast.current.show({
    //         severity: "success",
    //         summary: "Registered Successfully !",
    //         detail: "New Student has been added",
    //       });
    //     }
    //   } else {
    //     if (adminStudentToast.current) {
    //       adminStudentToast.current.show({
    //         severity: "error",
    //         summary: "Register Failed",
    //         detail: "Student already exist",
    //       });
    //     }
    //   }
    // }, 2000);
  };


  const onDataUpload = ()=>{
    console.log("data uploaded")
  }

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
                  className="w-12 md:w-8"
                  value={rollNumber}
                  onChange={(e) => {
                    setRollNumber(e.target.value);
                  }}
                  required
                />
                <label htmlFor="ad-stu-rollno">Roll Number</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-hostelid"
                  type="text"
                  className="w-12 md:w-8"
                  value={hostelId}
                  onChange={(e) => {
                    setHostelId(e.target.value);
                  }}
                  required
                />
                <label htmlFor="ad-stu-hostelid">Hostel Id</label>
              </FloatLabel>
            </div>
            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-firstname"
                  type="text"
                  className="w-12 md:w-8"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  required
                />
                <label htmlFor="ad-stu-firstname">Firstname</label>
              </FloatLabel>
            </div>
            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-lastname"
                  type="text"
                  className="w-12 md:w-8"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  required
                />
                <label htmlFor="ad-stu-lastname">Lastname</label>
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
                    onChange={(e: RadioButtonChangeEvent) => setGender(e.value)}
                    checked={gender === "male"}
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
                    onChange={(e: RadioButtonChangeEvent) => setGender(e.value)}
                    checked={gender === "female"}
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
                    onChange={(e: RadioButtonChangeEvent) => setGender(e.value)}
                    checked={gender === "other"}
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
                  inputId="ad-stu-birth_date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.value)}
                  className="w-12 md:w-8"
                />
                <label htmlFor="ad-stu-birth_date">Birth Date</label>
              </FloatLabel>
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-phoneno"
                  type="text"
                  className="w-12 md:w-8"
                  value={phoneno}
                  onChange={(e) => {
                    setPhoneno(e.target.value);
                  }}
                  required
                />
                <label htmlFor="ad-stu-phoneno">Phone Number</label>
              </FloatLabel>
              {!/^[0-9]{10}$/.test(phoneno) && phoneno !== "" && (
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
                  className="w-12 md:w-8"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <label htmlFor="ad-stu-rollno">EMail</label>
              </FloatLabel>
              {!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                email
              ) &&
                email !== "" && (
                  <small id="email-help" className="text-red-500">
                    Invalid Email Format
                  </small>
                )}
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <Dropdown
                required
                value={semester}
                onChange={(e: DropdownChangeEvent) => setSemester(e.value)}
                options={Semesters}
                optionLabel="name"
                placeholder="Semester"
                className="w-12 md:w-8"
              />
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <Dropdown
                required
                value={department}
                onChange={(e: DropdownChangeEvent) => setDepartment(e.value)}
                options={Departments}
                optionLabel="name"
                placeholder="Department"
                className="w-12 md:w-8"
              />
            </div>

            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <FloatLabel>
                <InputText
                  id="ad-stu-fathername"
                  type="text"
                  className="w-12 md:w-8"
                  value={fatherName}
                  onChange={(e) => {
                    setFatherName(e.target.value);
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
                  className="w-12 md:w-8"
                  value={fatherMobile}
                  onChange={(e) => {
                    setFatherMobile(e.target.value);
                  }}
                  required
                />
                <label htmlFor="ad-stu-fathermobile">Father Mobile No</label>
              </FloatLabel>
              {!/^[0-9]{10}$/.test(fatherMobile) && fatherMobile !== "" && (
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
          <AdminStudentDataUpload/>

        </Card>

        
      </div>
    </>
  );
}

export default AdminStudentRegister;
