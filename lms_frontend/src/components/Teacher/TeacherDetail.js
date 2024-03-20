import { Link } from "react-router-dom";

function TeacherDetail() {
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-4">
                    <img src="/logo512.png" className="img-thumbnail" alt="Teacher" />
                </div>
                <div className="col-8">
                    <h3>Daniel Adejoro</h3>
                    <p>Bootstrap sets basic global display, typography, and link styles. When more control is needed, check out the textual utility classes.

                        Use a native font stack that selects the best font-family for each OS and device.
                        For a more inclusive and accessible type scale, we use the browser’s default root font-size (typically 16px) so visitors can customize their browser defaults as needed.
                        Use the $font-family-base, $font-size-base, and $line-height-base attributes as our typographic base applied to the.
                        Set the global link color via $link-color.
                        Use $body-bg to set a background-color on the  (#fff by default).

                        These styles can be found within _reboot.scss, and the global variables are defined in _variables.scss. Make sure to set $font-size-base in rem.
                    </p>
                    <p className="fw-bold">Skills: <Link to="/teacher-detail/1">Music</Link>,&nbsp;<Link to="/teacher-detail/1">Programming</Link>,&nbsp;
                    <Link to="/teacher-detail/1">Dance</Link></p>
                    <p className="fw-bold">Recent Course: <Link to='course_title'>Dance with me</Link></p>
                    <p className="fw-bold">Rating: 4/5</p>
                </div>
            </div>

            {/* Course Videos */}
            <div className="card">
              <h5 className="card-header">
                Course List
              </h5>
              <Link to='/details/1' className="list-group-item list-group-item-action">English Course</Link>
              <Link to='/details/1' className="list-group-item list-group-item-action">JAMB Course</Link>
              <Link to='/details/1' className="list-group-item list-group-item-action">Music Course</Link>
              <Link to='/details/1' className="list-group-item list-group-item-action">Fashion Course</Link>
              <Link to='/details/1' className="list-group-item list-group-item-action">Farming Course</Link>
              <Link to='/details/1' className="list-group-item list-group-item-action">Gaming Course</Link>
            </div>
            {/* End Course Videos */}
        </div>
    );
}

export default TeacherDetail