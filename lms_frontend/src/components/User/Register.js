import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api/'

function Register() {
  const [studentData, setStudentData]=useState({
    'full_name':'',
    'email':'',
    'password':'',
    'username':'',
    'interested_categories':'',
    'status':'',
  });

  const navigate = useNavigate();
  // Update elements value
  const handleChange=(event)=>{
    setStudentData({
      ...studentData,
      [event.target.name]:event.target.value
    });
  }

  // handle interested categories
  // const interest=(event)=>{
  //   setStudentData({
  //     studentData.inter
  //   })
  // }
  // Submit for
  const submitForm=()=>{
    const formData =new FormData();
    formData.append("full_name", studentData.full_name)
    formData.append("email", studentData.email)
    formData.append("password", studentData.password)
    formData.append("username", studentData.username)
    formData.append("interested_categories", studentData.interested_categories)

    try{
      axios.post(baseurl+'student/', studentData).then((response)=>{
        setStudentData({
          'full_name':'',
          'email':'',
          'password':'',
          'username':'',
          'interested_categories':'',
          'status':'success'
        });
      });
      if (studentData.status===200) {
        Swal.fire({
            title: 'User Registered',
            icon: 'success',
            toast: true,
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
        });
      }
      navigate('/user-login/');
    } catch(error) {
      console.log(error);
      setStudentData({...studentData, 'status':'error'});
    }
  };
  // End submit form

  useEffect(() => {
    document.title = 'Student Register';
  });
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                {studentData.status==='success' && <p className="text-success">Registration Complete!</p>}
                {studentData.status==='error' && <p className="text-danger">Unsuccessful, Something Wrong!</p>}
                    <div className='card'>
                        <h5 className='card-header'>User Register</h5>
                        <div className='card-body'>
                          <div className="mb-3">
                            <label for="full_name" className="form-label">Full Name</label>
                            <input type="text" name='full_name' onChange={handleChange} className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" name='email' onChange={handleChange} className="form-control" />
                          </div>
                          <div className="mb-3">
                            <label for="username" className="form-label">Username</label>
                            <input type="text" name='username' onChange={handleChange} className="form-control" />
                          </div>
                          <div class="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" name='password' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                          </div>
                          <div className="mb-3">
                            <label for="interest" className="form-label">Interest(s)</label>
                            <textarea name='interested_categories' onChange={handleChange} className='form-control'></textarea>
                            <div id="emailHelp" class="form-text">Fashion, Programming, Music, Gaming, etc.</div>
                          </div>
                          <button type="submit" onClick={submitForm} className="btn btn-primary">Register</button>
                          <Link to="/user-login" className="float-end">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;