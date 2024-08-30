import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const baseurl = 'http://127.0.0.1:8000/api';

function AddChapter() {

  const [chapterData, setChapterData] = useState({
    title: '',
    description: '',
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
  const {course_id} = useParams();
  const navigate = useNavigate();

  const doSubmit=()=> {
    const _formData = new FormData();
    _formData.append('course', course_id);
    _formData.append('title', chapterData.title);
    _formData.append('description', chapterData.description);
    _formData.append('video', chapterData.video, chapterData.video.name);
    _formData.append('remarks', chapterData.remarks);

    try {
        const response = axios.post(baseurl+'/chapter/', _formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>{
            // console.log(res.data);
            navigate(`/teacher-course-detail/${course_id}/`);
        });
        console.log('Chapter created successfully', response.data)
    } catch(error) {
        console.error('Error creating course:', error);
    }
  };

    useEffect(() => {
        document.title = 'Add Course Chapter';
    });
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>Add Chapter</h5>
                    <div className='card-body'>
                        <div class="mb-3 row">
                            <label for="title" class="col-sm-2 col-form-label">Title</label>
                            <div class="col-sm-10">
                              <input type="text" onChange={handleChange} name="title" id="title" class="form-control" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="description" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10">
                            <textarea onChange={handleChange} name="description" id="description" className='form-control'></textarea>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="video" class="col-sm-2 col-form-label">Upload Video</label>
                            <div class="col-sm-10">
                              <input type="file" onChange={handleFileInputChange} name="video" id="video" readonly class="form-control" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="remarks" class="col-sm-2 col-form-label">Remarks</label>
                            <div class="col-sm-10">
                              <input type="text" onChange={handleChange} name="remarks" class="form-control" id="remarks" />
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

export default AddChapter;