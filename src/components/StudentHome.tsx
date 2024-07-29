import styles from "./AdminHome.module.css";
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Link, Outlet } from "react-router-dom";

function StudentHome() {
    const [visible, setVisible] = useState(false);

    
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.header} flex flex-row`}>
        <Button icon="pi pi-bars" label="Menu" className="lg:hidden" onClick={() => setVisible(true)}/>
        </div>
        <div className={styles.body}>
           <div className={`${styles.content} flex flex-row align-items-start`}>
            <div className={`${styles.sidenavbar} hidden lg:block bg-primary`}>
            <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                <li>
                    <Link to="/studenthome/dashboard" className="p-ripple no-underline flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                        <i className="pi pi-home mr-2"></i>
                        <span className="font-medium">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/studenthome/permissionleaves" className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                        <i className="pi pi-envelope mr-2"></i>
                        <span className="font-medium">Permission and Leaves</span>
                    </Link>
                </li>
                <li>
                    <Link to="/studenthome/history" className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                        <i className="pi pi-history mr-2"></i>
                        <span className="font-medium">History</span>
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
            <Sidebar visible={visible} modal={false} onHide={() => setVisible(false)} className="lg:hidden w-14rem bg-primary">
            <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                <li>
                    <Link to="/studenthome/dashboard" className="p-ripple no-underline flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                        <i className="pi pi-home mr-2"></i>
                        <span className="font-medium">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/studenthome/permissionleaves" className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                        <i className="pi pi-envelope mr-2"></i>
                        <span className="font-medium">Permission and Leaves</span>
                    </Link>
                </li>
                <li>
                    <Link to="/studenthome/history" className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                        <i className="pi pi-history mr-2"></i>
                        <span className="font-medium">History</span>
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

export default StudentHome;
