import React, { useEffect,useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from 'react-router-dom';


const baseurl = 'http://127.0.0.1:8000/api'

const CreateCourse = () => {
    const [cats, setCats]=useState([]);
    const [teacher, setTeacher]=useState([]);
    const [courseData, setCourseData] = useState({
        category: '',
        teacher: '', // You might want to fetch teacher data from another API or provide a dropdown
        title: '',
        description: '',
        technologies: '',
        featured_img: null,
    });

    // const {teacher_id} = useParams();
    const teacher_id = localStorage.getItem('teacherId');
    console.log(teacher_id);

    // Fetch categories as the page loads
    useEffect(()=>{
        const fetchCategories = async () => {
            try{
            
                axios.get(baseurl+'/categories/').then((res)=>{
                    setCats(res.data);
                });
            } catch(error) {
                console.log(error);
            }
        }
        

        
            const fetchTeacher = async () => {
                try {
                    axios.get(`${baseurl}/teachers/${teacher_id}/`).then((res) => {
                        setTeacher(res.data);
                        // setCourseData((prevState) => ({
                        //     ...prevState, teacher: res.data.id
                        // }));
                    });
                } catch(error) {
                    console.log(error);
                }
            };
            fetchCategories();
            fetchTeacher();
    },[]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleFileChange = (e) => {
        setCourseData({ ...courseData, featured_img: e.target.files[0] });
    };

    const handleDescriptionChange= (value) => {
        setCourseData({ ...courseData, description: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in courseData) {
            formData.append(key, courseData[key]);
        }

        formData.append('teacher', teacher.pk)
        console.log(teacher);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/courses/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Course created:', response.data);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div>
            <h1>Create New Course</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category:</label>
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
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={courseData.title} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <ReactQuill name="description" value={courseData.description} onChange={handleDescriptionChange}></ReactQuill>
                </div>
                <div>
                    <label>Technologies:</label>
                    <input type="text" name="technologies" value={courseData.technologies} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Featured Image:</label>
                    <input type="file" name="featured_img" onChange={handleFileChange} />
                </div>
                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCourse;
