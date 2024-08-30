import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import axios from "axios";

const baseurl = 'http://127.0.0.1:8000/api'

function TeacherCourses() {
    const [courseData, setCourseData]=useState([]);

    const placeholderImage = '/logo512.png';

    const teacherId = localStorage.getItem('teacherId');

    // Fetch courses when page loads
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                axios.get(`${baseurl}/teacher-courses/${teacherId}/`).then((res) => {
                    setCourseData(res.data);
                });
            } catch(error) {
                console.log(error);
            }
        }
        fetchCourses();
    },[teacherId]);

    // console.log(courseData);
    useEffect(() => {
        document.title = 'Teacher Courses';
    }, []);

    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>My Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Course Title</th>
                                        <th>Image</th>
                                        <th>Date Created</th>
                                        <th>Total Enrolled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {courseData.map((course, index) =>
                                    <tr>
                                        <td><Link to={`/all-chapters/${course.id}`}>{course.title}</Link>
                                            <hr />
                                            {course.course_rating &&
                                                <span>Rating: {course.course_rating}/5</span>
                                            }
                                            {!course.course_rating &&
                                                <span>Rating: 0/5</span>
                                            }
                                        </td>
                                        <td>
                                            <img src={course.featured_img || placeholderImage} onError={(e) => e.target.src=placeholderImage}
                                                width="80" className="rounded" alt={course.title} />
                                        </td>
                                        <td>{course.date_created || 'N/A'}</td>
                                        <td><Link to={`/enrolled-students/${course.id}`}>{course.total_enrolled_students} Student(s)</Link></td>
                                        <td>
                                        <Link to={`/edit-course/${course.id}`} className='btn btn-info btn-sm' >Edit</Link>
                                        <Link className='btn btn-danger btn-sm ms-2'>Delete</Link>
                                        <Link to={`/add-chapter/${course.id}`} className="btn btn-success btn-sm ms-2">Add Chapter</Link>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherCourses;