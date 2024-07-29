import React from "react";
import { Card } from "primereact/card";
import { Timeline } from 'primereact/timeline';

interface TimelineEvent {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}


function StudentHistory() {
  const events: TimelineEvent[] = [
    { status: 'Submitted', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'Accepted', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Arrived', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' }
];

  return (
    <>
      <div
        className="p-2 w-10"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Card>

          <div className="flex">
            <div className="card">
            <Timeline value={events} opposite={(item) => item.status} content={(item) => <small className="text-color-secondary">{item.date}</small>} />
       
        </div>

            <div className="qr">

            </div>
          </div>
     
        </Card>
      </div>
    </>
  );
}

export default StudentHistory;
