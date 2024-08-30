import { useParams, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const baseurl = 'http://127.0.0.1:8000/api'

function TeacherDetail() {
    const [teacherData, setTeacherData]=useState([]);
    const [courseData, setcourseData]=useState([]);
    const [skillList, setSkillList]=useState([]);

    const {teacher_id} = useParams();

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                axios.get(`${baseurl}/teachers/${teacher_id}/`).then((res) => {
                    setTeacherData(res.data);
                    setcourseData(res.data.teacher_courses);
                    setSkillList(res.data.skill_list);
                });
            } catch(error) {
                console.log(error);
            }
        };
        fetchTeacherData();
        
    },[teacher_id]);
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-4">
                    <img src="/logo512.png" className="img-thumbnail" alt="Teacher" />
                </div>
                <div className="col-8">
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.bio}
                    </p>
                    <p className="fw-bold">Skills: &nbsp;
                        {skillList.map((skill, index) =>
                        <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill text-dark bg-warning ml-2">{skill.trim()}</Link>
                      )}
                    </p>
                    <p className="fw-bold">Recent Course: <Link to='course_title'>Dance with me</Link></p>
                    <p className="fw-bold">Rating: 4/5</p>
                </div>
            </div>

            {/* Teacher Courses */}
            <div className="card">
              <h5 className="card-header">
                Course List
              </h5>
              {courseData.map((course,index) =>
                <Link to={`/details/${course.id}/`} className="list-group-item list-group-item-action">{course.title}</Link>
              )}
            </div>
            {/* End Teacher Courses */}
        </div>
    );
}

export default TeacherDetail