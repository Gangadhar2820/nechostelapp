import React, { useEffect, useRef, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { AdminInchargeRegisteration } from "../services/RegisterService";

function AdminInchargeRegister() {
  const [hostelId, setHostelId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneno, setPhoneno] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [CPassword, setCPassword] = useState<string>("");
  const [isFormValid,setIsFormValid] = useState<boolean>(false);
  const [isRegistering,setIsRegistering] = useState<boolean>(false);

  const adminInchargeToast = useRef<Toast>(null);


  const ValidateForm = ()=>{
    setIsFormValid(false);
    if(hostelId != "" && name !="" && /^[0-9]{10}$/.test(phoneno) &&
     username != "" && password != "" && CPassword === password){
      setIsFormValid(true);
     }
    else{
      setIsFormValid(false);
    }
  }

  useEffect(()=>{
    ValidateForm();
  },[hostelId,name,phoneno,username,password,CPassword]);

  const handleAdminInchargeRegister = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsRegistering(true);
    AdminInchargeRegisteration(hostelId,name,phoneno,username,password).then((data)=>{
      setIsRegistering(false);
      const {success,message} = data;
      if(success){
      if(adminInchargeToast.current){
        adminInchargeToast.current.show({ severity: 'success', summary: 'Register Successfully !', detail: 'New Incharge has been added' });
      }
      setHostelId("");setName("");setPhoneno("");setUsername("");setPassword("");setCPassword("")
    }else{
      if(adminInchargeToast.current){
        adminInchargeToast.current.show({ severity: 'error', summary: 'Register Failed', detail: 'Incharge already exist' });
      }
    }
    }).catch((err)=>{
      console.log(err)
    })
   
  };

  return (
    <>
    <Toast ref={adminInchargeToast} position="bottom-center"></Toast>
      <div
        className="p-2 w-10"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Incharge Registration">
          <form
            action=""
            className="grid"
            onSubmit={handleAdminInchargeRegister}
          >
            <div className="col-12 md:col-6 mt-3">
              <FloatLabel>
                <InputText
                  id="inc-hostelid"
                  type="text"
                  className="w-12 sm:w-8"
                  value={hostelId}
                  onChange={(e) => {
                    setHostelId(e.target.value.toUpperCase());
                  }}
                  required
                />
                <label htmlFor="inc-hostelid">Hostel Id</label>
              </FloatLabel>
            </div>
            
            <div className="col-12 md:col-6 mt-3">
              <FloatLabel>
                <InputText
                  id="inc-name"
                  type="text"
                  className="w-12 sm:w-8"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <label htmlFor="inc-name">Name</label>
              </FloatLabel>
            </div>
            <div className="col-12 md:col-6 mt-3">
              <FloatLabel>
                <InputText
                  id="inc-phoneno"
                  type="text"
                  className="w-12 sm:w-8"
                  value={phoneno}
                  onChange={(e) => {
                    setPhoneno(e.target.value);
                  }}
                  required
                />
                <label htmlFor="inc-phoneno">Phone Number</label>
              </FloatLabel>
              { (!(/^[0-9]{10}$/.test(phoneno)) && phoneno!=="" ) && <small id="phoneno-help" className="text-red-500" >Phone number must be 10 digits</small>}

            </div>
            <div className="col-12 md:col-6  mt-3">
              <FloatLabel>
                <InputText
                  id="inc-username"
                  type="text"
                  className="w-12 sm:w-8"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
                <label htmlFor="inc-username">Username</label>
              </FloatLabel>
            </div>


            <div className="col-12 md:col-6 mt-3">
              <div className="p-inputgroup flex-1 w-12 sm:w-8 ">
                <FloatLabel>
                  <InputText
                    id="inc-password"
                    type="password"
                    className="w-12 sm:w-8"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="inc-password">Password</label>
                </FloatLabel>
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
            </div>

            <div className="col-12 md:col-6 mt-3">
              <div className="p-inputgroup flex-1 w-12 sm:w-8 ">
                <FloatLabel>
                  <InputText
                    id="inc-cpassword"
                    type="password"
                    className="w-12 sm:w-8"
                    value={CPassword}
                    onChange={(e) => {
                      setCPassword(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="inc-cpassword">Confirm Password</label>
                </FloatLabel>
                <span
                  className="p-inputgroup-addon"
                  onClick={() => {
                    const ele = document.getElementById(
                      "inc-cpassword"
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
              { !(password===CPassword)  && <small id="password-help" className="text-red-500" >Passwords are not same</small>}
            </div>

            <div className="col-12 mt-3 flex justify-content-start">
              <Button  type="submit" disabled={!isFormValid || isRegistering}>
                {isRegistering && <i className="pi pi-spin pi-spinner"></i>}&nbsp;&nbsp;
                {isRegistering?"Registering":"Register"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AdminInchargeRegister;
