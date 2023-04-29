import React from "react";
import { Routes, Route } from "react-router-dom";

import Index from "./components/index/Index";
import About from "./components/index/About";

import AddAdmin from "./components/admin/addAdmin/AddAdmin";
import AddDepartment from "./components/admin/addDepartment/AddDepartment";
import AddFaculty from "./components/admin/addFaculty/AddFaculty";
import AddStudent from "./components/admin/addStudent/AddStudent";
import AddSubject from "./components/admin/addSubject/AddSubject";
import AdminHome from "./components/admin/AdminHome";

import GetAdmin from "./components/admin/getAdmin/GetAdmin";
import GetFaculty from "./components/admin/getFaculty/GetFaculty";
import GetStudent from "./components/admin/getStudent/GetStudent";
import GetSubject from "./components/admin/getSubject/GetSubject";
import AdminProfile from "./components/admin/profile/Profile";
import AdminFirstTimePassword from "./components/admin/profile/update/firstTimePassword/FirstTimePassword";
import AdminPassword from "./components/admin/profile/update/password/Password";

import AdminUpdate from "./components/admin/profile/update/Update";
import CreateTest from "./components/faculty/createTest/CreateTest";
import FacultyHome from "./components/faculty/FacultyHome";
import MarkAttendance from "./components/faculty/markAttendance/MarkAttendance";
import FacultyProfile from "./components/faculty/profile/Profile";
import FacultyFirstTimePassword from "./components/faculty/profile/update/firstTimePassword/FirstTimePassword";
import FacultyPassword from "./components/faculty/profile/update/password/Password";
import FacultyUpdate from "./components/faculty/profile/update/Update";
import UploadMarks from "./components/faculty/uploadMarks/UploadMarks";
import AdminLogin from "./components/login/adminLogin/AdminLogin";
import FacultyLogin from "./components/login/facultyLogin/FacultyLogin";
import Login from "./components/login/Login";

import StudentLogin from "./components/login/studentLogin/StudentLogin";
import StudentFirstTimePassword from "./components/student/profile/update/firstTimePassword/FirstTimePassword";
import StudentHome from "./components/student/StudentHome";
import StudentProfile from "./components/student/profile/Profile";
import StudentUpdate from "./components/student/profile/update/Update";
import StudentPassword from "./components/student/profile/update/password/Password";
import SubjectList from "./components/student/subjectList/SubjectList";
import TestResult from "./components/student/testResult/TestResult";
import Attendance from "./components/student/attendance/Attendance";
import DeleteAdmin from "./components/admin/deleteAdmin/DeleteAdmin";
import DeleteDepartment from "./components/admin/deleteDepartment/DeleteDepartment";
import DeleteFaculty from "./components/admin/deleteFaculty/DeleteFaculty";
import DeleteStudent from "./components/admin/deleteStudent/DeleteStudent";
import DeleteSubject from "./components/admin/deleteSubject/DeleteSubject";
import CreateNotice from "./components/admin/createNotice/CreateNotice";
import PageNotFound from './components/error';
import SmartLogin from "./components/login/mlLogin";

import UnderConstruction from "./components/index/underConstruction";

import { CookieConsentBanner } from "./components/cookies/CookieConsentBanner";

import './assets/stylesheets/confirmation-box.scss';

