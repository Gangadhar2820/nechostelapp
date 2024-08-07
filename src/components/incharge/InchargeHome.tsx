import styles from "../styles/home.module.css";
import React, { createContext, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Link, Outlet } from "react-router-dom";
import { Student } from "../interfaces/Student";
import { Incharge } from "../interfaces/Incharge";
import { getIncharge } from "../../services/InchargeService";

export const InchargeContext = createContext<any>(null);
export const InchargeProvider = InchargeContext.Provider;
export const InchargeConsumer = InchargeContext.Consumer;

function InchargeHome() {
  const [visible, setVisible] = useState(false);

  const [incharge, setIncharge] = useState<Incharge>();

  useEffect(() => {

    getIncharge("E123").then((data)=>{
      setIncharge(data)
    }).catch((err)=>{
      console.log(err)
    })

  }, []);

  return (
    <>
      <InchargeProvider value={incharge}>
        <div className={styles.container}>
          <div className={`${styles.header} flex flex-row`}>
            <Button
              icon="pi pi-bars"
              label="Menu"
              className="lg:hidden"
              onClick={() => setVisible(true)}
            />
          </div>
          <div className={styles.body}>
            <div
              className={`${styles.content} flex flex-row align-items-start`}
            >
              <div
                className={`${styles.sidenavbar}  hidden lg:block bg-primary`}
              >
                <div className="overflow-y-auto">
                  <ul className="list-none p-3 m-0">
                    <li>
                      <Link
                        to="/incharge/dashboard"
                        className="p-ripple no-underline flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-box mr-2"></i>
                        <span className="font-medium"> Dashboard</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/profile"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-user mr-2"></i>
                        <span className="font-medium"> My Profile</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/viewstudent"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-address-book mr-2"></i>
                        <span className="font-medium"> View Student</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/studentlist"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-list mr-2"></i>
                        <span className="font-medium">Student List</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/pendingreq"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-clock mr-2"></i>
                        <span className="font-medium">Pending Requests</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/incharge/activereq"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-verified mr-2"></i>
                        <span className="font-medium">Active Requests</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/incharge/arrivedreq"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-list-check mr-2"></i>
                        <span className="font-medium">Arrived Requests</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/history"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-history mr-2"></i>
                        <span className="font-medium">History</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/incharge/inchargelist"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Incharge List</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`${styles.middleContent} relative`}>
                <div className="card flex justify-content-center lg:hidden">
                  <Sidebar
                    visible={visible}
                    modal={false}
                    onHide={() => setVisible(false)}
                    className="lg:hidden w-14rem bg-primary"
                  >
                    <div className="overflow-y-auto">
                      <ul className="list-none p-3 m-0">
                      <li>
                      <Link
                        to="/incharge/dashboard"
                        className="p-ripple no-underline flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-box mr-2"></i>
                        <span className="font-medium"> Dashboard</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/profile"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-user mr-2"></i>
                        <span className="font-medium"> My Profile</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/viewstudent"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-address-book mr-2"></i>
                        <span className="font-medium"> View Student</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/studentlist"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-list mr-2"></i>
                        <span className="font-medium">Student List</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/pendingreq"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-clock mr-2"></i>
                        <span className="font-medium">Pending Requests</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/incharge/activereq"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-verified mr-2"></i>
                        <span className="font-medium">Active Requests</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/incharge/arrivedreq"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-list-check mr-2"></i>
                        <span className="font-medium">Arrived Requests</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/incharge/history"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-history mr-2"></i>
                        <span className="font-medium">History</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/incharge/inchargelist"
                        className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Incharge List</span>
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
      </InchargeProvider>
    </>
  );
}

export default InchargeHome;
