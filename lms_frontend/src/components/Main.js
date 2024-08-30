import { Routes as Switch, Route } from 'react-router-dom';

import Header from './Header'
import Home from './Home';
import Footer from './footer';
import About from './About';
import CourseDetails from './CourseDetails';

// List Pages
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import CourseChapters from './Teacher/CourseChapters';
import PopularTeachers from './PopularTeachers';
import CategoryCourse from './CategoryCourse';
import TeacherSkillCourses from './TeacherSkillCourses';

// User
import Login from './User/Login';
import Logout from './User/StudentLogout';
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import FavoriteCourses from './User/FavoriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import MyCourses from './User/MyCourses';
import ProfileSettings from './User/ProfileSettings';
import ChangePassword from './User/ChangePassword';

//  Teacher
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherLogout from './Teacher/TeacherLogout';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherDashboard from './Teacher/TeacherDashboard';
import EnrolledStudents from './Teacher/EnrolledStudents';
import TeacherChangePassword from './Teacher/TeacherChangePassword';
import TeacherCourses from './Teacher/TeacherCourses';
import TeacherProfileSettings from './Teacher/TeacherProfileSettings';
import AddCourse from './Teacher/AddCourse';
import AddChapter from './Teacher/AddChapter';
import EditChapter from './Teacher/EditChapter';
import TeacherUsers from './Teacher/TeacherUsers';
import TeacherDetail from './Teacher/TeacherDetail'
import CreateCourse from './Teacher/CreateCourse';
import EditCourse from './Teacher/EditCourse';

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
          <Route path='/user-logout' element={<Logout />} />
          <Route path='/user-register' element={<Register />} />
          <Route path='/user-dashboard' element={<Dashboard />} />
          <Route path='/favorite-courses' element={<FavoriteCourses />} />
          <Route path='/recommended-courses' element={<RecommendedCourses />} />
          <Route path='/my-courses' element={<MyCourses />} />
          <Route path='/profile-settings' element={<ProfileSettings />} />
          <Route path='/change-password' element={<ChangePassword />} />

          {/* Teacher */}
          <Route path='/teacher-login' element={<TeacherLogin />} />
          <Route path='/teacher-logout' element={<TeacherLogout />} />
          <Route path='/teacher-register' element={<TeacherRegister />} />
          <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
          <Route path='/teacher-change-password' element={<TeacherChangePassword />} />
          <Route path='/teacher-courses' element={<TeacherCourses />} />
          <Route path='/teacher-profile-settings' element={<TeacherProfileSettings />} />
          <Route path='/add-course' element={<AddCourse />} />
          <Route path='/edit-course/:course_id' element={<EditCourse />} />
          <Route path='/add-chapter/:course_id' element={<AddChapter />} />
          <Route path='/edit-chapter/:chapter_id' element={<EditChapter />} />
          <Route path='/teacher-users' element={<TeacherUsers />} />
          <Route path='/enrolled-students/:course_id' element={<EnrolledStudents />} />
          <Route path='/teacher-detail/:teacher_id' element={<TeacherDetail />} />
          <Route path='/create-course' element={<CreateCourse />} />

          {/* List Pages */}
          <Route path='/all-courses' element={<AllCourses />} />
          <Route path='/popular-courses' element={<PopularCourses />} />
          <Route path='/all-chapters/:course_id' element={<CourseChapters />} />
          <Route path='/popular-teachers' element={<PopularTeachers />} />
          <Route path='/category/:category_slug' element={<CategoryCourse />} />
          <Route path='/teacher-skill-courses/:skill_name/:teacher_id' element={<TeacherSkillCourses />} />
        </Switch>
        <Footer />
      </div>
    );
  }
  
  export default Main;
  