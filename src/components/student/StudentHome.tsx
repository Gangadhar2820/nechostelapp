import styles from "../styles/home.module.css";
import React, { createContext, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Link, Outlet, useParams } from "react-router-dom";
import { Student } from "../interfaces/Student";
import {
  getStudent,
  updateStudentProfile,
} from "../../services/StudentService";

export const StudentContext = createContext<any>(null);
export const StudentProvider = StudentContext.Provider;
export const StudentConsumer = StudentContext.Consumer;

function StudentHome() {

  const params = useParams();

  const [sidenavVisible, setSidenavVisible] = useState(false);

  const [student, setStudent] = useState<Student>();


  const [stuRollNo,setStuRollNo] = useState<string>("");

  useEffect(() => {
    // in first render cycle get the student data
    getStudent(params.rollNo as string)
      .then((data) => {
        setStudent(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);


  const updateStudent = (student:Student)=>{
    updateStudentProfile(student.rollNo,student.lastRequest,student.requestCount).then((data)=>{
        setStudent(student)
    }).catch((err)=>{
        console.log(err)
    })
  }

  return (
    <>
      <StudentProvider value={{ student, updateStudent }}>
        <div className={styles.container}>
          <div className={`${styles.header} flex flex-row justify-content-center`}>
            <Button
              icon="pi pi-bars"
              label="Menu"
              className="lg:hidden"
              onClick={() => setSidenavVisible(true)}
            />
            <Button icon="pi pi-power-off" style={{height:"48px",width:"48px",borderRadius:"50%"}} onClick={()=>{

            }}></Button>
          </div>
          <div className={styles.body}>
            <div
              className={`${styles.content} flex flex-row align-items-start`}
            >
              <div
                className={`${styles.sidenavbar} hidden lg:block bg-primary`}
              >
                <div className="overflow-y-auto">
                  <ul className="list-none p-3 m-0">
                    <li>
                      <Link
                        to="dashboard"
                        className="p-ripple no-underline flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-box mr-2"></i>
                        <span className="font-medium"> Dashboard</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="profile"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-user mr-2"></i>
                        <span className="font-medium"> My Profile</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="leave"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-envelope mr-2"></i>
                        <span className="font-medium">
                          Apply Leave/Permission
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="history"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-history mr-2"></i>
                        <span className="font-medium">History</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="incharge"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Incharge</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="profile-card absolute bottom-0 left-0">
                  profile
                </div>
              </div>
              <div className={`${styles.middleContent} relative`}>
                <div className="card flex justify-content-center lg:hidden">
                  <Sidebar
                    visible={sidenavVisible}
                    modal={false}
                    onHide={() => setSidenavVisible(false)}
                    className="lg:hidden w-14rem bg-primary"
                  >
                    <div className="overflow-y-auto">
                      <ul className="list-none p-3 m-0">
                        <li>
                          <Link
                            to="dashboard"
                            className="p-ripple no-underline flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                          >
                            <i className="pi pi-box mr-2"></i>
                            <span className="font-medium"> Dashboard</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="profile"
                            className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                          >
                            <i className="pi pi-user mr-2"></i>
                            <span className="font-medium"> My Profile</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="leave"
                            className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                          >
                            <i className="pi pi-envelope mr-2"></i>
                            <span className="font-medium">
                              Apply Leave/Permission
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="history"
                            className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                          >
                            <i className="pi pi-history mr-2"></i>
                            <span className="font-medium">History</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="incharge"
                            className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                          >
                            <i className="pi pi-users mr-2"></i>
                            <span className="font-medium">Incharge</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Sidebar>
                </div>
                <div className={styles.outletStyle}>
                  <Outlet></Outlet>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StudentProvider>
    </>
  );
}

export default StudentHome;
