import "./App.css";
import Login from "./components/Login";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentHome from "./components/student/StudentHome";
import StudentRegister from "./components/StudentRegister";
import StudentForgotPassword from "./components/StudentForgotPassword";
import AdminHome from "./components/AdminHome";
import AdminInchargeRegister from "./components/AdminInchargeRegister";
import AdminDashboard from "./components/AdminDashboard";
import AdminStudentRegister from "./components/AdminStudentRegister";
import AdminNotReported from "./components/AdminNotReported";
import AdminNotApproved from "./components/AdminNotApproved";
import AdminAllReports from "./components/AdminAllReports";
import StudentPermissionAndLeaves from "./components/StudentPermissionAndLeaves";
import StudentHistory from "./components/student/StudentHistory";
import AdminViewStudent from "./components/AdminViewStudent";
import StudentDashboard from "./components/student/StudentDashboard";
import StudentProfile from "./components/student/StudentProfile";
import StudentLeave from "./components/student/StudentLeave";
import StudentIncharge from "./components/student/StudentIncharge";

import InchargeHome from "./components/incharge/InchargeHome";
import InchargeProfile from "./components/incharge/InchargeProfile";
import InchargeDashboard from "./components/incharge/InchargeDashboard";
import InchargeHistory from "./components/incharge/InchargeHistory";
import InchargeList from "./components/incharge/InchargeList";
import InchargeViewStudent from "./components/incharge/InchargeViewStudent";
import InchargeStudentList from "./components/incharge/InchargeStudentList";
import InchargePendingRequest from "./components/incharge/InchargePendingRequest";
import InchargeActiveRequest from "./components/incharge/InchargeActiveRequest";
import InchargeArrivedRequest from "./components/incharge/InchargeArrivedRequest";
import StudentProtectedRoutes from "./utils/StudentProtectedRoutes";
import { StudentAuthProvider } from "./utils/StudentAuth";
import InchargeAuthProvider from "./utils/InchargeAuth";
import InchargeProtectedRoutes from "./utils/InchargeProtectedRoutes";
import InchargeForgotPassword from "./components/InchargeForgotPassword";
import AdminProtectedRoutes from "./utils/AdminProtectedRoutes";
import AdminAuthProvider from "./utils/AdminAuth";

function App() {
  return (
    <>


      <StudentAuthProvider>
        <InchargeAuthProvider>
          <AdminAuthProvider>
          <BrowserRouter>

            <Routes>
              <Route path="/" element={<Login />} />

              <Route element={<StudentProtectedRoutes />}>
                <Route path="/student/:rollNo" element={<StudentHome />}>
                  <Route index element={<StudentDashboard />}></Route>
                  <Route path="profile" element={<StudentProfile />} />
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="leave" element={<StudentLeave />} />
                  <Route path="history" element={<StudentHistory />} />
                  <Route path="incharge" element={<StudentIncharge />} />
                </Route>
              </Route>

              <Route element={<InchargeProtectedRoutes />}>
                <Route path="/incharge/:eid" element={<InchargeHome />}>
                  <Route index element={<InchargeDashboard />} />
                  <Route path="profile" element={<InchargeProfile />} />
                  <Route path="dashboard" element={<InchargeDashboard />} />
                  <Route path="history" element={<InchargeHistory />} />
                  <Route path="inchargelist" element={<InchargeList />} />
                  <Route path="viewstudent" element={<InchargeViewStudent />} />
                  <Route path="studentlist" element={<InchargeStudentList />} />
                  <Route
                    path="pendingreq"
                    element={<InchargePendingRequest />}
                  />
                  <Route path="activereq" element={<InchargeActiveRequest />} />
                  <Route
                    path="arrivedreq"
                    element={<InchargeArrivedRequest />}
                  />
                </Route>
              </Route>

              <Route
                path="/studentregister"
                element={<StudentRegister />}
              ></Route>
              <Route
                path="/studentfpassword"
                element={<StudentForgotPassword />}
              ></Route>

              <Route
                path="/inchargefpassword"
                element={<InchargeForgotPassword />}
              ></Route>

              <Route element={<AdminProtectedRoutes/>}>
              <Route path="/admin/:eid" element={<AdminHome />}>
              <Route path="dashboard" element={<AdminDashboard />}></Route>
                <Route
                  path="inchargeregister"
                  element={<AdminInchargeRegister />}
                ></Route>
                <Route
                  path="studentregister"
                  element={<AdminStudentRegister />}
                ></Route>
              </Route>
              </Route>


              <Route path="/adminhome" element={<AdminHome />}>
                <Route path="dashboard" element={<AdminDashboard />}></Route>
                <Route
                  path="inchargeregister"
                  element={<AdminInchargeRegister />}
                ></Route>
                <Route
                  path="studentregister"
                  element={<AdminStudentRegister />}
                ></Route>
                <Route
                  path="notreported"
                  element={<AdminNotReported />}
                ></Route>
                <Route
                  path="notapproved"
                  element={<AdminNotApproved />}
                ></Route>
                <Route path="allreports" element={<AdminAllReports />}></Route>
                <Route
                  path="viewstudent"
                  element={<AdminViewStudent />}
                ></Route>
              </Route>

              <Route path="/studenthome" element={<StudentHome />}>
                <Route path="dashboard" element={<StudentDashboard />}></Route>
                <Route
                  path="permissionleaves"
                  element={<StudentPermissionAndLeaves />}
                ></Route>
                <Route path="history" element={<StudentHistory />}></Route>
              </Route>
            </Routes>

          </BrowserRouter>
          </AdminAuthProvider>
        </InchargeAuthProvider>
      </StudentAuthProvider>


    </>
  );
}

export default App;
