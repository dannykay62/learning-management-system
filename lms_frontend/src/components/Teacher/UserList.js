import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import axios from "axios";

const baseurl = 'http://127.0.0.1:8000/api'

function UserList() {
  const [studentData, setStudentData]=useState([]);
  const placeholderImage = '/logo512.png';
  const teacherId = localStorage.getItem('teacherId');
  // Fetch courses when page loads
  useEffect(() => {
      const fetchCourses = async () => {
          try {
              axios.get(`${baseurl}/fetch-all-enrolled-students/${teacherId}/`).then((res) => {
                  setStudentData(res.data);
              });
          } catch(error) {
              console.log(error);
          }
      }
      fetchCourses();
  },[course_id]);
  // console.log(courseData);
  useEffect(() => {
      document.title = 'Enrolled Student List';
  }, []);
  return(
      <div className='container mt-4'>
          <div className='row'>
              <aside className='col-md-3'>
                  <TeacherSidebar />
              </aside>
              <section className='col-md-9'>
                  <div className='card'>
                      <h5 className='card-header'>All Enrolled Students List</h5>
                      <div className='card-body'>
                          <table className='table table-bordered'>
                              <thead>
                                  <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Username</th>
                                      <th>Total Enrolled</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {studentData.map((row, index) =>
                                  <tr>
                                      <td><Link to={`/view-student/${row.student.id}`}>{row.student.full_name}</Link></td>
                                      <td>{row.student.email || 'N/A'}</td>
                                      <td>{row.student.username || 'N/A'}</td>
                                      <td><Link to={`/student/${row.student.id}`} className="btn btn-success btn-sm ms-2">View</Link></td>
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

export default UserList;