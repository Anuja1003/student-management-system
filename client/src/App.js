//import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import GuestLayout from './components/guestLayout/GuestLayout';
import Home from './components/guestLayout/Home';
import About from './components/guestLayout/About';
import Services from './components/guestLayout/Services';
import Contact from './components/guestLayout/Contact';
import Register from './components/Register';
import Login from './components/Login';
import UserLayout from './components/userLayout/UserLayout';
import Profile from './components/userLayout/Profile';
import ForgotPassword from './components/guestLayout/forgot-password';
import ChangePassword from './components/userLayout/change-password';
import AdminLayout from './components/AdminLayout/AdminLayout';
import AdminProfile from './components/AdminLayout/AdminProfile';
import PendingUsers from './components/AdminLayout/PendingUsers';
import AllStudents from './components/AdminLayout/AllStudents';
import ChangeAdminPassword from './components/AdminLayout/changePassword';
import StudentDashboard from './components/userLayout/StudentDashboard';
import ResultsManagement from './components/AdminLayout/Result';
import Attendance from './components/AdminLayout/Attendance';






function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<GuestLayout />}>
        <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
        </Route>

        <Route path='/user' element={<UserLayout />}>
          <Route index element={<Profile />} />
          <Route path="changePassword" element={<ChangePassword />}/>
          <Route path="StudentDashboard" element={<StudentDashboard />} />
          
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminProfile />} />
        <Route path="changePassword" element={<ChangeAdminPassword />} />
        <Route path="PendingUsers" element={<PendingUsers />} />
       <Route path="AllStudents" element={<AllStudents />} />
       <Route path="Result" element={<ResultsManagement />} />
       <Route path="Attendance" element={<Attendance />} />
     
      
       </Route>
        
      </Routes>
    </div>
  );
}

export default App;
