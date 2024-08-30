import {Link} from 'react-router-dom';

function Home() {
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand mt-2 mb-2 pb-3 pt-3" to="/">Learn</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/category/1">Categories</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/all-courses">Courses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Teacher
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {/* Hide Dashboard and Logout menu if user is not logged in */}
                  {teacherLoginStatus ==='true' &&
                    <>
                      <li><Link class="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                      <li><Link class="dropdown-item" to="teacher-logout">Logout</Link></li>
                    </>
                  }
                  {/* Hide Login and Register menu if logged in */}
                  {teacherLoginStatus !='true' &&
                  <>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/teacher-login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/teacher-register">Register</Link>
                    </li>
                  </>
                  }
                  {/* End Hide login and Regiater */}
                  {/* <li><hr class="dropdown-divider" /></li> */}
                  
                </ul>
              </li>
              
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {/* Hide Dashboard and Logout menu if user is not logged in */}
                  {studentLoginStatus ==='true' &&
                    <>
                      <li><Link class="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                      <li><Link class="dropdown-item" to="/user-logout">Logout</Link></li>
                    </>
                  }
                  {/* Hide Login and Register menu if logged in */}
                  {studentLoginStatus !='true' &&
                  <>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/user-login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/user-register">Register</Link>
                    </li>
                  </>
                  }
                  {/* End Hide login and Regiater */}
                  {/* <li><hr class="dropdown-divider" /></li> */}
                  
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Home;