import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';
function EditCourse() {
    const [cats, setCats]=useState([]);
    const [courseData, setCourseData] = useState({
      category: '',
      title: '',
      description: '',
      technologies: '',
      prev_featured_img: '',
      featured_img: null,
    });

    const {course_id} = useParams();
    const navigate = useNavigate();

    // Fetch categories as the page loads
    useEffect(()=>{
        try{
            axios.get(`${baseurl}/categories/`).then((res)=>{
                setCats(res.data);
            });
        } catch(error) {
            console.log(error);
        }
    },[]);
    //   Fetch course when the page loads
    useEffect(() => {
        const fetchCourseData = async () => {
            try{
                axios.get(`${baseurl}/teacher-course-detail/${course_id}/`).then((res) => {
                    // console.log(res.data)
                    setCourseData({
                        category: res.data.category,
                        title: res.data.title,
                        description: res.data.description,
                        technologies: res.data.technologies,
                        prev_featured_img: res.data.featured_img,
                        featured_img: 'null',
                    });
                });
            } catch(error) {
                console.error('Error fetching data', error);
            }
        };
        fetchCourseData();
    }, [course_id]);
    // End fetch course data

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCourseData({ ...courseData, [name]: value });
    };

    const handleFileChange = (e) => {
        setCourseData({ ...courseData, featured_img: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
    // //   Append fields to formData
    //   for (let key in courseData) {
    //     if (key === 'prev_featured_img') continue;
    //       formData.append(key, courseData[key]);
    //   }

    // //   Append featured_img if empty use the value of prev_featured_img
    // if (!courseData.featured_img) {
    //     formData.append('featured_img', courseData.prev_featured_img);
    // } else {
    //     formData.append('featured_img', courseData.featured_img);
    // }

    formData.append('category', courseData.category);
    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    if (formData.featured_img !== '') {
        formData.append('featured_img', courseData.featured_img, courseData.featured_img.name);
    }
    formData.append('technologies', courseData.technologies);
    
    // formData.append('teacher', 1);
      try {
          const response = await axios.put(`${baseurl}/teacher-course-detail/${course_id}/`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          if (response.status===200 || response.status===201) {
            Swal.fire({
                title: 'Course data updated',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
          }
          console.log('Course updated successfully:', response.data);
          navigate('/add-course/');
      } catch (error) {
          console.error('Error creating course:', error);
          // Optionally, show an error message to the user
      }
    };

    useEffect(() => {
        document.title = 'Teacher Edit Course';
    },[]);

    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>Edit Course</h5>
                    <div className='card-body'>
                        <div class="mb-3 row">
                            <label for="category" class="col-sm-2 col-form-label">Category</label>
                            <div class="col-sm-10">
                              <select name="category" value={courseData.category} onChange={handleInputChange} class="form-select" id="category" >
                                {cats.map((category, index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                                {/* {cats.map((category,index)=>{return console.log(`key=${index} ${category.title}`)})} */}
                              </select>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="title" class="col-sm-2 col-form-label">Title</label>
                            <div class="col-sm-10">
                              <input name="title" value={courseData.title} onChange={handleInputChange} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="description" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10">
                            <textarea name="description" value={courseData.description} onChange={handleInputChange} className="form-control"></textarea>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="feature_image" class="col-sm-2 col-form-label">Feature Image</label>
                            <div class="col-sm-10">
                              <input name="feature_img" type="file" onChange={handleFileChange} class="form-control" />
                              {/* <input name="feature_img" type="file" accept="image/png, image/jpg" onChange={handleFileChange} class="form-control" /> */}
                              { courseData.prev_featured_img && (
                                <p className="mt-3"><img src={courseData.prev_featured_img} width="300" alt="Old" /></p>
                              )}
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="technologies" class="col-sm-2 col-form-label">Technologies</label>
                            <div class="col-sm-10">
                              <input name="technologies" value={courseData.technologies} onChange={handleInputChange} type="text" class="form-control" id="technologies" />
                              <div id="emailHelp" class="form-text">Fashion, Programming, Music, Gaming, etc.</div>
                            </div>
                        </div>
                        <hr/>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    </div>
                    
                </div>
                    
                </section>
            </div>
        </div>
    );
}

export default EditCourse;