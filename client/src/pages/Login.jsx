import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/user'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

function Login() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const onSubmit = async () => {
    const { email, password } = userInfo;
    if (email.length == 0) {
      toast.warn('Please enter email')
    } else if (password.length == 0) {
      toast.warn('Please enter password')
    } else {
      const response = await loginUser(userInfo);

      console.log(response);

      if (response.status == 'success') {
        toast.success('Login Successful');
        sessionStorage.setItem('user', JSON.stringify(response.data))
        navigate('/home')
      }
      else {
        toast.error(response['error'])
      }
    }

  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col'>
          <div className='login-column'>
            <div className='container login-container p-4'>
              <div className='my-4'>
                <h2 className=''>Login</h2>
              </div>
              <div className='my-2'>
                <label htmlFor='email'>Email</label>
                <input
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }}
                  className='form-control' type='email' placeholder='Enter Email' />
              </div>
              <div className='my-2'>
                <label htmlFor='password'>Password</label>
                <input
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }}
                  className='form-control' type='password' placeholder='Enter Password' />
              </div>
              <div className='my-3 d-flex justify-content-between'>
                <span>Don't have an account yet?</span>
                <span><Link to='/register'>Register here</Link></span>
              </div>
              <div className='my-4'>
                <button onClick={onSubmit} type='submit' className='btn btn-success btn-block'>Login</button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  )
}

export default Login
