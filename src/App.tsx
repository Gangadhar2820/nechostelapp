import "./App.css";
import Login from "./components/Login";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/student/Home";
import StudentRegister from "./components/StudentRegister";
import StudentForgotPassword from "./components/StudentForgotPassword";
import AdminHome from "./components/AdminHome";
import AdminInchargeRegister from "./components/AdminInchargeRegister";
import AdminDashboard from "./components/AdminDashboard";
import AdminStudentRegister from "./components/AdminStudentRegister";
import AdminNotReported from "./components/AdminNotReported";
import AdminNotApproved from "./components/AdminNotApproved";
import AdminAllReports from "./components/AdminAllReports";
import StudentHome from "./components/StudentHome";
import StudentDashboard from "./components/StudentDashboard";
import StudentPermissionAndLeaves from "./components/StudentPermissionAndLeaves";
import StudentHistory from "./components/StudentHistory";
import QRScanner from "./components/QRScanner";
import AdminViewStudent from "./components/AdminViewStudent";
import Dashboard from "./components/student/Dashboard";
import Profile from "./components/student/Profile";
import Leave from "./components/student/Leave";
import History from "./components/student/History";
import Incharge from "./components/student/Incharge";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          
          <Route path="/student" element={<Home/>}>
          <Route path="profile" element={<Profile/>} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="leave" element={<Leave/>} />
          <Route path="history" element={<History/>} />
          <Route path="incharge" element={<Incharge/>} />
          </Route>


          <Route path="/studentregister" element={<StudentRegister/>}>
          </Route>
          <Route path="/studentfpassword" element={<StudentForgotPassword/>}>
          </Route>
          

          <Route path="/adminhome" element={<AdminHome/>}>
          <Route path="dashboard" element={<AdminDashboard/>}></Route>
          <Route path="inchargeregister" element={<AdminInchargeRegister/>}></Route>
          <Route path="studentregister" element={<AdminStudentRegister/>}></Route>
          <Route path="notreported" element={<AdminNotReported/>}></Route>
          <Route path="notapproved" element={<AdminNotApproved/>}></Route>
          <Route path="allreports" element={<AdminAllReports/>}></Route>
          <Route path="viewstudent" element={<AdminViewStudent/>}></Route>
          </Route>

          <Route path="/studenthome" element={<StudentHome/>}>
          <Route path="dashboard" element={<StudentDashboard/>}></Route>
          <Route path="permissionleaves" element={<StudentPermissionAndLeaves/>}></Route>
          <Route path="history" element={<StudentHistory/>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
