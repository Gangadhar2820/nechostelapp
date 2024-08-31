import React, { useContext, useEffect } from 'react'
import { AdminContext } from './AdminHome';
import InchargeCard from '../student/InchargeCard';

function AdminProfile() {
  const admin = useContext(AdminContext);

  return (
    <div className="surface-0">
    <div className="flex align-items-start justify-content-between">
      <div className="font-medium text-3xl text-900 m-3">
        <i className="pi pi-user font-medium text-3xl text-900"></i>
        &nbsp;&nbsp;My Profile
      </div>
    </div>
    <InchargeCard incharge={admin} showId={true} />
  </div>
  )
}

export default AdminProfile