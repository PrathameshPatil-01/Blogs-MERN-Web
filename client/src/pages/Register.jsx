import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/user'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

function Register() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile_no: '',
  })

  const [confirm_password, set_confirm_password] = useState('');

  const onSubmit = async () => {
    const { first_name, last_name, email, password } = userInfo;
    if (email.length == 0) {
      toast.warn('Please enter email')
    }
    else if (password.length == 0) {
      toast.warn('Please enter password')
    }
    else if (confirm_password.length == 0) {
      toast.warn('Please enter password')
    }
    else if (first_name.length == 0) {
      toast.warn('Please enter first_name')
    }
    else if (last_name.length == 0) {
      toast.warn('Please enter last_name')
    }
    else if (confirm_password != password) {
      toast.warn('Password and confirm password should match')
    }
    else {
      const response = await registerUser(userInfo);

      console.log(response);

      if (response.status == 'success') {
        toast.success('Register Successful');
        navigate('/')
      }
      else {
        toast.error(response.error.sqlMessage)
      }
    }

  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col'>
          <div className='register-column'>
            <div className='container register-container p-4'>
              <div className='my-4'>
                <h2 className=''>Sign Up</h2>
              </div>
              <div className="row g-3">
                <div className="col">
                  <label htmlFor='first_name'>First Name</label>
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, first_name: e.target.value })
                    }}
                    value={userInfo.first_name} type="text" className="form-control" placeholder="First name" aria-label="First name" />
                </div>
                <div className="col">
                  <label htmlFor='last_name'>Last Name</label>
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, last_name: e.target.value })
                    }}
                    value={userInfo.last_name} type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
                </div>
              </div>
              <div className='my-2'>
                <label htmlFor='email'>Email</label>
                <input
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }}
                  className='form-control' type='email' placeholder='Enter Email' />
              </div>
              <div className="row g-3">
                <div className='my-2 col'>
                  <label htmlFor='password'>Password</label>
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }}
                    className='form-control' type='password' placeholder='Enter Password' />
                </div>
                <div className='my-2 col'>
                  <label htmlFor='confirm_password'> Confirm Password</label>
                  <input
                    onChange={(e) => {
                      set_confirm_password(e.target.value)
                    }}
                    className='form-control' type='password' placeholder='Confirm Password' />
                </div>
              </div>
              <div className='my-2'>
                <label htmlFor='mobile_no'>Mobile Number</label>
                <input
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, mobile_no: e.target.value })
                  }}
                  className='form-control' type='text' placeholder='Enter mobile no.' />
              </div>
              <div className='my-3 d-flex justify-content-between'>
                <span>want to login ?</span>
                <span><Link to='/'>Login here</Link></span>
              </div>
              <div className='my-4'>
                <button onClick={onSubmit} type='submit' className='btn btn-success btn-block'>Register</button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  )
}

export default Register
