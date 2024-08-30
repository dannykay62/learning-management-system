import { Link } from "react-router-dom";
import { useEffect } from "react";

function PopularCourses() {
  useEffect(() => {
    document.title = 'Popular';
  });
    return(
        <div className="container mt-4">
          {/* Latest Courses */}
          <h3 className="mb-4 pb-1">Popular Courses</h3>
          <div className="row mb-4">
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="django.png" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Course title</Link></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <a href="#"><img className="card-img-top" src="django.png" alt="Card image cap" /></a>
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Course title</a></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <a href="#"><img className="card-img-top" src="django.png" alt="Card image cap" /></a>
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Course title</a></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <a href="#"><img className="card-img-top" src="django.png" alt="Card image cap" /></a>
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Course title</a></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="django.png" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Course title</Link></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="django.png" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Course title</Link></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="django.png" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Course title</Link></h5>
                </div>
                <div className="card-footer">
                    <span>Ratings: 4/5</span>
                    <span className="float-end">Subscriptions: 19,635</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to="/details/1"><img className="card-img-top" src="django.png" alt="Card image cap" /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to="/details/1">Course title</Link></h5>
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
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
          {/* End Pagination */}
        </div>
    );
}

export default PopularCourses;