import './Login.css'
import axios from 'axios'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  let { openNotificationWithIcon } = props
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  let navigate = useNavigate();
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios.post(`https://api-nodejs-todolist.herokuapp.com/user/login`, {
      "email": username,
      "password": password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {

        localStorage.setItem("token", res.data.token);

        navigate('/todo', { replace: true })
        openNotificationWithIcon('success', "login done", "Login successfully")

      })
      .catch(error => openNotificationWithIcon('error', "login fail", "user or password incorrect"));
  }

  return (
    <div className="login-form">
      <div className="title">SIGN IN</div>
      <div className="form">
        <form onSubmit={handleLoginSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="name" onChange={e => setUserName(e.target.value)} />

          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" onChange={e => setPassword(e.target.value)} />

          </div>
          <div className="button-container input-container">
            <input type="submit" />
          </div>
          <div className='check input-container'>
            <p>Don't have an account? <Link to='/signup'>Register now</Link></p>

          </div>
        </form>
      </div>
    </div>

  )
}


export default Login