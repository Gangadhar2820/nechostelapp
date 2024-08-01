import React, { useContext } from "react";
import ReqCard from "./ReqCard";
import { Card } from "primereact/card";
import { UserContext } from "./Home";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);

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
        <Card title="Last Request" className="mt-3">
          {user?.lastRequest !== null ? <ReqCard request={user?.lastRequest} /> : "no data found"}
        </Card>
      </div>
    </>
  );
}

export default Dashboard;
