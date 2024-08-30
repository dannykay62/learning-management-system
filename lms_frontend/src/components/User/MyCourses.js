import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseurl = 'http://127.0.0.1:8000/api'

function MyCourses() {
  const [courseData, setCourseData]=useState([]);
  const studentId = localStorage.getItem('studentId');

  // Fetch student data when page loads
  useEffect(() => {
    const fetchCourses = async () => {
        try {
            axios.get(`${baseurl}/fetch-enrolled-courses/${studentId}/`).then((res) => {
                setCourseData(res.data);
            });
        } catch(error) {
            console.log(error);
        }
    }
    fetchCourses();
  },[studentId]);

  useEffect(() => {
      document.title = 'My Courses';
  });
  return(
      <div className='container mt-4'>
          <div className='row'>
              <aside className='col-md-3'>
                  <Sidebar />
              </aside>
              <section className='col-md-9'>
                  <div className='card'>
                      <h5 className='card-header'>My Courses</h5>
                      <div className='card-body'>
                          <table className='table table-bordered'>
                              <thead>
                                  <tr>
                                      <th>Name</th>
                                      <th>Created By</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {courseData.map((row,index) =>
                                <tr>
                                  <td><Link to={`/details/${row.course.id}`}>{row.course.title}</Link></td>
                                  <td><Link to={`/teacher-detail/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link></td>
                                  <td>
                                  {/* <button className='btn btn-danger btn-sm active'>Delete</button> */}
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

export default MyCourses;