import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000/api';
function TeacherAddCourse() {
    const [cats, setCats]=useState([]);
    const [courseData, setCourseData] = useState({
      category: '',
      teacher: '', // to fetch teacher data from another API or a dropdown
      title: '',
      description: '',
      technologies: '',
      featured_img: null,
  });

  
    // Fetch categories as the page loads
    useEffect(()=>{
        try{
            axios.get(baseurl+'/categories/').then((res)=>{
                setCats(res.data);
            });
        } catch(error) {
            console.log(error);
        }
    },[]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
      setCourseData({ ...courseData, featured_img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const teacher_id = localStorage.getItem('teacherId');
      const formData = new FormData();

      formData.append('category', courseData.category);
      formData.append('teacher', teacher_id);
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      formData.append('technology', courseData.technologies);
      if (courseData.featured_img) {
        formData.append('featured_img', courseData.featured_img);
      }
      
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/courses/', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          console.log('Course created:', response.data);
          window.location.href='/teacher-courses/';
          // Optionally, you can redirect the user or show a success message
      } catch (error) {
          console.error('Error creating course:', error);
          // Optionally, show an error message to the user
      }
  };

    useEffect(() => {
        document.title = 'Teacher Add Course';
    },[]);
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>Add Course</h5>
                    <div className='card-body'>
                        <div class="mb-3 row">
                            <label for="category" class="col-sm-2 col-form-label">Category</label>
                            <div class="col-sm-10">
                            <select name="category" value={courseData.category} onChange={handleInputChange} class="form-select" id="category" aria-label=" label disabled select example" >
                                <option value="">Select Category</option>
                                {cats.map((category, index)=>(
                                     <option key={index} value={category.id}>{category.title}</option>
                                     ))}
                                {/* {cats.map((category,index)=>{return console.log(`key=${index} ${category.title}`)})} */}
                              </select>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="title" class="col-sm-2 col-form-label">Title</label>
                            <div class="col-sm-10">
                              <input name="title" onChange={handleInputChange} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="description" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10">
                            <textarea name="description" onChange={handleInputChange} className="form-control"></textarea>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="feature_image" class="col-sm-2 col-form-label">Feature Image</label>
                            <div class="col-sm-10">
                              <input name="feature_img" type="file" onChange={handleFileChange} class="form-control" />
                              {/* <input name="feature_img" type="file" accept="image/png, image/jpg" onChange={handleFileChange} class="form-control" /> */}
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="technologies" class="col-sm-2 col-form-label">Technologies</label>
                            <div class="col-sm-10">
                              <input name="technologies" onChange={handleInputChange} type="text" class="form-control" id="technologies" />
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

export default TeacherAddCourse;