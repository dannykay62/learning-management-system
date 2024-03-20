import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

function ProfileSettings() {
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <Sidebar />
                </aside>
                <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>Profile Settings</h5>
                    <div className='card-body'>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Full Name</label>
                            <div class="col-sm-10">
                              <input type="text" readonly class="form-control" id="staticEmail" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                              <input type="text" readonly class="form-control" id="staticEmail" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Profile Image</label>
                            <div class="col-sm-10">
                              <input type="file" readonly class="form-control" id="staticEmail" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Interests</label>
                            <div class="col-sm-10">
                              <input type="text" readonly class="form-control" id="staticEmail" />
                              <div id="emailHelp" class="form-text">Fashion, Programming, Music, Gaming, etc.</div>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                              <input type="password" class="form-control" id="inputPassword" />
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

export default ProfileSettings;