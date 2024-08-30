import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api/teachers/'

function TeacherRegister() {
  const [teacherData, setTeacherData] = useState({
    full_name: '',
    email: '',
    password: '',
    qualification: '',
    phone: '',
    skills: '',
    status: '',
  });

  const navigate = useNavigate();

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
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("phone", teacherData.phone);
    teacherFormData.append("skills", teacherData.skills);

    try {
      const response = await axios.post(baseurl, teacherFormData);
      setTeacherData({
        full_name: '',
        email: '',
        password: '',
        qualification: '',
        phone: '',
        skills: '',
        status: 'success',
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Teacher registration complete!',
          icon: 'success',
          toast: true,
          timer: 5000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false
        });
        navigate('/teacher-login/');
      }
    } catch (error) {
      console.log(error);
      setTeacherData({ ...teacherData, status: 'error' });
    }
  };

  useEffect(() => {
    document.title = 'Teacher Register';
  }, []);

  // After successful registration direct user to Dashboard
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  if (teacherLoginStatus === 'true') {
    window.location.href = '/teacher-dashboard';
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-6 offset-3'>
          {teacherData.status === 'success' && <p className="text-success">Registration Complete!</p>}
          {teacherData.status === 'error' && <p className="text-danger">Unsuccessful, Something Wrong!</p>}
          <div className='card'>
            <h5 className='card-header'>Teacher Register</h5>
            <div className='card-body'>
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input value={teacherData.full_name} onChange={handleChange} name="full_name" id="full_name" type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input value={teacherData.email} onChange={handleChange} name="email" id="email" type="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input value={teacherData.password} onChange={handleChange} name="password" id="password" type="password" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="qualification" className="form-label">Qualifications</label>
                  <input value={teacherData.qualification} onChange={handleChange} name="qualification" id="qualifications" type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input value={teacherData.phone} onChange={handleChange} name="phone" id="phone" type="number" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">Skills</label>
                  <textarea value={teacherData.skills} onChange={handleChange} name="skills" id="skills" className='form-control'></textarea>
                  <div id="skillsHelp" className="form-text">Fashion, Programming, Music, Gaming, etc.</div>
                </div>
                <Link to="/teacher-login">Login</Link>
                <button type="submit" className="btn btn-primary float-end">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;
