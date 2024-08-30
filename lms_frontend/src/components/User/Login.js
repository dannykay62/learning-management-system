import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const baseurl = 'http://127.0.0.1:8000/api';

function Login() {

  const [studentLoginData, setStudentLoginData]=useState({
    email: '',
    password: '',
  });

  const [errorMsg, seterrorMsg]=useState('');
  const navigate = useNavigate(); // To access history from navigation

  const handleChange=(event)=> {
    setStudentLoginData({
      ...studentLoginData,
      [event.target.name]:event.target.value
    });
  }

  const submitForm=(event) => {
    event.preventDefault(); // To prevent default submission
    const formData = new FormData();
    formData.append('email', studentLoginData.email)
    formData.append('password', studentLoginData.password)
    try {
      axios.post(baseurl+'/student-login/', formData).then((res)=>{
        if(res.data.bool===true){
          localStorage.setItem('studentLoginStatus',true);
          localStorage.setItem('studentId',res.data.student_id);
          navigate('/user-dashboard');
        } else {
          seterrorMsg('Invalid Username or Password!');
        }
      });
      // console.log(studentId);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus==='true') {
      navigate('/user-dashboard'); // Redirect using navigate
    }
  },[navigate]) // Include navigate in dependency array
  
  useEffect(() => {
    document.title = 'User Login';
  });
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card'>
                        <h5 className='card-header'>User Login</h5>
                        <div className='card-body'>
                        {errorMsg && <p className='text-danger'>{ errorMsg }</p>}
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Username</label>
                            <input type="email" value={studentLoginData.email} name='email' onChange={handleChange} className="form-control" />
                          </div>
                          <div class="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" value={studentLoginData.password} name='password' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                          </div>
                          {/* <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                          </div> */}
                          <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                          <Link to="/user-register" className="float-end">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;