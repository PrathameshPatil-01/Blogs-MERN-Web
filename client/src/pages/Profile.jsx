import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateUser } from '../services/user'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import Navbar from './../components/Navbar';

function Profile() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    mobile_no: '',
    bio: '',
  })

  const [profile_picture, set_profile_picture] = useState('')

  const onSave = async () => {
    const { first_name, last_name } = userInfo;
    if (first_name.length == 0) {
      toast.warn('Please enter first_name')
    }
    else if (last_name.length == 0) {
      toast.warn('Please enter last_name')
    }
    else {

      const formData = new FormData();
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('mobile_no', userInfo.mobile_no);
      formData.append('bio', userInfo.bio);
      formData.append('profile_picture', profile_picture);

      const response = await updateUser(formData);

      console.log(response);

      if (response.status == 'success') {
        toast.success('Profile Updated Successfully ');
        navigate('/home')
      }
      else {
        toast.error(response.error.sqlMessage)
      }
    }

  }

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col'>
            <div className='update-column'>
              <div className='container update-container p-4'>
                <div className='my-4 d-flex justify-content-center'>
                  <h2 className=''>Update Profile</h2>
                </div>
                <div className='col'>
                  <label htmlFor=''>Photo</label>
                  <input
                    onChange={(e) => set_profile_picture(e.target.files[0])}
                    type='file'
                    className='form-control'
                  />
                </div>
                <div className="">
                  <label htmlFor='first_name'>First Name</label>
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, first_name: e.target.value })
                    }}
                    value={userInfo.first_name} type="text" className="form-control" placeholder="First name" aria-label="First name" />
                </div>
                <div className="">
                  <label htmlFor='last_name'>Last Name</label>
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, last_name: e.target.value })
                    }}
                    value={userInfo.last_name} type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
                </div>

                <div className='my-2'>
                  <label htmlFor='mobile_no'>Mobile Number</label>
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, mobile_no: e.target.value })
                    }}
                    className='form-control' type='text' placeholder='Enter mobile no.' />
                </div>
                <div className='my-2'>
                  <label htmlFor='bio'>Bio</label>
                  <textarea
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, bio: e.target.value })
                    }}
                    rows={3}
                    className='form-control' type='text' placeholder='Enter bio'>
                  </textarea>
                </div>
                <div className='my-4'>
                  <button onClick={onSave} type='submit' className='btn btn-success btn-block'>Save Profile</button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-2'></div>
        </div>
      </div>
    </>
  )
}

export default Profile
