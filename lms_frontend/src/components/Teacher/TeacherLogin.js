import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const baseurl = 'http://127.0.0.1:8000/api';
function TeacherLogin() {
  const [teacherLoginData, setTeactherLoginData]=useState({
    email: '',
    password: '',
  });
  
  const [errorMsg, seterrorMsg]=useState('');
  const navigate = useNavigate(); // To access history from navigation

  const handleChange=(event)=> {
    setTeactherLoginData({
      ...teacherLoginData,
      [event.target.name]:event.target.value
    });
  }
  const submitForm=(event) => {
    event.preventDefault(); // To prevent default submission
    const teacherFormData = new FormData();
    teacherFormData.append('email', teacherLoginData.email)
    teacherFormData.append('password', teacherLoginData.password)
    try {
      axios.post(baseurl+'/teacher-login/', teacherFormData).then((res)=>{
        if(res.data.bool===true){
          localStorage.setItem('teacherLoginStatus',true);
          localStorage.setItem('teacherId',res.data.teacher_id);
          navigate('/teacher-dashboard');
        } else {
          seterrorMsg('Invalid Username or Password!');
        }
      });
      // console.log(teacherId);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = 'Teacher Login';
  },[]); // Empty dependency array for useEffect to run once on mount

  // Check login status and redirect if already logged in
  useEffect(() => {
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if(teacherLoginStatus==='true') {
      navigate('/teacher-dashboard'); // Redirect using navigate
    }
  },[navigate]) // Include navigate in dependency array
  
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card'>
                        <h5 className='card-header'>Teacher Login</h5>
                        <div className='card-body'>
                          {errorMsg && <p className='text-danger'>{ errorMsg }</p>}
                        <form onSubmit={submitForm}>
                          <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" value={teacherLoginData.email} onChange={handleChange} name="email" className="form-control" id="email" />
                          </div>
                          <div class="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" value={teacherLoginData.password} onChange={handleChange} name="password" className="form-control" id="password" />
                          </div>
                          <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="remember-me" />
                            <label className="form-check-label" for="remember-me">Remember Me</label>
                          </div>
                          <button type="submit" className="btn btn-primary">Login</button>
                          <Link to="/teacher-register" className="float-end">Register</Link>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;