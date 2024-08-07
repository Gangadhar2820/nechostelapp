import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
  AuthenticateAdminLogin,
  AuthenticateStudentLogin,
} from "../services/LoginService";
import { useAuth } from "../utils/AuthProvider";

function Login() {
  const [stuUsername, setStuUsername] = useState<string>("");
  const [stuPassword, setStuPassword] = useState<string>("");
  const [incUsername, setIncUsername] = useState<string>("");
  const [incPassword, setIncPassword] = useState<string>("");

  const [showStuLoading, setShowStuLoading] = useState<boolean>(false);
  const [showIncLoading, setShowIncLoading] = useState<boolean>(false);

  const {setUser} = useAuth();

  const loginToast = useRef<Toast>(null);
  const Navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("sessionToken");
  //   if (token) {
  //     const decoded: any = jwtDecode(token);
  //     Navigate(`student/${decoded.rollNo}`);
  //   }
  // }, []);


  const handleStudentSigninForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowStuLoading(true);
    
    AuthenticateStudentLogin(stuUsername, stuPassword)
      .then((data) => {
        setShowStuLoading(false);
        const { success, token } = data;
        if (success) {
          if (loginToast.current) {
            loginToast.current.show({
              severity: "success",
              summary: "Login Successful !",
              detail: "Welcome, User",
            });
          }
          // setUser(stuUsername);
          // localStorage.setItem("sessionToken", token);
          Navigate(`/student/${stuUsername}`, { replace: true });
        } else {
          if (loginToast.current) {
            loginToast.current.show({
              severity: "warn",
              summary: "Invalid Credentials",
              detail: "Check Username or Password",
            });
          }
        }
      })
      .catch((err) => {
        console.log("there is error", err);
      });
  };

  const handleInchargeSigninForm = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setShowIncLoading(true);

    AuthenticateAdminLogin(incUsername, incPassword)
      .then((data) => {
        setShowIncLoading(false);

        const { success, token } = data;
        if (success) {
          if (loginToast.current) {
            loginToast.current.show({
              severity: "success",
              summary: "Login Successful !",
              detail: "Welcome, User",
            });
            Navigate("/adminhome", { replace: true });
          }
        } else {
          if (loginToast.current) {
            loginToast.current.show({
              severity: "warn",
              summary: "Invalid Credentials",
              detail: "Check Username or Password",
            });
          }
        }
      })
      .catch((err) => {
        console.log("there is some error", err);
      });
  };

  return (
    <>
      <Toast ref={loginToast} position="top-center" />
      <div className="flex align-items-center justify-content-center mt-1">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-5">
          <div className="text-center mb-5">
            <img
              src="/images/Nec.png"
              alt="Nec logo"
              height={80}
              className="mb-1"
            />
          </div>

          <TabView>
            <TabPanel header="Student">
              <div className="text-center mb-5">
                <div className="text-900 text-2xl font-medium mb-2">
                  Student Sign In
                </div>
                <span className="text-600 font-medium line-height-2">
                  Don't have an account?
                </span>
                <Link
                  className="font-medium no-underline ml-2 text-blue-500  cursor-pointer mt-2"
                  to="/studentregister"
                >
                  Register
                </Link>
              </div>
              <div>
                <form onSubmit={handleStudentSigninForm}>
                  <label
                    htmlFor="stu-username"
                    className="block text-900 font-medium mb-1"
                  >
                    Username
                  </label>

                  <div className="p-inputgroup flex-1 mb-2">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                    </span>
                    <InputText
                      id="stu-username"
                      value={stuUsername}
                      onChange={(e) => {
                        setStuUsername(e.target.value.toUpperCase());
                      }}
                      placeholder="Username"
                      required
                    />
                  </div>

                  <label
                    htmlFor="stu-password"
                    className="block text-900 font-medium mb-1"
                  >
                    Password
                  </label>
                  <div className="p-inputgroup flex-1 mb-3">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-lock"></i>
                    </span>
                    <InputText
                      id="stu-password"
                      type="password"
                      placeholder="Password"
                      value={stuPassword}
                      onChange={(e) => {
                        setStuPassword(e.target.value);
                      }}
                      required
                    />
                    <span
                      className="p-inputgroup-addon"
                      onClick={() => {
                        const ele = document.getElementById(
                          "stu-password"
                        ) as HTMLInputElement | null;
                        if (ele) {
                          if (ele.type == "text") {
                            ele.type = "password";
                          } else if (ele.type == "password") {
                            ele.type = "text";
                          }
                        }
                      }}
                    >
                      <i className="pi pi-eye cursor-pointer"></i>
                    </span>
                  </div>
                  <Button
                    label={`${showStuLoading ? `Signing` : "Sign in"}`}
                    disabled={showStuLoading}
                    type="submit"
                    className="w-full"
                  >
                    {showStuLoading && (
                      <i className="pi pi-spin pi-spinner"></i>
                    )}
                  </Button>
                </form>
              </div>
              <div className="flex align-items-center justify-content-end">
                <Link
                  className="font-medium no-underline ml-2 text-blue-500  cursor-pointer mt-2"
                  to="/studentfpassword"
                >
                  Forgot your password?
                </Link>
              </div>
            </TabPanel>
            <TabPanel header="Incharge">
              <div className="text-center mb-5">
                <div className="text-900 text-2xl font-medium mb-2">
                  Incharge Sign In
                </div>
                <span className="text-600 font-medium line-height-2">
                  Don't have an account?
                </span>
                <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
                  Register
                </a>
              </div>
              <div>
                <form onSubmit={handleInchargeSigninForm}>
                  <label
                    htmlFor="inc-username"
                    className="block text-900 font-medium mb-1"
                  >
                    Username
                  </label>
                  <div className="p-inputgroup flex-1 mb-2">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                    </span>
                    <InputText
                      id="inc-username"
                      value={incUsername}
                      onChange={(e) => {
                        setIncUsername(e.target.value);
                      }}
                      placeholder="Username"
                      required
                    />
                  </div>

                  <label
                    htmlFor="inc-password"
                    className="block text-900 font-medium mb-1"
                  >
                    Password
                  </label>
                  <div className="p-inputgroup flex-1 mb-3">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-lock"></i>
                    </span>
                    <InputText
                      id="inc-password"
                      type="password"
                      placeholder="Password"
                      value={incPassword}
                      onChange={(e) => {
                        setIncPassword(e.target.value);
                      }}
                      required
                    />
                    <span
                      className="p-inputgroup-addon"
                      onClick={() => {
                        const ele = document.getElementById(
                          "inc-password"
                        ) as HTMLInputElement | null;
                        if (ele) {
                          if (ele.type == "text") {
                            ele.type = "password";
                          } else if (ele.type == "password") {
                            ele.type = "text";
                          }
                        }
                      }}
                    >
                      <i className="pi pi-eye cursor-pointer"></i>
                    </span>
                  </div>
                  <Button
                    label={`${showIncLoading ? `Signing` : "Sign in"}`}
                    disabled={showIncLoading}
                    type="submit"
                    className="w-full"
                  >
                    {showIncLoading && (
                      <i className="pi pi-spin pi-spinner"></i>
                    )}
                  </Button>
                </form>
              </div>
              <div className="flex align-items-center justify-content-end">
                <a className="font-medium no-underline ml-2 text-blue-500  cursor-pointer mt-2">
                  Forgot your password?
                </a>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
      <div className="absolute top-0 left-0">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Login;
