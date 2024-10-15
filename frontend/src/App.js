import React from 'react';
import './App.css';
import AllDayoutPackages from './components/AllDayoutPackages';
import Header from './components/CusHeader';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import UpdatePackage from './components/UpdatePackage';
import CreateDayoutings from './components/CreateDayoutings';
import FDashboard from './components/FDashboard';
import CreateSpaService from './components/CreateSpaService';
import AllSpaServices from './components/AllSpaServices';
import DayoutPackagerDashboard from './components/DayoutPackagesDashboard';
import SpaServicesDashboard from './components/SpaServicesDashboard';
import SpaDash from './components/spaDash';
import UpdateSpa from './components/UpdateSpa';
import AllActivities from './components/AllActivities';
import CreditCardForm from './components/CreditCardForm';
import PaymentPage from './components/PaymentPage';
import Login from './components/ServiceManagerLogin';
import ActivitiDashboard from './components/ActivityDashboard';
import CustomerFooter from './components/CustomerFooter';
import FacilityDAdmin from './components/FacilityDAdmin';
import UpdateActivities from './components/UpdateActivities';
import CreateActivities from './components/CreateActivities';
import SpaAppointment from './components/SpaAppointment';
import AppointmentPage from './components/AppointmentPage';
import Report from './components/Report';
import AppointmentPaymentPage from './components/AppointmentPaymentPage';
import CusHeader from './components/CusHeader';
import AddRoom from './components/AddRoom'; 
import AllRooms from './components/AllRooms';
import UpdateRoom from './components/UpdateRoom';
import AddBookingR from './components/AddBookingR';
import UpdateRoomBooking from './components/UpdateRoomBookings';
import AllRoomBookings from './components/AllRoomBookings';
import Home from './components/Home';
import CusLogin from './components/CusLogin';
import CusRegister from './components/CusRegister';
import ReservationManagerLogin from './components/ReservationManagerLogin';
import ResRegister from './components/ResRegister';
import Logins from './components/Logins';
import ManagerLogins from './components/ManagerLogins';
import BreetasGarden from './components/BreetasGarden';
import CusAllRooms from './components/CusAllRooms';
import ResManagerHeader from './components/ResManagerHeader';
//import CusHeader from './components/CusHeader';
import CusViewAllBookings from './components/CusViewAllBookings';
import CusRoomBooking from './components/CusRoomBooking';
import MyBooking from './components/MyBooking';
import AllBookings from './components/AllBookings';
import Promotions from './components/Promotions';
import AllPromotions from './components/AllPromotions';
import LoginPage from './components/EventManagerLogin';
import ManagerNav from './components/ManagerNav';
import ServiceManagerLogin from './components/ServiceManagerLogin';
import HomePage from './components/HomePage';
import AllReviews from './components/AllReviews';
import AddReview from './components/AddReview';
import AdminLogin from './components/AdminLogin';
import ServiceManagerHeader from './components/ServiceManagerHeader';
import StockManagerLogin from './components/StockManagerLogin';
import StockDashboard from './components/Stocks';
import ViewStocks from './components/ViewStock';
import AddStockItem from './components/AddStockItem';
import GenerateReport from './components/GenerateReport';
import InventoryTracker from './components/InventoryTracker';

import ViewStaff from './Pages/view_staff';
import AddStaff from './Pages/add_staff';
import UpdateStaff from './Pages/update_staff';
import StaffLogin from './Pages/login';
import MarkAttendance from './Pages/mark_attendance';
import ViewAttendance from './Pages/view_attendance';
import Register from './Pages/register';
import UserDashboard from './Pages/UserDashboard';
import ViewAllAttendance from './Pages/view_all_attendance';
import ViewAllLeaves from './Pages/view_all_leaves';
import LeaveReportPage from './Pages/leave_report';
import StaffDashboard from './Pages/staffDashboard';
import StaffReport from './Pages/staff_report';
import StaffManagerLogin from './components/StaffManagerLogin';

import AddMenu from './Pages/add_menu';
import UpdateMenu from './Pages/update_menu';
import ViewMenu from './Pages/view_menu';
import MenuReport from './Pages/menu_report';
import MenuDashboard from './Pages/menuDashboard';
import AttendanceReport from './Pages/attendance_report';
import MenuPage from './Pages/Guest/homepage';
import MenuManagerLogin from './components/MenuManagerLogin';
import StaffsLogin from './components/StaffLogin';

