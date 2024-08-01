import styles from "../styles/home.module.css";
import React, { createContext, useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Link, Outlet } from "react-router-dom";
import { Student } from "../interfaces/Student";

export const UserContext = createContext<any>(null);
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

function Home() {
    const [visible, setVisible] = useState(false);

    const [user,setUser]  = useState<Student>();

    useEffect(()=>{
        const student:Student = {
            hostelId:"BH1",
            rollNo:"21471A0521",
            name:"Gangadhar",
            college:"NEC",
            branch:"CSE",
            year:4,
            gender:"MALE",
            dob:new Date("12-12-2002"),
            phoneNo:"9182233993",
            email:"ganga@gmail.com",
            parentName:"Sriramulu",
            parentPhoneNo:"6303147518",
            currentStatus:"HOSTEL",
            requestCount:0,
            lastRequest:null,
        }
        setUser(student);
    },[]);



    const updateUser = async (newUserData:Student)=>{
        setUser(newUserData);
    }



    
  return (
          <>
      <UserProvider value={{user,updateUser}}>

      <div className={styles.container}>
        <div className={`${styles.header} flex flex-row`}>
        <Button icon="pi pi-bars" label="Menu" className="lg:hidden" onClick={() => setVisible(true)}/>
            {`${user?.name} ${user?.currentStatus} ${user?.requestCount}`}
        </div>
        <div className={styles.body}>
           <div className={`${styles.content} flex flex-row align-items-start`}>
            <div className={`${styles.sidenavbar} hidden lg:block bg-primary`}>
            <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                <li>
                    <Link to="/student/dashboard" className="p-ripple no-underline flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                        <i className="pi pi-box mr-2"></i>
                        <span className="font-medium"> Dashboard</span>
                    </Link>
                </li>
               
                <li>
                    <Link to="/student/profile" className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                        <i className="pi pi-user mr-2"></i>
                        <span className="font-medium"> My Profile</span>
                    </Link>
                </li>
               
                <li>
                    <Link to="/student/leave" className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                        <i className="pi pi-envelope mr-2"></i>
                        <span className="font-medium">Apply Leave/Permission</span>
                    </Link>
                </li>
                <li>
                    <Link to="/student/history" className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                        <i className="pi pi-history mr-2"></i>
                        <span className="font-medium">History</span>
                    </Link>
                </li>
                <li>
                    <Link to="/student/incharge" className="p-ripple flex align-items-center text-white hover:text-primary cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
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
    </UserProvider>
    </>
  );
}

export default Home;
