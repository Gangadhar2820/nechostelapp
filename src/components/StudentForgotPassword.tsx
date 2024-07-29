import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputOtp } from "primereact/inputotp";
import { Toast } from "primereact/toast";

function StudentForgotPassword() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isValidating, setisValidating] = useState<boolean>(false);
  const [isStudentExist, setIsStudentExist] = useState<boolean | null>(null);
  const [otpToken, setOtpTokens] = useState<any>();

  const [disableResendOTP,setDisableResendOTP] = useState<boolean>(false);

  const [isOTPvalid,setIsOTPvalid] = useState<boolean>(false);
  const [isOTPcorrect,setIsOTPcorrect] = useState<boolean>(false);
  const [isOTPsubmitting,setIsOTPsubmitting] = useState<boolean>(false);

  const FPassToast = useRef<Toast>(null);

  const [stuNewPassword,setStuNewPassword] = useState<string>("");
  const [stuNewCPassword,setStuNewCPassword] = useState<string>("");
  const [isPasswordsSame,setIsPasswordsSame] = useState<boolean>(true);
  const [isUpdatingNewPass,setIsUpdatingNewPass] = useState<boolean>(false);

  useEffect(()=>{
    if(otpToken){
    if(otpToken.toString().length === 4){
      setIsOTPvalid(true)
    }else{
      setIsOTPvalid(false);
    }
  }
  },[otpToken])

  useEffect(()=>{
    setIsPasswordsSame(false);
    if(stuNewPassword === stuNewCPassword){
      setIsPasswordsSame(true);
    }
  },[stuNewPassword,stuNewCPassword])

  const handleStuForgotPassFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setisValidating(true);
    setIsStudentExist(null);
    setTimeout(() => {
      setisValidating(false);
      if (email === "ganga@gmail.com") {
        setIsStudentExist(true);
        if(FPassToast.current){
          FPassToast.current.show({ severity: 'success', summary: 'OTP Send Successfully !', detail: 'OTP has been send to your registered email' });
        }
      } else {
        setIsStudentExist(false);
      }
    }, 2000);
  };

  const handleOTPSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setIsOTPcorrect(false);
    setIsOTPsubmitting(true);
    setTimeout(() => {
      setIsOTPsubmitting(false);
    if(otpToken){
      if(otpToken.toString() === "1111"){
        setIsOTPcorrect(true);
        if(FPassToast.current){
          FPassToast.current.show({ severity: 'success', summary: 'Valid OTP', detail: 'OTP Authorization is Successfull' });
        }
      }else{
        setIsOTPcorrect(false);
        if(FPassToast.current){
          FPassToast.current.show({ severity: 'error', summary: 'Invalid OTP', detail: 'OTP Authorization is Unsuccessfull' });
        }
      }
    }
  }, 2000);
  }

  const handleResendOTP = ()=>{
    if(FPassToast.current){
      FPassToast.current.show({ severity: 'success', summary: 'OTP Resend Successfully !', detail: 'You can resend OTP again after 02:30 seconds' });
    }
    setDisableResendOTP(true);
    setTimeout(() => {
      setDisableResendOTP(false);
    }, 5000);
  }

  const handleNewPasswordForm = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setIsUpdatingNewPass(true);
    setTimeout(() => {
      setIsUpdatingNewPass(false);
      if(FPassToast.current){
        FPassToast.current.show({ severity: 'success', summary: 'Password Reset Successfully !', detail: 'Your password has been updated successfully !' });
      }
      setTimeout(() => {
        Navigate("/login",{replace:true})
      }, 2000);
      
    }, 2000);
  }

  return (
    <>
    <Toast ref={FPassToast} position="top-center" />

      <Dialog
        header="Student Forgot Password"
        visible={true}
        style={{ width: "50vw" }}
        onHide={() => {
          Navigate("/login", { replace: true });
        }}
        className="w-11 lg:w-5"
      >
        <Card className="mt-1 w-full">
          <form onSubmit={handleStuForgotPassFormSubmit}>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <InputText
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setIsEmailValid(false);
                  let email = e.target.value;
                  setEmail(email);
                  if (
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      email
                    )
                  ) {
                    setIsEmailValid(true);
                  } else {
                    setIsEmailValid(false);
                  }
                }}
                className="text-center font-bold"
                disabled={isStudentExist ? true : false}
              />
              {isStudentExist == null ? (
                <Button
                  className={`${isStudentExist}`}
                  disabled={!isEmailValid || isValidating}
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
          {(isStudentExist && !isOTPcorrect) && (
            <div className="mt-4">
              <form onSubmit={handleOTPSubmit}>
                <div className="card flex justify-content-center">
                  <div className="flex flex-column align-items-center w-full">
                    <p className="text-color-secondary block mb-5">
                      Please enter the code sent to your registered email
                    </p>
                    <div className="card flex justify-content-center">
                      <InputOtp
                        value={otpToken}
                        onChange={(e) => setOtpTokens(e.value)}
                        required
                        integerOnly
                        length={4}
                      />
                    </div>
                    <div className="flex justify-content-between mt-5 align-self-stretch">
                      <Button type="button" label="Resend Code" disabled={disableResendOTP} link className="p-0" onClick={handleResendOTP}></Button>
                      <Button type="submit" disabled={!isOTPvalid || isOTPsubmitting}>{isOTPsubmitting && <i className="pi pi-spin pi-spinner"></i>}&nbsp;&nbsp;{isOTPsubmitting?"Submitting":"Submit Code"}</Button>
                    </div>
                      <p className="">02:30 sec left</p>
                  </div>
                </div>
              </form>
            </div>
          )}

          {(isStudentExist && isOTPcorrect) &&
                  <div className="mt-4">
                  <form onSubmit={handleNewPasswordForm}>
                    <label htmlFor="stu-new-password" className="block text-900 font-medium mb-1">New Password</label>
                    <div className="p-inputgroup flex-1 mb-3">
                            <span className="p-inputgroup-addon">
                              <i className="pi pi-lock"></i>
                            </span>
                            <InputText
                              id="stu-new-password"
                              name="stu-new-password"
                              type="password"
                              placeholder="Password"
                              value={stuNewPassword}
                              onChange={(e) => {
                                setStuNewPassword(e.target.value);
                              }}
                              required
                            />
                            <span
                              className="p-inputgroup-addon"
                              onClick={() => {
                                const ele = document.getElementById("stu-new-password") as HTMLInputElement | null;
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
        
                          <label htmlFor="stu-new-cpassword" className="block text-900 font-medium mb-1">Confirm New Password</label>
                          <div className="p-inputgroup flex-1 mb-3">
                            <span className="p-inputgroup-addon">
                              <i className="pi pi-lock"></i>
                            </span>
                            <InputText
                              id="stu-new-cpassword"
                              name="stu-new-cpassword"
                              type="password"
                              placeholder="Confirm Password"
                              value={stuNewCPassword}
                              onChange={(e) => {
                                setStuNewCPassword(e.target.value);
                              }}
                              required
                            />
                            <span
                              className="p-inputgroup-addon"
                              onClick={() => {
                                const ele = document.getElementById("stu-new-cpassword") as HTMLInputElement | null;
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
                          <Button  type="submit" label={`${isUpdatingNewPass ? "Updating" :"Update"}`} disabled={((isPasswordsSame && stuNewPassword)?false:true) ||(isUpdatingNewPass?true:false)} className="w-full text-center" >
                          {isUpdatingNewPass && <i className="pi pi-spin pi-spinner"></i>}
                          </Button>
                  </form>
                  </div>

          }
        </Card>
      </Dialog>
    </>
  );
}

export default StudentForgotPassword;
