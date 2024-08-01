import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { Nullable } from "primereact/ts-helpers";
import React, { useEffect, useRef, useState } from "react";

interface Student {
  rollNumber: string;
  hostelId: string;
  firstname: string;
  lastname: string;
  gender: "male" | "female" | "other";
  dob: string;
  mobileno: string;
  email: string;
  semester: string;
  department: string;
  fathername: string;
  fathermobileno: string;
}

interface Semester {
  name: string;
  code: string;
}

interface Department {
  name: string;
  code: string;
}

function AdminViewStudent() {
  const [stuRollNumber, setStuRollNumber] = useState<string>("");

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
  const [semester, setSemester] = useState<Semester | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);

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

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchFormValid, setIsSearchFormValid] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isUpdateFormValid, setIsUpdateFormValid] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const ViewStudentToast = useRef<Toast>(null);

  const [listSemester,setListSemester] = useState<Semester | null>(null);
  const [listDepartment,setListDepartment] = useState<Department | null>(null);
  const [isListSearching,setIsListSearching] = useState<boolean>(false);


  const [studentsList,setStudentsList] = useState<Student[]>();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const tableFooter = `Total : ${studentsList ? studentsList.length : 0}  Students.`

  const Students:Student[] = [
    {rollNumber:"111",hostelId: "Bh",firstname: "aa",lastname: "bb",gender: "male",dob: "12-12-2002",mobileno: "1111111111",email: "aa@gaaa.aa",semester: "3",department: "cse",fathername: "bb",fathermobileno: "222222"},
    {rollNumber:"118",hostelId: "Bh",firstname: "aa",lastname: "bb",gender: "male",dob: "12-12-2002",mobileno: "1111111111",email: "aa@gaaa.aa",semester: "3",department: "cse",fathername: "bb",fathermobileno: "222222"},
    {rollNumber:"113",hostelId: "Bh",firstname: "cc",lastname: "bb",gender: "female",dob: "12-12-2002",mobileno: "1111111111",email: "aa@gaaa.aa",semester: "3",department: "cse",fathername: "bb",fathermobileno: "222222"},
    {rollNumber:"117",hostelId: "Bh",firstname: "cc",lastname: "bb",gender: "male",dob: "12-12-2002",mobileno: "1111111111",email: "aa@gaaa.aa",semester: "3",department: "cse",fathername: "bb",fathermobileno: "222222"},
    {rollNumber:"115",hostelId: "Bh",firstname: "aa",lastname: "dd",gender: "female",dob: "12-12-2002",mobileno: "1111111111",email: "aa@gaaa.aa",semester: "3",department: "cse",fathername: "bb",fathermobileno: "222222"},
    {rollNumber:"116",hostelId: "Bh",firstname: "aa",lastname: "dd",gender: "male",dob: "12-12-2002",mobileno: "1111111111",email: "aa@gaaa.aa",semester: "3",department: "cse",fathername: "bb",fathermobileno: "222222"},
  ]


  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (stuRollNumber === "21471A0521") {
        setRollNumber("21471A0521");
        setHostelId("BH");
        setFirstname("Gangadhar");
        setLastname("Rongala");
        setGender("male");
        setDateOfBirth(new Date("12-12-2002"));
        setPhoneno("9182233993");
        setEmail("gangadhar2820@gmail.com");
        setSemester({ name: "4-1 Semester", code: "7" });
        setDepartment({ name: "Computer Science Engineering", code: "CSE" });
        setFatherName("Sriramulu");
        setFatherMobile("6303147518");
      } else {
        setRollNumber("");
      }
    }, 2000);
  };

  const validateSearchForm = () => {
    setIsSearchFormValid(false);
    const isRollValid = /^[a-zA-Z0-9]{10}$/.test(stuRollNumber);
    if (isRollValid) {
      setIsSearchFormValid(true);
    }
  };

  useEffect(() => {
    validateSearchForm();
  }, [stuRollNumber]);

  const handleStudentUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      if (ViewStudentToast.current) {
        ViewStudentToast.current.show({
          severity: "success",
          summary: "Student updated Successfully !",
          detail: "New Student has been added",
        });
      }
    }, 2000);
  };

  const handleStudentDelete = () => {
    const accept = () => {
      setIsDeleting(true);
      setTimeout(() => {
        setIsDeleting(false);
        if (ViewStudentToast.current) {
          ViewStudentToast.current.show({
            severity: "error",
            summary: "Student Deleted Successfully !",
            detail: "New Student has been added",
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
      setIsUpdateFormValid(true);
    } else {
      setIsUpdateFormValid(false);
    }
  };

  useEffect(() => {
    validateUpdateForm();
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
    email,
    semester,
    department,
  ]);

  const handleListStudentForm = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setIsListSearching(true);
    setTimeout(() => {
      setIsListSearching(false);
      setStudentsList(Students);
    }, 2000);
  }

  const renderHeader = () => {
    return (
        <div className="flex justify-content-between">
             <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={()=>{setGlobalFilterValue("")}} />
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue}  onChange={(e)=>{setGlobalFilterValue(e.target.value)}} placeholder="Search" />
            </IconField>
        </div>
    );
};

  const tableHeader = renderHeader();


  return (
    <>
      <Toast ref={ViewStudentToast} position="center" />
      <ConfirmDialog />
      <div
        className="p-2 w-10"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Search Student">
          <form onSubmit={handleSearchFormSubmit} className="grid">
            <div className="col-12 md:col-6 lg:col-4 mt-3 ">
              <FloatLabel>
                <InputText
                  id="ad-view-rollno"
                  type="text"
                  className="w-12 md:w-8"
                  value={stuRollNumber}
                  onChange={(e) => {
                    setStuRollNumber(e.target.value.toUpperCase());
                  }}
                  required
                />
                <label htmlFor="ad-view-rollno">Roll Number</label>
              </FloatLabel>
            </div>
            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <Button
                type="submit"
                disabled={!isSearchFormValid || isSearching}
              >
                {isSearching && <i className="pi pi-spin pi-spinner"></i>}
                &nbsp;&nbsp;
                {isSearching ? "Searching" : "Search"}
              </Button>
            </div>
          </form>
        </Card>

        {rollNumber && (
          <Card className="mt-1">
            <form action="" className="grid">
              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <FloatLabel>
                  <InputText
                    id="ad-view-rollno"
                    type="text"
                    className="w-12 md:w-8"
                    value={rollNumber}
                    onChange={(e) => {
                      setRollNumber(e.target.value);
                    }}
                    required
                    disabled
                  />
                  <label htmlFor="ad-view-rollno">Roll Number</label>
                </FloatLabel>
              </div>

              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <FloatLabel>
                  <InputText
                    id="ad-view-hostelid"
                    type="text"
                    className="w-12 md:w-8"
                    value={hostelId}
                    onChange={(e) => {
                      setHostelId(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="ad-view-hostelid">Hostel Id</label>
                </FloatLabel>
              </div>
              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <FloatLabel>
                  <InputText
                    id="ad-view-firstname"
                    type="text"
                    className="w-12 md:w-8"
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="ad-view-firstname">Firstname</label>
                </FloatLabel>
              </div>
              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <FloatLabel>
                  <InputText
                    id="ad-view-lastname"
                    type="text"
                    className="w-12 md:w-8"
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="ad-view-lastname">Lastname</label>
                </FloatLabel>
              </div>

              <div className="col-12 md:col-6 lg:col-8 mt-3 flex">
                <h4 className="mr-3">Gender</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="flex align-items-center">
                    <RadioButton
                      inputId="ad-view-male"
                      name="gender"
                      value="male"
                      onChange={(e: RadioButtonChangeEvent) =>
                        setGender(e.value)
                      }
                      checked={gender === "male"}
                    />
                    <label htmlFor="ad-view-male" className="ml-2">
                      Male
                    </label>
                  </div>
                  <div className="flex align-items-center">
                    <RadioButton
                      inputId="ad-view-female"
                      name="gender"
                      value="female"
                      onChange={(e: RadioButtonChangeEvent) =>
                        setGender(e.value)
                      }
                      checked={gender === "female"}
                    />
                    <label htmlFor="ad-view-female" className="ml-2">
                      Female
                    </label>
                  </div>
                  <div className="flex align-items-center">
                    <RadioButton
                      inputId="ad-view-other"
                      name="gender"
                      value="other"
                      onChange={(e: RadioButtonChangeEvent) =>
                        setGender(e.value)
                      }
                      checked={gender === "other"}
                    />
                    <label htmlFor="ad-view-other" className="ml-2">
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <FloatLabel>
                  <Calendar
                    required
                    inputId="ad-view-birth_date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.value)}
                    className="w-12 md:w-8"
                  />
                  <label htmlFor="ad-view-birth_date">Birth Date</label>
                </FloatLabel>
              </div>

              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <FloatLabel>
                  <InputText
                    id="ad-view-phoneno"
                    type="text"
                    className="w-12 md:w-8"
                    value={phoneno}
                    onChange={(e) => {
                      setPhoneno(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="ad-view-phoneno">Phone Number</label>
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
                    id="ad-view-email"
                    type="text"
                    className="w-12 md:w-8"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="ad-view-rollno">EMail</label>
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
                  onChange={(e: DropdownChangeEvent) => {
                    setDepartment(e.value);
                  }}
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
          </Card>
        )}

        {stuRollNumber && !rollNumber && "no data found"}

        <Divider align="center">
          <span className="p-tag">OR</span>
        </Divider>


        <Card title="List Students">
          <form onSubmit={handleListStudentForm} className="grid">
          <div className="col-12 md:col-6 lg:col-4 mt-3">
                <Dropdown
                  required
                  value={listSemester}
                  onChange={(e: DropdownChangeEvent) => setListSemester(e.value)}
                  options={Semesters}
                  optionLabel="name"
                  placeholder="Semester"
                  className="w-12 md:w-8"
                />
              </div>

              <div className="col-12 md:col-6 lg:col-4 mt-3">
                <Dropdown
                  required
                  value={listDepartment}
                  onChange={(e: DropdownChangeEvent) => {
                    setListDepartment(e.value);
                  }}
                  options={Departments}
                  optionLabel="name"
                  placeholder="Department"
                  className="w-12 md:w-8"
                />
              </div>


            <div className="col-12 md:col-6 lg:col-4 mt-3">
              <Button
                type="submit"
                disabled={isListSearching}
              >
                {isListSearching && <i className="pi pi-spin pi-spinner"></i>}
                &nbsp;&nbsp;
                {isListSearching ? "Searching" : "Search"}
              </Button>
            </div>
          </form>
        </Card>
      

    {studentsList &&  <Card  className="mt-2">
     <DataTable value={studentsList } stripedRows header={tableHeader} removableSort globalFilter={globalFilterValue} scrollable footer={tableFooter} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  tableStyle={{ minWidth: '50rem' }}>
        <Column field="rollNumber" header="Roll Number" frozen sortable className="font-bold"></Column>       
        <Column field="hostelId" header="Hostel Id"></Column>       
        <Column field="firstname" header="Firstname"></Column>       
        <Column field="lastname" header="Lastname"></Column>       
        <Column field="gender" header="Gender"  ></Column>       
        <Column field="dob" header="Date of birth" ></Column>       
        <Column field="mobileno" header="Mobile no" ></Column>       
        <Column field="email" header="Email"></Column>       
        <Column field="semester" header="Semester"></Column>       
        <Column field="department" header="Department"></Column>       
        <Column field="fathername" header="Father name"></Column>       
        <Column field="fathermobileno" header="Father Mobileno"></Column>       
    </DataTable>
     </Card> }

      </div>
    </>
  );
}

export default AdminViewStudent;
