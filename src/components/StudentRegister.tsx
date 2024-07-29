import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {Card} from "primereact/card";
import { Toast } from 'primereact/toast';

        
function StudentRegister() {
  const Navigate = useNavigate();
  const [rollno, setRollno] = useState<string>("");
  const [isRollnoValid, setIsRollnoValid] = useState<boolean>(false);
  const [isValidating, setisValidating] = useState<boolean>(false);
  const [isStudentExist, setIsStudentExist] = useState<boolean | null>(null);

  const [stuPassword,setStuPassword] = useState<string>("");
  const [stuCPassword,setStuCPassword] = useState<string>("");

  const [isPasswordsSame,setIsPasswordsSame] = useState<boolean>(true);

  const [isRegistering,setIsRegistering] = useState<boolean>(false);

  const registerToast = useRef<Toast>(null);


  useEffect(()=>{
    setIsPasswordsSame(false);
    if(stuPassword === stuCPassword){
      setIsPasswordsSame(true);
    }
  },[stuPassword,stuCPassword])


  const handleStuRegFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisValidating(true);
    setIsStudentExist(null);
    setTimeout(() => {
      setisValidating(false);
      if (rollno === "21471A0521") {
        setIsStudentExist(true);
      } else {
        setIsStudentExist(false);
      }
    }, 2000);
  };

  const handleRegisterForm = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      if(registerToast.current){
        registerToast.current.show({ severity: 'success', summary: 'Register Successful !', detail: 'Welcome, User' });
        setTimeout(() => {
          Navigate("/login",{replace:true})
        }, 2000);
        }
    }, 2000);
  }


  return (
    <>
    <Toast ref={registerToast} position="top-center" />
      <Dialog
        header="Student Registration"
        visible={true}
        style={{ width: "50vw" }}
        onHide={() => {
          Navigate("/login", { replace: true });
        }}
        className="w-11 lg:w-5"
      >
        <Card className="w-full mt-1">
          <form onSubmit={handleStuRegFormSubmit}>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-key"></i>
              </span>
              <InputText
                placeholder="Roll no"
                value={rollno}
                onChange={(e) => {
                  setIsRollnoValid(false);
                  let rollno = e.target.value.toUpperCase();
                  setRollno(rollno);
                  if (/^[a-zA-Z0-9]{10}$/.test(rollno)){
                    setIsRollnoValid(true);
                  } else {
                    setIsRollnoValid(false);
                  }
                }}
                maxLength={10}
                minLength={10}
                className="text-center font-bold text-lg"
                disabled={isStudentExist ? true : false}
              />
              {isStudentExist == null ? (
                <Button
                  className={`${isStudentExist}`}
                  disabled={!isRollnoValid || isValidating}
                  type="submit"
                >
                  {isValidating && <i className="pi pi-spin pi-spinner"></i>}
                  &nbsp;&nbsp;{`${isValidating ? "Validating" : "Validate"}`}
                </Button>
              ) : (
                <Button
                  severity={isStudentExist ? "success" : "danger"}
                  type="submit"
                  disabled={isStudentExist}
                >
                  {isStudentExist ? (
                    <i className="pi pi-verified"></i>
                  ) : (
                    <i className="pi pi-ban"></i>
                  )}
                  &nbsp;&nbsp;{isStudentExist ? `Valid ` : `Invalid`}
                </Button>
              )}
            </div>
          </form>
          {isStudentExist &&
        <div className="mt-4">
          <form onSubmit={handleRegisterForm}>
            <label htmlFor="stu-reg-password" className="block text-900 font-medium mb-1">Password</label>
            <div className="p-inputgroup flex-1 mb-3">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-lock"></i>
                    </span>
                    <InputText
                      id="stu-reg-password"
                      name="stu-reg-password"
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
                        const ele = document.getElementById("stu-reg-password") as HTMLInputElement | null;
                        if (ele) {
                          if (ele.type === "text") {
                            ele.type = "password";
                          } else if (ele.type === "password") {
                            ele.type = "text";
                          }
                        }
                      }}
                    >
                      <i className="pi pi-eye cursor-pointer"></i>
                    </span>
                  </div>

                  <label htmlFor="stu-reg-cpassword" className="block text-900 font-medium mb-1">Confirm Password</label>
                  <div className="p-inputgroup flex-1 mb-3">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-lock"></i>
                    </span>
                    <InputText
                      id="stu-reg-cpassword"
                      name="stu-reg-cpassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={stuCPassword}
                      onChange={(e) => {
                        setStuCPassword(e.target.value);
                      }}
                      required
                    />
                    <span
                      className="p-inputgroup-addon"
                      onClick={() => {
                        const ele = document.getElementById("stu-reg-cpassword") as HTMLInputElement | null;
                        if (ele) {
                          if (ele.type === "text") {
                            ele.type = "password";
                          } else if (ele.type === "password") {
                            ele.type = "text";
                          }
                        }
                      }}
                    >
                      <i className="pi pi-eye cursor-pointer"></i>
                    </span>
                  </div>
                 {!isPasswordsSame &&  <p className="text-center text-red-400">Passwords are not same</p> }
                  <Button  type="submit" label={`${isRegistering ? "Registering" :"Register"}`} disabled={((isPasswordsSame && stuPassword)?false:true) ||(isRegistering?true:false)} className="w-full text-center" >
                  {isRegistering && <i className="pi pi-spin pi-spinner"></i>}
                  </Button>
          </form>
        </div> }
        </Card>

      </Dialog>
    </>
  );
}

export default StudentRegister;
