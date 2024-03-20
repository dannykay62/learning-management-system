import { Routes as Switch, Route } from 'react-router-dom';

import Header from './Header'
import Home from './Home';
import Footer from './footer';
import About from './About';
import CourseDetails from './CourseDetails';

// List Pages
import AllCourses from './AllCourses';

// User
import Login from './User/Login';
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import FavoriteCourses from './User/FavoriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import MyCourses from './User/MyCourses';
import ProfileSettings from './User/ProfileSettings';
import ChangePassword from './User/ChangePassword';

//  Teachers
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherChangePassword from './Teacher/TeacherChangePassword';
import TeacherCourses from './Teacher/TeacherCourses';
import TeacherProfileSettings from './Teacher/TeacherProfileSettings';
import TeacherAddCourse from './Teacher/TeacherAddCourse';
import TeacherUsers from './Teacher/TeacherUsers';
import TeacherDetail from './Teacher/TeacherDetail'

function Main() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/details/:course_id' element={<CourseDetails />} />

          {/* User */}
          <Route path='/user-login' element={<Login />} />
          <Route path='/user-register' element={<Register />} />
          <Route path='/user-dashboard' element={<Dashboard />} />
          <Route path='/favorite-courses' element={<FavoriteCourses />} />
          <Route path='/recommended-courses' element={<RecommendedCourses />} />
          <Route path='/my-courses' element={<MyCourses />} />
          <Route path='/profile-settings' element={<ProfileSettings />} />
          <Route path='/change-password' element={<ChangePassword />} />

          {/* Teachers */}
          <Route path='/teacher-login' element={<TeacherLogin />} />
          <Route path='/teacher-register' element={<TeacherRegister />} />
          <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
          <Route path='/teacher-change-password' element={<TeacherChangePassword />} />
          <Route path='/teacher-courses' element={<TeacherCourses />} />
          <Route path='/teacher-profile-settings' element={<TeacherProfileSettings />} />
          <Route path='/teacher-add-course' element={<TeacherAddCourse />} />
          <Route path='/teacher-users' element={<TeacherUsers />} />
          <Route path='/teacher-detail/:teacher_id' element={<TeacherDetail />} />

          {/* List Pages */}
       