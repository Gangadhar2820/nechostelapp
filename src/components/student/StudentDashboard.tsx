import { useContext } from "react";
import ReqCard from "./ReqCard";
import { Card } from "primereact/card";
import { StudentContext } from "./StudentHome";

function StudentDashboard() {
  const { student } = useContext(StudentContext);

  return (
    <>
      <div
        className="w-12"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card title="Last Request" className="mt-1">
          {student?.lastRequest ? (
            <ReqCard request={student?.lastRequest} />
          ) : (
            "No Data Found"
          )}
        </Card>
      </div>
    </>
  );
}

export default StudentDashboard;
