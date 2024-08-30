import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const baseurl = 'http://127.0.0.1:8000/api';

function EditChapter() {

    const [chapterData, setChapterData] = useState({
      course: '',
      title: '',
      description: '',
      prev_video: '',
      video: '',
      remarks: null,
    });

    const handleChange=(event)=> {
      setChapterData({
          ...chapterData,
          [event.target.name]: event.target.value
      });
    }

    const handleFileInputChange=(event) => {
      setChapterData({
          ...chapterData,
          [event.target.name]: event.target.files[0]
      });
    }
    const [error, setError] = useState(null);
    const {chapter_id} = useParams();

    const doSubmit=()=> {
      const _formData = new FormData();
      _formData.append('course', chapterData.course);
      _formData.append('title', chapterData.title);
      _formData.append('description', chapterData.description);
      if (chapterData.video && chapterData.video !== 'string') {
          _formData.append('video', chapterData.video, chapterData.video.name);
      }
      _formData.append('remarks', chapterData.remarks);

      try {
          const response = axios.put(`${baseurl}/chapter/${chapter_id}/`, _formData, {
              headers:{
                  'Content-Type': 'multipart/form-data'
              }
          }).then((res)=>{
              console.log(res);
              if (res.status === 200) {
                  Swal.fire({
                      title: "Successful!",
                      text: "Chapter Updated successfully...",
                      icon: "success"
                    });
              } else {
                  Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                      // footer: '<a href="#">Why do I have this issue?</a>'
                    });
              }
              // window.location.href = `${baseurl}/chapter/${course_id}`;
          });
          console.log('Chapter created successfully', response.data)
      } catch(error) {
          console.error('Error updating chapter:', error);
          setError('Error updating data, please try again.')
      }
    };

    // Fetch cchapter data when the page loads
    useEffect(() => {
        const fetchChapterData = async () => {
            try{
                axios.get(`${baseurl}/chapter/${chapter_id}/`).then((res) => {
                    // console.log(res.data)
                    setChapterData({
                        course: res.data.course,
                        title: res.data.title,
                        description: res.data.description,
                        prev_video: res.data.video,
                        remarks: res.data.remarks,
                        video: ''
                    });
                });
            } catch(error) {
                console.error('Error fetching data', error);
            }
        };
        fetchChapterData();
    }, [chapter_id]);
    
    useEffect(() => {
        document.title = 'Edit Course Chapter';
    }, []);
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>Edit Chapter</h5>
                    <div className='card-body'>
                    {error && <p className='text-danger'>{error}</p>}
                        <div class="mb-3 row">
                            <label for="title" class="col-sm-2 col-form-label">Title</label>
                            <div class="col-sm-10">
                              <input type="text" value={ chapterData.title } onChange={handleChange} name="title" id="title" class="form-control" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="description" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10">
                            <textarea value={ chapterData.description } onChange={handleChange} name="description" id="description" className='form-control'></textarea>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="video" class="col-sm-2 col-form-label">Upload Video</label>
                            <div class="col-sm-10">
                              <input type="file" onChange={handleFileInputChange} name="video" id="video" readonly class="form-control" />
                            </div>
                            { chapterData.prev_video &&typeof chapterData.prev_video === 'string' && (
                                <video controls width="320" height="240" className='mt-4'>
                                <source src={ chapterData.prev_video } type="video/webm" />
  
                                <source src={ chapterData.prev_video } type="video/mp4" />
  
                                {/* Download the
                                <a href="/media/cc0-videos/flower.webm">WEBM</a>
                                or
                                <a href="/media/cc0-videos/flower.mp4">MP4</a>
                                video. */}
                                Sorry, your browser doesn't support embedded videos.
                              </video>
                            )};
                            
                        </div>
                        <div class="mb-3 row">
                            <label for="remarks" class="col-sm-2 col-form-label">Remarks</label>
                            <div class="col-sm-10">
                              <input type="text" value={ chapterData.remarks } onChange={handleChange} name="remarks" class="form-control" id="remarks" />
                              <div id="remarks" class="form-text">Video Remarks</div>
                            </div>
                        </div>
                        <hr/>
                        <button type='button' onClick={doSubmit} className='btn btn-primary'>Submit</button>
                    </div>
                    
                </div>
                    
                </section>
            </div>
        </div>
    );
}

export default EditChapter;