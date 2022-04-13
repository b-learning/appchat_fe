import React,{useState, useEffect} from 'react'
import './login.scss'
import {Link} from 'react-router-dom'
function Login() {

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const login = ()=>{
    console.log('username: '+username)
    console.log('password: '+password)
  }

  useEffect(()=>{
    document.title = 'Login Page'
  })



  return (
    <div className="login">
      <div className="login__form">
          <h1>Sign In With</h1>

          <div className="login__form__social">
            <button className="icon-facebook">
              <i class="fa-brands fa-facebook-square"></i>
              <h3>Facebook</h3>
            </button>
            <button className="icon-google">
              <img src="https://colorlib.com/etc/lf/Login_v5/images/icons/icon-google.png" alt="" />
              <h3>Google</h3>
            </button>
          </div>

          <div className="login__form__input">
            <div className="username">
              <h4>Username</h4>
              <input type="text" onChange={(event)=>{setUsername(event.target.value)}}/>
            </div>
            <div className="password" >
              <h4>Password</h4>
              <input type="password" onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
          </div>

          <div className="login__form__submit">
            <button onClick={(event)=>{
              login();
            }}>
              <h4>Sign In</h4>
            </button>
          </div>

          <p>Not a member? <Link to="/signup">Go to Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login