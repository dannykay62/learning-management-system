import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api/teachers/'

function TeacherRegister() {
  const [teacherData, setTeacherData]=useState({
    'full_name':'',
    'email':'',
    'password':'',
    'qualification':'',
    'phone':'',
    'skills':'',
    'status':'',
  });

  const navigate = useNavigate();

  // Update elements value
  const handleChange=(event)=>{
    console.log(event.target.name,event.target.value);
    setTeacherData({
      ...teacherData,
      [event.target.name]:event.target.value
    });
  }
  // End update elements value
  // Submit form
  const submitForm= async (event)=>{
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name)
    teacherFormData.append("email", teacherData.email)
    teacherFormData.append("password", teacherData.password)
    teacherFormData.append("qualification", teacherData.qualification)
    teacherFormData.append("phone", teacherData.phone)
    teacherFormData.append("skills", teacherData.skills)
    console.log(teacherFormData);
    try{
      const response = await axios.post(baseurl, teacherFormData);
      // .then((response) => {
        if (response.status ===200) {
          setTeacherData(
            {
              'full_name':'',
              'email':'',
              'password':'',
              'qualification':'',
              'phone':'',
              'skills':'',
              'status':'success',
            });
            Swal.fire({
              title: 'Teacher registered successfully!',
              icon: 'success',
              toast: true,
              timer: 3000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false
          });
          console.log('Course updated successfully:', response.data);
          navigate('/teacher-login/');
        } else {
          setTeacherData({ 'status': 'error'});
        }
      } catch(error) {
        console.log(error)
        setTeacherData({'status':'error'});
      }
  };
  // End Submit form
  useEffect(() => {
    document.title = 'Teacher Register';
  });

  
  // After successful registartion direct user to Dashboard
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  if(teacherLoginStatus==='true') {
    window.location.href='/teacher-dashboard/';
  }
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                  <div className='card'>
                        <h5 className='card-header'>Teacher Register</h5>
                        <div className='card-body'>
                        <form>
                          <div className="mb-3">
                            <label for="fullName" className="form-label">Full Name</label>
                            <input value={teacherData.full_name} onChange={handleChange} name="full_name" id="full_name" type="text" className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input value={teacherData.email} onChange={handleChange} name="email" id="email" type="email" className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input value={teacherData.password} onChange={handleChange} name="password" id="password" type="password" className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label for="qualification" className="form-label">Qualifications</label>
                            <input value={teacherData.qualification} onChange={handleChange} name="qualification" id="qualifications" type="text" className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label for="phoneNumber" className="form-label">Phone Number</label>
                            <input value={teacherData.phone} onChange={handleChange} name="phone" id="phone" type="number" className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label for="skills" className="form-label">Skills</label>
                            <textarea value={teacherData.skills} onChange={handleChange} name="skills" id="skills" className='form-control'></textarea>
                            <div id="skillsHelp" className="form-text">Fashion, Programming, Music, Gaming, etc.</div>
                          </div>
                          <button onClick={ submitForm } type="submit" className="btn btn-primary float-end">Register</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherRegister;