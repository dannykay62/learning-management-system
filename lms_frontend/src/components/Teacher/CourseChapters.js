import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import axios from "axios";

import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api'

function CourseChapters() {
    const [chapterData, setchapterData]=useState([]);
    const [totalResult, settotalResult]=useState([]);
    const {course_id} = useParams();

    const teacherId = localStorage.getItem('course_id');

    // Fetch courses when page loads
    useEffect(() => {
        try {
            axios.get(`${baseurl}/course-chapters/${course_id}/`).then((res) => {
                settotalResult(res.data.length);
                setchapterData(res.data);
            });
        } catch(error) {
            console.log(error);
        }
    },[]);

    // Delete chapter
    const handleDeleteAction = (chapter_id) => {
        Swal.fire({
            title: "Confirm",
            text: "Are you sure you want to delete this chapter?",
            icon: "info",
            confirmButtonText: "Yes, delete it!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`${baseurl}/chapter/${chapter_id}`).then((res => {
                        // window.location.reload();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted successfully.",
                            icon: "success"
                          });
                        try {
                            axios.get(baseurl+'/course-chapters/'+course_id).then((res) => {
                                settotalResult(res.data.length);
                                setchapterData(res.data);
                            });
                        } catch(error) {
                            console.log(error);
                        }
                    }));
                } catch(error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong, chapter not deleted!",
                        // footer: '<a href="#">Why do I have this issue?</a>'
                      });
                }
              
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    // footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
          });
    }

    console.log(chapterData);
    useEffect(() => {
        document.title = 'All Course Chapters';
    });
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>All Chapters ({totalResult}) <Link className="btn btn-success float-end" to={`/add-chapter/${course_id}`}>Add Chapter</Link></h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                        <th>Date Created</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {chapterData.map((chapter, index) =>
                                    <tr>
                                        <td><Link to={'/edit-chapter/'+chapter.id}>{chapter.title}</Link></td>
                                        <td>
                                        { chapter.video && typeof chapter.video === 'string' && (
                                            <video controls width="320" height="240" className='mt-4'>
                                            <source src={ chapter.video } type="video/webm" />

                                            <source src={ chapter.video } type="video/mp4" />

                                            {/* Download the
                                            <a href="/media/cc0-videos/flower.webm">WEBM</a>
                                            or
                                            <a href="/media/cc0-videos/flower.mp4">MP4</a>
                                            video. */}
                                            Sorry, your browser doesn't support embedded videos.
                                          </video>
                                        )};
                                            
                                        </td>
                                        <td>{chapter.remarks}</td>
                                        <td>17/03/2024</td>
                                        <td>
                                        <Link to={'/edit-chapter/'+chapter.id} className='btn btn-info text-white btn-sm'><i class="bi bi-pencil-square"></i></Link>
                                        <button onClick={()=>handleDeleteAction(chapter.id)} className='btn btn-danger btn-sm'><i class="bi bi-trash"></i></button>
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

export default CourseChapters;