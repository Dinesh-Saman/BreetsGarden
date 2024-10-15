import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { Route, Routes, useNavigate } from 'react-router-dom';
import MarkAttendance from './mark_attendance';
import ViewAttendance from './view_attendance';
import ApplyLeave from './apply_leave';
import ViewLeaves from './view_leaves';
import Header from '../components/CusHeader'; 
import Footer from '../components/customer_footer';

const UserDashboard = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user) {
            navigate("/login")
        }
    },[])

  return (
    <div>
        <Header></Header>
        <UserHeader />
        <Routes>
            <Route path='/' element={<MarkAttendance />} />
            <Route path='/view' element={<ViewAttendance />} />
            <Route path='/apply-leave' element={<ApplyLeave />} />
            <Route path='/my-leave' element={<ViewLeaves />} />
        </Routes>
    </div>
  )
}

export default UserDashboard