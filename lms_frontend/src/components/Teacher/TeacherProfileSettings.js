import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function TeacherProfileSettings() {
    const [teacherData, setTeacherData] = useState({
        'full_name': '',
        'email': '',
        'prev_img': '',
        'profile_img': '',
        'phone': '',
        'skills': '',
        'qualification': '',
        'status': '',
      });
    
    const navigate = useNavigate();
    const teacherId = localStorage.getItem('teacherId');

    // Fetch teacher data
    useEffect(() => {
      const fetchTeacherData = async () => {
          try{
              axios.get(`${baseurl}/teacher-update/${teacherId}/`).then((res) => {
                  // console.log(res.data)
                  setTeacherData({
                    full_name: res.data.full_name,
                    email: res.data.email,
                    prev_img: res.data.profile_img,
                    profile_img: '',
                    phone: res.data.phone,
                    skills: res.data.skills,
                    qualification: res.data.qualification,
                  });
              });
          } catch(error) {
              console.error('Error fetching data', error);
          }
      };
      fetchTeacherData();
  }, [teacherId]);

  // Update elements value
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    });
  }

  // Update file change
  const handleFileChange = (event) => {
    setTeacherData({ ...teacherData, [event.target.name]: event.target.files[0] });
  };
  // Submit form
  const submitForm = async (event) => {
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("phone", teacherData.phone);
    teacherFormData.append("skills", teacherData.skills);
    teacherFormData.append("qualification", teacherData.qualification);
    if(teacherData.profile_img!==''){
      teacherFormData.append("profile_img", teacherData.profile_img, teacherData.profile_img.name)
    }

    try {
      const response = await axios.put(`${baseurl}/teacher-update/${teacherId}/`, teacherFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTeacherData({
        'full_name': '',
        'email': '',
        'prev_img': '',
        'profile_img': '',
        'qualification': '',
        'phone': '',
        'skills': '',
        'status': 'success',
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Teacher update complete!',
          icon: 'success',
          toast: true,
          timer: 3000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false
        });
        navigate('/teacher-dashboard/');
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
      document.title = 'Teacher Profile Settings';
  });
  return(
      <div className='container mt-4'>
          <div className='row'>
              <aside className='col-md-3'>
                  <TeacherSidebar />
              </aside>
              <section className='col-md-9'>
              <div className='card'>
                  <h5 className='card-header'>Profile Settings</h5>
                  <div className='card-body'>
                      <div className="mb-3 row">
                          <label for="full_name" className="col-sm-2 col-form-label">Full Name</label>
                          <div className="col-sm-10">
                            <input type="text" value={teacherData.full_name} onChange={handleChange} className="form-control" name='full_name' id="full_name" />
                          </div>
                      </div>
                      <div className="mb-3 row">
                          <label for="email" className="col-sm-2 col-form-label">Email</label>
                          <div className="col-sm-10">
                            <input value={teacherData.email} onChange={handleChange} name="email" type="email" className="form-control" id="email" />
                          </div>
                      </div>
                      <hr />
                      <div className="mb-3 row">
                          <label for="profile_img" className="col-sm-2 col-form-label">Profile Image</label>
                          <div className="col-sm-10">
                            <input type="file" onChange={handleFileChange} name='profile_img' className="form-control" id="profile_img" />
                            {/* <input name="feature_img" type="file" accept="image/png, image/jpg" onChange={handleFileChange} class="form-control" /> */}
                            {teacherData.prev_img && (
                              <p className="mt-3"><img src={teacherData.prev_img} width="300" alt={teacherData.full_name} /></p>
                            )}
                          </div>
                      </div>
                      <div className="mb-3 row">
                          <label for="phone" className="col-sm-2 col-form-label">Phone Number</label>
                          <div className="col-sm-10">
                            <input value={teacherData.phone} onChange={handleChange} className="form-control" name="phone" id="phone" type="number" />
                          </div>
                      </div>
                      <hr />
                      <div class="mb-3 row">
                          <label for="skills" className="col-sm-2 col-form-label">Skills</label>
                          <div className="col-sm-10">
                            <textarea value={teacherData.skills} onChange={handleChange} name='skills' className="form-control" id="skills" />
                          </div>
                      </div>
                      <div className="mb-3 row">
                          <label for="qualification" className="col-sm-2 col-form-label">Qualifications</label>
                          <div className="col-sm-10">
                            <textarea value={teacherData.qualification} onChange={handleChange} name='qualification' className="form-control" id="qualification" />
                            <div id="qualification" className="form-text">BSC | MSC etc.</div>
                          </div>
                      </div>
                      <hr/>
                      <button className='btn btn-primary' onClick={submitForm}>Update Profile</button>
                  </div>
                  
              </div>
                  
              </section>
          </div>
      </div>
  );
}

export default TeacherProfileSettings;