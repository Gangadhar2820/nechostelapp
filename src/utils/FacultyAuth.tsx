import React, { createContext, useContext, useState, useEffect } from "react";

const FacultyAuthContext = createContext<any>(null);

export const FacultyAuthProvider = ({ children }:any) => {
  const [facultyExist, setFacultyExist] = useState(() => {
    const storedFaculty = localStorage.getItem("facultyExist");
    return storedFaculty ? JSON.parse(storedFaculty) : false;
  });

  const facultyLogin = () => {
    setFacultyExist(true);
    localStorage.setItem("facultyExist", JSON.stringify(true));
  };

  const facultyLogout = () => {
    setFacultyExist(false);
    localStorage.removeItem("facultyExist");
  };

  return (
    <FacultyAuthContext.Provider value={{ facultyExist, facultyLogin, facultyLogout }}>
      {children}
    </FacultyAuthContext.Provider>
  );
};

export const useFacultyAuth = () => {
  return useContext(FacultyAuthContext);
};
