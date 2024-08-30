import { useParams, Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const siteurl = 'http://127.0.0.1:8000/'
const baseurl = 'http://127.0.0.1:8000/api'

function CourseDetails() {
  const [courseData, setcourseData]=useState([]);
  const [chapterData, setchapterData]=useState([]);
  const [teacherData, setTeacherData]=useState([]);
  const [relatedCourseData, setRelatedCourseData]=useState([]);
  const [techListData, setTechListData]=useState([]);
  const [enrollStatus, setEnrollStatus]=useState([]);
  const [ratingStatus, setRatingStatus]=useState([]);
  const [courseAvgRating, setCourseAvgRating]=useState(0);
  const [userLoginStatus, setUserLoginStatus]=useState([]);

  const {course_id} = useParams();
  const navigate = useNavigate();

  

  const studentId = localStorage.getItem('studentId');
  // Fetch courses when the page loads
  useEffect(() => {
    try {
        axios.get(`${baseurl}/teacher-course-detail/${course_id}/`).then((res) => {
            setcourseData(res.data);
            setTeacherData(res.data.teacher);
            setchapterData(res.data.course_chapters);
            setRelatedCourseData(JSON.parse(res.data.related_videos));
            setTechListData(res.data.tech_list);
            console.log("Course Rating:", res.data.course_rating);  // Debugging
            if (res.data.course_rating != '' && res.data.course_rating != null) {
              setCourseAvgRating(res.data.course_rating || 0);
            }
            
        });
    } catch(error) {
        console.log(error);
    }

    // Fetch enroll status
    try {
      axios.get(`${baseurl}/fetch-enroll-status/${studentId}/${course_id}`).then((res) => {
          if (res.data.bool===true){
            setEnrollStatus('success');
          }
      });
    } catch(error) {
        console.log(error);
    }

    // Fetch rating status
    try {
      axios.get(`${baseurl}/fetch-rating-status/${studentId}/${course_id}`).then((res) => {
          if (res.data.bool===true){
            setRatingStatus('success');
          }
      });
    } catch(error) {
        console.log(error);
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus==='true') {
      setUserLoginStatus('success');
    }
  },[course_id]);

  const enrollCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('course', course_id);
    formData.append('student', studentId);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key} : ${value}`);
    // }
    try {
        const response = await axios.post(`${baseurl}/student-enroll-course/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res)=>{
          if (res.status===200 || res.status===201) {
            Swal.fire({
                title: 'You have successfully enrolled in this course!',
                icon: 'success',
                toast: true,
                timer: 5000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
            setEnrollStatus('success');
          }
        });
        // window.location.href='/teacher-courses/';
        // Optionally, you can redirect the user or show a success message
    } catch (error) {
        console.error('Error enrolling in course:', error);
        // Optionally, show an error message to the user
    }
};

const [ratingData, setRatingData] = useState({
  rating: '',
  review: ''
});

const handleChange=(event)=> {
  setRatingData({
      ...ratingData,
      [event.target.name]: event.target.value
  });
}

const formSubmit=()=> {
  const _formData = new FormData();
  _formData.append('course', course_id);
  _formData.append('student', studentId);
  _formData.append('rating', ratingData.rating);
  _formData.append('review', ratingData.review);

  try {
      const response = axios.post(baseurl+'/course-rating/'+course_id+'/', _formData,).then((res)=>{
          if (res.status===200 || res.status===201) {
            Swal.fire({
              title: 'Data has been added!',
              icon: 'success',
              toast: true,
              timer: 5000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false
            });
            window.location.reload();
          }
      });
  } catch(error) {
      console.error('Error creating course:', error);
  }
};

  useEffect(() => {
    document.title = 'Course Details';
  });
  
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-4">
                    <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title} />
                </div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="fw-bold">Course by: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                    <p className="fw-bold">Technologies:&nbsp;
                      {techListData.map((tech, index) =>
                        <Link to={`/category/${tech.trim()}`} className="badge badge-pill text-dark bg-warning ml-2">{tech.trim()}</Link>
                      )}
                    </p>
                    <p className="fw-bold">Duration: 3 Hours 30 minutes</p>
                    <p className="fw-bold">Total Students Enrolled: {courseData.total_enrolled_students} Student(s)</p>
                    <p className="fw-bold">Rating: {courseAvgRating} /5
                      
                    {enrollStatus ==='success' && userLoginStatus ==='success' &&
                    <>
                      {ratingStatus != 'success' &&
                        <button className="btn btn-success btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
                      }
                      {ratingStatus === 'success' &&
                        <small className="badge bg-info text-dark ms-4">You rated this course.</small>
                      }
                      {/* <!-- Modal --> */}
                      <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="ratingModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="ratingModalLabel">Rate this Course - "{courseData.title}"</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <form>
                              <div className="mb-3">
                                <label for="ratings" className="form-label">Ratings</label>
                                <select onChange={handleChange} class="form-select" name="rating">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label for="ratingsReview" className="form-label">Review</label>
                                <textarea className="form-control" onChange={handleChange} name="review" placeholder="Leave a review here" rows="5"></textarea>
                              </div>
                              <div class="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" for="ratingsCheck">Check me out</label>
                              </div>
                            </form>
                            </div>
                            <div className="modal-footer">
                            <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      </>
                    }
                    </p>
                    {enrollStatus ==='success' && userLoginStatus ==='success' &&
                      <p><span>You are already enrolled in this course!</span></p>
                    }
                    {userLoginStatus ==='success' && enrollStatus !=='success' &&
                      <p><button className="btn btn-success" type="button" onClick={enrollCourse}>Enroll in this Course</button></p>
                    }
                    {userLoginStatus !=='success' &&
                      <p><Link to="/user-login">Log in or Register to Enroll in this course</Link></p>
                    }
                    
                </div>
            </div>

            {/* Course Videos */}
            {userLoginStatus ==='success' && enrollStatus ==='success' &&
            <div className="card">
              <h5 className="card-header">
                Course Resources
              </h5>
              <ul className="list-group list-group-flush">
                {chapterData.map((chapter, index) =>
                <li className="list-group-item">{chapter.title}
                  <span className="float-end">
                    <span className="me-3">1 Hour 20 mins</span>
                  <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi-youtube"></i></button>
                  </span>
                  {/* <!-- Video Modal --> */}
                  <div class="modal fade" id={`modal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">{chapter.title}</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <div class="ratio ratio-16x9">
                          <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
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
                </li>
              )}
              </ul>
            </div>
            }
            {/* End Course Videos */}

            {/* Related Courses */}
            <h3 className="mb-4 pb-1 mt-5">Related Courses</h3>
            <div className="row mb-4">
              {relatedCourseData.map((relcourse, index) => 
                <div className="col-md-3">
                  <div className="card">
                    <Link to={`/details/${relcourse.pk}`}>
                      <img className="card-img-top card-img-top-cust" src={`${siteurl}/${relcourse.fields.featured_img}`} alt={relcourse.fields.title ||'Course Image'} />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title"><Link target="__blank" to={`/details/${relcourse.pk}`}>{relcourse.fields.title}</Link></h5>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* End Related Courses */}
        </div>
    );
}

export default CourseDetails;