//import CustomerFooter from './components/CustomerFooter';

// New Component to handle the conditional rendering of the Header
/*function Layout() {
  const location = useLocation();
  const showHeader = location.pathname !== '/slogin'; // Show header if not on login page
  const showFooter = location.pathname !== '/';
*/





function App(){
  return (
    <Router>
      {/*{showHeader && <CusHeader />} {/* Conditionally render Header */}
      <div>
      <Routes>
        <Route path="/" exact element={<HomePage/>}/>
        <Route path="/CusHeader" exact element={<CusHeader/>}/>
        <Route path="/Home" exact element={<HomePage/>}/>
        <Route path="/logins" exact element={<Logins/>}/>
        <Route path="/login" exact element={<CusLogin/>}/>
        <Route path="/register" exact element={<CusRegister/>}/>

        {/*Ojani Opening */}

        <Route path="/slogin" exact element={<ServiceManagerLogin />} />
        <Route path="/package-Dashboard" exact element={<DayoutPackagerDashboard />} />
        <Route path="/day-out-packages" exact element={<AllDayoutPackages />} />
        <Route path="/spa-services" exact element={<AllSpaServices />} />
        <Route path="/spa-intro" exact element={<SpaServicesDashboard />} />
        <Route path="/spaD" exact element={<SpaDash />} />
        <Route path="/dayCreate" exact element={<CreateDayoutings />} />
        <Route path="/sCreate" exact element={<CreateSpaService />} />
        <Route path="/Supdate/:id" exact element={<UpdateSpa />} />
        <Route path="/update/:id" exact element={<UpdatePackage />} />
        <Route path="/activityy" exact element={<AllActivities />} />
        <Route path="/creditcard" exact element={<CreditCardForm />} />
        <Route path="/paymentSpa" exact element={<PaymentPage />} />
        <Route path="/activitiesD" exact element={<AllActivities/>}/>
        <Route path="/facilities-dashboard" exact element={<FDashboard />} />
        <Route path="/activitD" exact element = {<ActivitiDashboard/>}/>
        <Route path="/Aupdate/:id" exact element={<UpdateActivities/>}/>
        <Route path="/admin-facilityD" exact element = {<FacilityDAdmin/>}/>
        <Route path="/createActivity" exact element={<CreateActivities/>}/>
        <Route path="/appointmentPage" exact element={<SpaAppointment/>}/>
        <Route path="/appointmentBooking" excat element={<AppointmentPage/>}/>
        <Route path="/AppointmentPayment" excat element={<AppointmentPaymentPage/>}/>
        <Route path="/report" exact element ={<Report/>}/>
        <Route path="/servheader" exact element ={<ServiceManagerHeader/>}/>
        

        {/*Ojani Closing */}

        {/*Nimla openng */}

        
        <Route path="/resheader" exact element={<ResManagerHeader/>}/>
        <Route path="/managerlogin" exact element={<ManagerLogins/>}/>
        <Route path="/getrooms" exact element={<AllRooms/>}/>
        <Route path="/reslogin" exact element={<ReservationManagerLogin/>}/>
        <Route path="/resregister" exact element={<ResRegister/>}/>
        <Route path="/reslogin" exact element={<ReservationManagerLogin/>}/>
        <Route path="/addRoom" exact element={<AddRoom/>}/>
        <Route path="/updateRoom/:id" exact element={<UpdateRoom/>}/>
        <Route path="/getbookings" exact element={<AllRoomBookings/>}/>
        <Route path="/addBooking" exact element={<AddBookingR/>}/>
        <Route path="/updateRoomBooking/:id" exact element={<UpdateRoomBooking/>}/>
        <Route path="/getcusrooms" exact element={<CusAllRooms/>}/>
        <Route path="/getCusBookings" exact element={<CusViewAllBookings/>}/>
        <Route path="/cusBookingroom" exact element={<CusRoomBooking/>}/>
        
        {/*Nimla Closing */}
        
        {/*Nimla Opening 

              <Route path="/" element={<BreetasGarden />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/resheader" element={<ResManagerHeader />} />
              <Route path="/logins" element={<Logins />} />
              <Route path="/managerlogin" element={<ManagerLogins />} />
              <Route path="/getrooms" element={<AllRooms/>}/>
              <Route path="/login" element={<CusLogin />} />
              <Route path="/register" element={<CusRegister />} />
              <Route path="/reslogin" element={<ReservationManagerLogin />} />
              <Route path="/resregister" element={<ResRegister />} />
              <Route path="/addRoom" element={<AddRoom/>}/>
              <Route path="/updateRoom/:id" element={<UpdateRoom/>}/>
              <Route path="/getbookings" element={<AllRoomBookings/>}/>
              <Route path="/addBooking" element={<AddBookingR/>}/>
              <Route path="/updateRoomBooking/:id" element={<UpdateRoomBooking/>}/>
              <Route path="/getcusrooms" element={<CusAllRooms/>}/>
              
              <Route path="/getCusBookings" element={<CusViewAllBookings />} />
              <Route path="/cusBookingroom" element={<CusRoomBooking />} />

        {/*Nimla Closing */}



        {/*Mithula opening */}

        <Route path="/my" exact element ={<MyBooking/>}/>
        <Route path="/AllB" exact element ={<AllBookings/>}/>
        <Route path="/Pro" exact element ={<Promotions/>}/>
        <Route path="/AllPro" exact element ={<AllPromotions/>}/>
        <Route path="/elogin" exact element ={<LoginPage/>}/>
        <Route path="/Man" exact element ={<ManagerNav/>}/>

        {/*Mithula Closing */}

        {/*Janith opening */}
          <Route path="/reviews" exact element ={<AllReviews/>}/>
          <Route path="/add" exact element ={<AddReview/>}/>
          <Route path="/admin-login" exact element ={<AdminLogin/>}/>
          <Route path="/Rupdate/:id" exact element ={<AllReviews/>}/>
          <Route path="/Rupdate/:id" exact element ={<AllReviews/>}/>
          <Route path="/Rupdate/:id" exact element ={<AllReviews/>}/>


         {/*Janith Closing */}

         {/*chathu Opening */}
         <Route path="/stockM" exact element ={<StockManagerLogin/>}/>
         <Route path="/stockDash" exact element ={<StockDashboard/>}/>
         <Route path="/viewstock" exact element ={<ViewStocks/>}/>
         <Route path="/addstockDash" exact element ={<AddStockItem/>}/>
         <Route path="/stockreport" exact element ={<GenerateReport/>}/>
         <Route path="/stockinventry" exact element ={<InventoryTracker/>}/>

         {/*chathu Closing */}

         {/*dulaj Opening */}
         <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/login" element={<StaffLogin />} />
        <Route path="/staff-register" element={<Register />} />
        <Route path="/view-staff" element={<ViewStaff />} />
        <Route path="/add-staff" element={<AddStaff />} />
        <Route path="/all-attendance" element={<ViewAllAttendance />} />
        <Route path="/update-staff/:id" element={<UpdateStaff />} />
        <Route path="/staff-report" element={<StaffReport />} />
        <Route path="/stflogin" element={<StaffManagerLogin/>} />
        <Route path="/stafflogin" element={<StaffsLogin/>} />

        <Route path="/user/*" element={<UserDashboard />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/view-leaves" element={<ViewAllLeaves />} />
        <Route path="/leave-report" element={<LeaveReportPage />} />
        <Route path="/attendance-report" element={<AttendanceReport />} />
        {/*dulaj Closing */}

        {/*bipasha Opening */}
        <Route path="/menu-page" element={<MenuPage />} />
        <Route path="/menu" element={<MenuDashboard />} />
        <Route path="/add-menu" element={<AddMenu />} />
        <Route path="/update-menu/:id" element={<UpdateMenu />} />
        <Route path="/view-menu" element={<ViewMenu />} />
        <Route path="/menu-report" element={<MenuReport />} />
        <Route path="/mnulogin" element={<MenuManagerLogin />} />
        {/*bipasha Closing */}

      </Routes>
      <CustomerFooter/>

      </div>
    </Router>
  );
}

/*function App() {
  return (
    <Router>
      <Layout /> {/* Use Layout component inside Router 
    </Router>
  );
}*/

export default App;
