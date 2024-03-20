import TeacherSidebar from './TeacherSidebar';

function TeacherAddCourse() {
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
                            <label for="staticEmail" class="col-sm-2 col-form-label">Title</label>
                            <div class="col-sm-10">
                              <input type="text" readonly class="form-control" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Category</label>
                            <div class="col-sm-10">
                              <select class="form-select" id="floatingSelectDisabled" aria-label=" label disabled select example" >
                                <option selected disabled>--Select--</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                        </div>
                        
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10">
                            <textarea className='form-control'></textarea>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Course Video</label>
                            <div class="col-sm-10">
                              <input type="file" readonly class="form-control" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Technologies</label>
                            <div class="col-sm-10">
                              <input type="text" readonly class="form-control" id="staticEmail" />
                              <div id="emailHelp" class="form-text">Fashion, Programming, Music, Gaming, etc.</div>
                            </div>
                        </div>
                        <hr/>
                        <button className='btn btn-primary'>Update</button>
                    </div>
                    
                </div>
                    
                </section>
            </div>
        </div>
    );
}

export default TeacherAddCourse;