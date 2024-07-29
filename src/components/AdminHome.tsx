import styles from "./AdminHome.module.css";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Link, Outlet } from "react-router-dom";
import QRScanner from "./QRScanner";
import { Dialog } from "primereact/dialog";

function AdminHome() {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [cameraVisible,setCameraVisible] = useState<boolean>(false);

  const handleScanSuccess = (decodedText: any, decodedResult: any) => {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    alert(`Scanned QR Code: ${decodedText}`);
  };

  const handleScanFailure = (error: any) => {
    console.warn(`Code scan error = ${error}`);
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.header} flex flex-row justify-content-around align-items-center`}
        >
          <Button
            icon="pi pi-bars"
            label="Menu"
            className="lg:hidden"
            onClick={() => setMenuVisible(true)}
          />

          <Button
            icon="pi pi-camera"
            className="border-circle"
            severity="info"
            onClick={() => {
                if(cameraVisible){
                    setCameraVisible(false)
                }else{
                    setCameraVisible(true)
                }
            }}
          />
        </div>

        <div className={styles.body}>

          <Dialog
            visible={cameraVisible}
            style={{ width: "50vw" }}
            onHide={() => {
              setCameraVisible(false)
            }}
            className="w-auto"
          >
            <QRScanner
              onScanSuccess={handleScanSuccess}
              onScanFailure={handleScanFailure}
              visible={cameraVisible}
            />
          </Dialog>

          <div className={`${styles.content} flex flex-row align-items-start`}>
            <div className={`${styles.sidenavbar} hidden lg:block bg-primary`}>
              <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                  <li>
                    <Link
                      to="/adminhome/dashboard"
                      className="p-ripple no-underline flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-home mr-2"></i>
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminhome/inchargeregister"
                      className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                    >
                      <i className="pi pi-user-plus mr-2"></i>
                      <span className="font-medium">Incharge Register</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminhome/studentregister"
                      className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                    >
                      <i className="pi pi-user-plus mr-2"></i>
                      <span className="font-medium">Add Student</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminhome/viewstudent"
                      className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                    >
                      <i className="pi pi-user-edit mr-2"></i>
                      <span className="font-medium">View Student</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminhome/notreported"
                      className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                    >
                      <i className="pi pi-clock mr-2"></i>
                      <span className="font-medium">Not Reported</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminhome/notapproved"
                      className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                    >
                      <i className="pi pi-times-circle mr-2"></i>
                      <span className="font-medium">Not Approved</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminhome/allreports"
                      className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                    >
                      <i className="pi pi-history mr-2"></i>
                      <span className="font-medium">All Reports</span>
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
                  visible={menuVisible}
                  modal={false}
                  onHide={() => setMenuVisible(false)}
                  className="lg:hidden w-14rem bg-primary"
                >
                  <div className="overflow-y-auto">
                    <ul className="list-none p-3 m-0">
                      <li>
                        <Link
                          to="/adminhome/dashboard"
                          className="p-ripple no-underline flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                        >
                          <i className="pi pi-home mr-2"></i>
                          <span className="font-medium">Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/adminhome/inchargeregister"
                          className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                        >
                          <i className="pi pi-user-plus mr-2"></i>
                          <span className="font-medium">Incharge Register</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/adminhome/studentregister"
                          className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                        >
                          <i className="pi pi-user-plus mr-2"></i>
                          <span className="font-medium">Student Register</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/adminhome/notreported"
                          className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                        >
                          <i className="pi pi-clock mr-2"></i>
                          <span className="font-medium">Not Reported</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/adminhome/notapproved"
                          className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                        >
                          <i className="pi pi-times-circle mr-2"></i>
                          <span className="font-medium">Not Approved</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/adminhome/allreports"
                          className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                        >
                          <i className="pi pi-history mr-2"></i>
                          <span className="font-medium">All Reports</span>
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
    </>
  );
}

export default AdminHome;
