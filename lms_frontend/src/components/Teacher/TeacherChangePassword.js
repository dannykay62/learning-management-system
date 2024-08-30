import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function TeacherChangePassword() {
  const [teacherData, setTeacherData] = useState({
    'password': '',
  });

  const navigate = useNavigate();
  
  const teacherId = localStorage.getItem('teacherId');

  // Update elements value
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    });
  }

  // Submit form
  const submitForm = async (event) => {
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("password", teacherData.password);

    try {
      const response = await axios.post(`${baseurl}/teacher/change-password/${teacherId}/`, teacherFormData);
      setTeacherData({
        'password': '',
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Password update complete!',
          icon: 'success',
          toast: true,
          timer: 3000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false
        });
        navigate('/teacher-logout/');
      } else {
        alert("Error! Password change unsuccessful.")
      }
    } catch (error) {
      console.log(error);
      setTeacherData({ ...teacherData, status: 'error' });
    }
  };

  // If user is not logged in as teacher direct to login page
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  if (teacherLoginStatus !== 'true') {
    window.location.href = '/teacher-login';
  }

  useEffect(() => {
      document.title = 'Teacher Change Password';
  });
  return(
      <div className='container mt-4'>
          <div className='row'>
              <aside className='col-md-3'>
                  <TeacherSidebar />
              </aside>
              <section className='col-md-9'>
              <div className='card'>
                  <h5 className='card-header'>Change Password</h5>
                  <div className='card-body'>
                      <div class="mb-3 row">
                          <label for="password" class="col-sm-2 col-form-label">New Password</label>
                          <div class="col-sm-10">
                            <input type="password" value={teacherData.password} onChange={handleChange} name="password" class="form-control" id="password" />
                          </div>
                      </div>
                      {/* <div class="mb-3 row">
                      <label for="password_again" class="col-sm-2 col-form-label">New Password again</label>
                          <div class="col-sm-10">
                            <input type="password" name="password_again" class="form-control" id="password_again" />
                          </div>
                      </div> */}
                      
                      <hr/>
                      <button className='btn btn-primary' onClick={submitForm}>Update</button>
                  </div>
                  
              </div>
                  
              </section>
          </div>
      </div>
  );
}

export default TeacherChangePassword;