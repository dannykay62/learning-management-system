
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const basurl = 'http://127.0.0.1:8000/api'
function PopularTeachers() {
  const [teacher,setTeacher]=useState(null);
  useEffect(() => {
    axios.get(basurl+'/teachers/').then((response) => {
      console.log(response.data);
    });
  },[]);
  useEffect(() => {
    document.title = 'Popular Teachers';
  });
    return(
        <div className="container mt-4">
          {/* Latest Courses */}
          <h3 className="mb-4 pb-1">Popular Courses</h3>
          <div className="row mb-4">
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Ben Ogbeiwi</Link></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <a href="#"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></a>
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Tope Badejo</a></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <a href="#"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></a>
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Wale Akindiya</a></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <a href="#"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></a>
                <div className="card-body">
                  <h5 className="card-title"><a href="#">John Adejoro</a></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Mrs Mba</Link></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Prof. Daniel</Link></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Dr. Joe</Link></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Madam Tee</Link></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
          </div>
          {/* End Latest Courses */}
          {/* Start Pagination */}
          <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-center">
              <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
              <li className="page-item"><Link className="page-link" to="#">1</Link></li>
              <li className="page-item"><Link className="page-link" to="#">2</Link></li>
              <li className="page-item"><Link className="page-link" to="#">3</Link></li>
              <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
            </ul>
          </nav>
          {/* End Pagination */}
        </div>
    );
}

export default PopularTeachers;