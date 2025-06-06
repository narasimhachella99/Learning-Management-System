import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Register from "./components/Register";
import StudentHome from "./student/StudentHome";
import TeacherHome from "./teacher/TeacherHome";
import Courses from "./teacher/Courses";
import UpdateCourse from "./teacher/UpdateCourse";
import AddCourse from "./teacher/AddCourse";
import AllCourses from "./student/AllCourses";
import StudentRequests from "./teacher/StudentRequests";
import ViewResponse from "./student/ViewResponse";
import Payment from "./student/Payment";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/studenthome" element={<StudentHome />} />
          <Route path="/teacherhome" element={<TeacherHome />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/updateCourse/:id" element={<UpdateCourse />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/studentrequests" element={<StudentRequests />} />
          <Route path="/viewresponse" element={<ViewResponse />} />
          <Route path="/payment/:id" element={<Payment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
