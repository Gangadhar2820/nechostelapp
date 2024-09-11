import styles from "../styles/home.module.css";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { useAdminAuth } from "../../utils/AdminAuth";
import { Admin } from "../interfaces/Admin";
import { getAdmin } from "../../services/AdminService";

export const AdminContext = createContext<any>(null);
export const AdminProvider = AdminContext.Provider;
export const AdminConsumer = AdminContext.Consumer;


function AdminHome() {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [cameraVisible,setCameraVisible] = useState<boolean>(false);
  const params = useParams();

  const [admin,setAdmin] = useState<Admin>();
  const {adminLogout} = useAdminAuth();

  useEffect(()=>{
    getAdmin(params?.eid as string).then((data)=>{
      setAdmin(data)
    }).catch((err)=>{
      console.log(err)
    })
   
  },[])

  const handleLogout = () => {

    let result = window.confirm("Are you sure you want to Logout?");
    if(result){
      adminLogout()
    }
  };



  return (
    <>
    <AdminProvider value={admin}>
      <div className={styles.container}>
      <div className={`${styles.header} p-card flex p-1 align-items-center justify-content-between`}>
          
          
          <img
            src="/images/logo-no-background.png"
            alt="Nec logo"
            className="ml-3 mr-3 h-full hidden sm:block"
          />
          <img
            src="/images/Nec.png"
            alt="Nec logo"
            className="ml-3 mr-3 h-full"
          />

          <Button
            icon="pi pi-bars"
            label="Menu"
            severity="info"
            className="lg:hidden"
            onClick={() => setMenuVisible(true)}
            raised
            aria-label="User"
          />

          <Button
            icon="pi pi-power-off"
            rounded
            raised
            label="Logout"
            onClick={handleLogout}
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
            
          </Dialog>

          <div className={`${styles.content} flex flex-row align-items-start`}>
            <div className={`${styles.sidenavbar} hidden lg:block bg-primary`}>
              <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                  <li>
                    <NavLink
                      to="dashboard"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-box mr-2"></i>
                      <span className="font-medium">Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="profile"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-user mr-2"></i>
                      <span className="font-medium">My Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="addincharge"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-user-plus mr-2"></i>
                      <span className="font-medium">Add Incharge</span>
                    </NavLink>
                  </li>
               
                  <li>
                    <NavLink
                      to="inchargelist"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-list mr-2"></i>
                      <span className="font-medium">Incharge List</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="addstudent"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-user-plus mr-2"></i>
                      <span className="font-medium">Add Student</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="viewstudent"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-user-edit mr-2"></i>
                      <span className="font-medium">View Student</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="studentlist"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-list mr-2"></i>
                      <span className="font-medium">Student List</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="pendingrequests"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-clock mr-2"></i>
                      <span className="font-medium">Pending Requests</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="activerequests"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-verified mr-2"></i>
                      <span className="font-medium">Active Requests</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="arrivedrequests"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-list-check mr-2"></i>
                      <span className="font-medium">Arrived Students</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="acceptedhistory"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-check mr-2"></i>
                      <span className="font-medium">Accepted History</span>
                    </NavLink>
                  </li>
                  <li>
                      <NavLink
                        to="history"
                        className={({ isActive }) =>{
                          let result =`p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${isActive ? 'text-primary surface-100 text-primary' : 'text-white'}`;
                          return result
                        }
                        }                      >
                        <i className="pi pi-history mr-2"></i>
                        <span className="font-medium">Student History</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="logs"
                        className={({ isActive }) =>{
                          let result =`p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${isActive ? 'text-primary surface-100 text-primary' : 'text-white'}`;
                          return result
                        }
                        }                      >
                        <i className="pi pi-address-book mr-2"></i>
                        <span className="font-medium">Logs</span>
                      </NavLink>
                    </li>
                </ul>
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
                    <NavLink
                      to="dashboard"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-box mr-2"></i>
                      <span className="font-medium">Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="profile"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-user mr-2"></i>
                      <span className="font-medium">My Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="addincharge"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-user-plus mr-2"></i>
                      <span className="font-medium">Add Incharge</span>
                    </NavLink>
                  </li>
                  
                  <li>
                    <NavLink
                      to="inchargelist"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-list mr-2"></i>
                      <span className="font-medium">Incharge List</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="addstudent"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-user-plus mr-2"></i>
                      <span className="font-medium">Add Student</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="viewstudent"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-user-edit mr-2"></i>
                      <span className="font-medium">View Student</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="studentlist"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-list mr-2"></i>
                      <span className="font-medium">Student List</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="pendingrequests"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-clock mr-2"></i>
                      <span className="font-medium">Pending Requests</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="activerequests"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-verified mr-2"></i>
                      <span className="font-medium">Active Requests</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="arrivedrequests"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-list-check mr-2"></i>
                      <span className="font-medium">Arrived Students</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="acceptedhistory"
                      className={({ isActive }) => {
                        let result = `p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${
                          isActive
                            ? "text-primary surface-100 text-primary"
                            : "text-white"
                        }`;
                        return result;
                      }}                    >
                      <i className="pi pi-check mr-2"></i>
                      <span className="font-medium">Accepted History</span>
                    </NavLink>
                  </li>
                  
                  <li>
                      <NavLink
                        to="history"
                        className={({ isActive }) =>{
                          let result =`p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${isActive ? 'text-primary surface-100 text-primary' : 'text-white'}`;
                          return result
                        }
                        }                      >
                        <i className="pi pi-history mr-2"></i>
                        <span className="font-medium">Student History</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="logs"
                        className={({ isActive }) =>{
                          let result =`p-ripple no-underline flex  align-items-center hover:text-primary  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${isActive ? 'text-primary surface-100 text-primary' : 'text-white'}`;
                          return result
                        }
                        }                      >
                        <i className="pi pi-address-book mr-2"></i>
                        <span className="font-medium">Logs</span>
                      </NavLink>
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
      </AdminProvider>
    </>
  );
}

export default AdminHome;