const App = () => {
  return (
    <>
        <CookieConsentBanner />
        <Routes>
          <Route path="/" element={<Index />} />
    
            {/* Web Page */}
    
            <Route path="/about" element={<About />} />
    
            {/* Login */}
    
            <Route path="/login" element={<Login />} />
    
            {/* Admin  */}
    
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/update" element={<AdminUpdate />} />
            <Route path="/admin/update/password" element={<AdminPassword />} />
            <Route
              path="/admin/updatepassword"
              element={<AdminFirstTimePassword />}
            />
            <Route path="/admin/createnotice" element={<CreateNotice />} />
            <Route path="/admin/addadmin" element={<AddAdmin />} />
            <Route path="/admin/deleteadmin" element={<DeleteAdmin />} />
            <Route path="/admin/adddepartment" element={<AddDepartment />} />
            <Route path="/admin/deletedepartment" element={<DeleteDepartment />} />
            <Route path="/admin/addfaculty" element={<AddFaculty />} />
            <Route path="/admin/deletefaculty" element={<DeleteFaculty />} />
            <Route path="/admin/deletestudent" element={<DeleteStudent />} />
            <Route path="/admin/deletesubject" element={<DeleteSubject />} />
            <Route path="/admin/alladmin" element={<GetAdmin />} />
            <Route path="/admin/allfaculty" element={<GetFaculty />} />
            <Route path="/admin/addstudent" element={<AddStudent />} />
            <Route path="/admin/addsubject" element={<AddSubject />} />
            <Route path="/admin/allsubject" element={<GetSubject />} />
            <Route path="/admin/allstudent" element={<GetStudent />} />
    
            {/* Faculty  */}
    
            <Route path="/login/faculty" element={<FacultyLogin />} />
            <Route path="/faculty/home" element={<FacultyHome />} />
            <Route path="/faculty/password" element={<FacultyFirstTimePassword />} />
            <Route path="/faculty/profile" element={<FacultyProfile />} />
            <Route path="/faculty/update" element={<FacultyUpdate />} />
            <Route path="/faculty/update/password" element={<FacultyPassword />} />
            <Route path="/faculty/createtest" element={<CreateTest />} />
            <Route path="/faculty/uploadmarks" element={<UploadMarks />} />
            <Route path="/faculty/markattendance" element={<MarkAttendance />} />
    
            {/* Student  */}
    
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/student/home" element={<StudentHome />} />
            <Route path="/student/password" element={<StudentFirstTimePassword />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/update" element={<StudentUpdate />} />
            <Route path="/student/update/password" element={<StudentPassword />} />
            <Route path="/student/subjectlist" element={<SubjectList />} />
            <Route path="/student/testresult" element={<TestResult />} />
            <Route path="/student/attendance" element={<Attendance />} />


            {/* Under Contruction */}

            <Route path="/rti" element={<UnderConstruction />} />
            <Route path="/directors_message" element={<UnderConstruction />} />
            <Route path="/bog" element={<UnderConstruction />} />
            <Route path="/society_members" element={<UnderConstruction />} />
            <Route path="/academic_council" element={<UnderConstruction />} />
            <Route path="/finance_committee" element={<UnderConstruction />} />
            <Route path="/linkages/da-iict" element={<UnderConstruction />} />
            <Route path="/linkages/gsfc" element={<UnderConstruction />} />
            <Route path="/linkages/germi" element={<UnderConstruction />} />
            <Route path="/linkages/tcs" element={<UnderConstruction />} />
            <Route path="/btech_cse" element={<UnderConstruction />} />
            <Route path="/btech_it" element={<UnderConstruction />} />
            <Route path="/mtech_cse" element={<UnderConstruction />} />
            <Route path="/phd" element={<UnderConstruction />} />
            <Route path="/btech_admission" element={<UnderConstruction />} />
            <Route path="/mtech_admission" element={<UnderConstruction />} />
            <Route path="/phd_admission" element={<UnderConstruction />} />
            <Route path="/faculty" element={<UnderConstruction />} />
            <Route path="/visiting_faculty" element={<UnderConstruction />} />
            <Route path="/staff" element={<UnderConstruction />} />
            <Route path="/faq" element={<UnderConstruction />} />
            <Route path="/student_corner" element={<UnderConstruction />} />
            <Route path="/moodle" element={<UnderConstruction />} />
            <Route path="/library" element={<UnderConstruction />} />
            <Route path="/invited_talks" element={<UnderConstruction />} />
            <Route path="/career" element={<UnderConstruction />} />
            <Route path="/gallery" element={<UnderConstruction />} />
    
            {/* Smart ML Login */}
    
            <Route path="/smartLogin" element={<SmartLogin />} />
    
            {/* 404 Page Not Found  */}
    
            <Route path='*' element={<PageNotFound />}/>
    
        </Routes>
    </>
  );
};

export default App;
