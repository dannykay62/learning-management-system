import { useParams, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const baseurl = 'http://127.0.0.1:8000/api'

function TeacherSkillCourses() {
  const [courseData, setCourseData]=useState([]);
  const {skill_name, teacher_id}=useParams([]);

  const placeholderImage = 'logo512.png';

  // Fetch courses when page loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        axios.get(baseurl+'/courses/?skill_name'+skill_name+'&teacher='+teacher_id).then((res) => {
          setCourseData(res.data);
        });
      } catch(error) {
        console.log(error)
      }
    };
    fetchCourses();
  }, [skill_name,teacher_id]);

  useEffect(() => {
    document.title = 'Teacher Skill Courses';
  });
    return(
        <div className="container mt-4">
          {/* Latest Courses */}
          <h3 className="mb-4 pb-1">{skill_name}</h3>
          <div className="row mb-4">
          {courseData && courseData.map ((course, index) =>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to={`/details/${course.id}`}><img className="card-img-top card-img-top-cust" src={course.featured_img || placeholderImage} alt={course.title} /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to={`/details/${course.id}`}>{course.title}</Link></h5>
                </div>
              </div>
            </div>
            )};
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

export default TeacherSkillCourses;