import { useParams, Link } from "react-router-dom";

function CourseDetails() {
    let {course_id}=useParams();
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-4">
                    <img src="/logo512.png" className="img-thumbnail" alt="..." />
                </div>
                <div className="col-8">
                    <h3>Course Title</h3>
                    <p>Bootstrap sets basic global display, typography, and link styles. When more control is needed, check out the textual utility classes.

                        Use a native font stack that selects the best font-family for each OS and device.
                        For a more inclusive and accessible type scale, we use the browser’s default root font-size (typically 16px) so visitors can customize their browser defaults as needed.
                        Use the $font-family-base, $font-size-base, and $line-height-base attributes as our typographic base applied to the.
                        Set the global link color via $link-color.
                        Use $body-bg to set a background-color on the  (#fff by default).

                        These styles can be found within _reboot.scss, and the global variables are defined in _variables.scss. Make sure to set $font-size-base in rem.
                    </p>
                    <p className="fw-bold">Course by: <Link to="/teacher-detail/1">Teacher 1</Link></p>
                    <p className="fw-bold">Duration: 3 Hours 30 minutes</p>
                    <p className="fw-bold">Total Students Enrolled: 1500</p>
                    <p className="fw-bold">Rating: 4/5</p>
                </div>
            </div>

            {/* Course Videos */}
            <div className="card">
              <h5 className="card-header">
                Course Videos
              </h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Introduction
                  <span className="float-end">
                    <span className="me-3">1 Hour 20 mins</span>
                  <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi-youtube"></i></button>
                  </span>
                </li>
                {/* <!-- Video Modal --> */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div class="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                      </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Video Modal */}
                <li className="list-group-item">Introduction
                  <span className="float-end">
                    <span className="me-3">1 Hour 20 mins</span>
                  <button className="btn btn-sm btn-danger "><i className="bi-youtube"></i></button>
                  </span>
                </li>
                <li className="list-group-item">Introduction
                  <span className="float-end">
                    <span className="me-3">1 Hour 20 mins</span>
                  <button className="btn btn-sm btn-danger "><i className="bi-youtube"></i></button>
                  </span>
                </li>
                <li className="list-group-item">Introduction
                  <span className="float-end">
                    <span className="me-3">1 Hour 20 mins</span>
                  <button className="btn btn-sm btn-danger "><i className="bi-youtube"></i></button>
                  </span>
                </li>
                <li className="list-group-item">Introduction
                  <span className="float-end">
                    <span className="me-3">1 Hour 20 mins</span>
                  <button className="btn btn-sm btn-danger "><i className="bi-youtube"></i></button>
                  </span>
                </li>
                <li className="list-group-item">Introduction
                  <span className="float-end">
                    <span className="me-3">1 Hour 20 mins</span>
                  <button className="btn btn-sm btn-danger "><i className="bi-youtube"></i></button>
                  </span>
                </li>
              </ul>
            </div>
            {/* End Course Videos */}

            {/* Related Courses */}
            <h3 className="mb-4 pb-1 mt-5">Related Courses</h3>
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card">
                  <Link to="/details/1"><img className="card-img-top" src="/logo512.png" alt="" /></Link>
                  <div className="card-body">
                    <h5 className="card-title"><Link to="/details/1">Course title</Link></h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <a href="#"><img className="card-img-top" src="/logo512.png" alt="" /></a>
                  <div className="card-body">
                    <h5 className="card-title"><a href="#">Course title</a></h5>
                  </div>
                </div>
              </div>
            </div>
            {/* End Related Courses */}
        </div>
    );
}

export default CourseDetails;