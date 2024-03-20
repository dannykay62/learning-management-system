import {Link} from 'react-router-dom';

function Home() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand pb-3 pt-3" to="/">Learn</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Categories</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Courses</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Teacher
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/teacher-login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/teacher-register">Register</Link>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><Link class="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                  <li><a class="dropdown-item" href="teacher-logout">Logout</a></li>
                </ul>
              </li>
              
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/user-login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/user-register">Register</Link>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><Link class="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                  <li><a class="dropdown-item" href="user-logout">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export def