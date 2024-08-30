import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const baseurl = 'http://127.0.0.1:8000/api'

function Home() {
  const [courseData, setCourseData]=useState([]);

    const placeholderImage = '/logo512.png';

    // Fetch courses when page loads
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                axios.get(`${baseurl}/courses/?result=4`).then((res) => {
                    setCourseData(res.data);
                });
            } catch(error) {
                console.log(error);
            }
        }
        fetchCourses();
    },[]);

  useEffect(() => {
    document.title = 'Online Learn | Homepage';
  });
  return (
    <div className="container mt-4">
      {/* Latest Courses */}
      <h3 className="mb-4 pb-1">Latest Courses<Link to="all-courses" className="float-end">See all</Link></h3>
      <div className="row mb-4">
      {courseData && courseData.map ((course, index) =>
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to={`/details/${course.id}`}><img className="card-img-top card-img-top-cust" src={course.featured_img || placeholderImage} alt={course.title} /></Link>
                <div className="card-body">
                  <h5 className="card-title"><Link to={`/details/${course.id}`}>{course.title}</Link></h5>
                </div>
              </div>
            </div>
            )}
      </div>
      {/* End Latest Courses */}

      {/* Popular Courses */}
      <h3 className="my-4 mt-5 pb-1">Popular Courses<Link to="popular-courses" className="float-end">See all</Link></h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <a href="#"><img className="card-img-top" src="django.png" alt="Card image cap" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#"><img className="card-img-top" src="django.png" alt="Card image cap" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#"><img className="card-img-top" src="django.png" alt="Card image cap" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#"><img className="card-img-top" src="django.png" alt="Card image cap" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
      </div>
      {/* End Popular Courses */}

      {/* Popular Teachers */}
      <h3 className="my-4 mt-5 pb-1">Popular Teachers<Link to="popular-teachers" className="float-end">See all</Link></h3>
      <div className="row mb-4">
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/details/1"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="/details/1">Ben Ogbeiwi</Link></h5>
            </div>
            <div className="card-footer">
                <span>Ratings: 4/5</span>
                <span className="float-end">Subscriptions: 19,635</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <a href="#"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Tope Badejo</a></h5>
            </div>
            <div className="card-footer">
                <span>Ratings: 4/5</span>
                <span className="float-end">Subscriptions: 19,635</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <a href="#"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Wale Akindiya</a></h5>
            </div>
            <div className="card-footer">
                <span>Ratings: 4/5</span>
                <span className="float-end">Subscriptions: 19,635</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <a href="#"><img className="card-img-top" src="teacher.jpeg" alt="Card image cap" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">John Adejoro</a></h5>
            </div>
            <div className="card-footer">
                <span>Ratings: 4/5</span>
                <span className="float-end">Subscriptions: 19,635</span>
            </div>
          </div>
        </div>
      </div>
      {/* End Popular Teachers */}

      {/* Students Testimonials */}
      <h3 className="my-4 mt-5 pb-1">Students Testimonials<a href="" className="float-end">See all</a></h3>
      <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
          <figure class="text-center">
            <blockquote class="blockquote">
              <p>A well-known quote, contained in a blockquote element.</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </figcaption>
          </figure>
          </div>
          <div class="carousel-item">
          <figure class="text-center">
            <blockquote class="blockquote">
              <p>A well-known quote, contained in a blockquote element.</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </figcaption>
          </figure>
          </div>
          <div class="carousel-item">
          <figure class="text-center">
            <blockquote class="blockquote">
              <p>A well-known quote, contained in a blockquote element.</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </figcaption>
          </figure>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
