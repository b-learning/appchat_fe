import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signup.scss";
function SignUp() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [repassword, setRePassword] = useState("");
  let [email, setEmail] = useState("");

  let [usernameError, setUsernameError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [repasswordError, setRePasswordError] = useState("");
  let [emailError, setEmailError] = useState("");

  let [isLoadingAvatar, setIsLoadingAvatar] = useState("");

  const error = { borderColor: "red", borderWidth: "2px" };
  const ok = { borderColor: "green", borderWidth: "2px" };

  let [avatar, setAvatar] = useState(
    "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
  );

  const checkUsername = (username) => {
    return username.length > 7 && !username.includes(" ");
  };

  const checkPassword = (password) => {
    return password.length > 7;
  };

  const checkRePassword = (rePassword, password) => {
    return password == rePassword;
  };

  const checkMail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const signUp = () => {
    const usernameCheck = checkUsername(username);
    if (!usernameCheck) {
      setUsernameError(
        "Username must have at least seven character and have no space between!"
      );
    } else {
      setUsernameError("");
    }
    const passwordCheck = checkPassword(password);
    if (!passwordCheck) {
      setPasswordError("Password must have at least seven character!");
    } else {
      setPasswordError("");
    }
    const repasswordCheck = checkRePassword(repassword, password);
    if (!repasswordCheck) {
      setRePasswordError("Re-Password must match the password!");
    } else {
      setRePasswordError("");
    }
    const emailCheck = checkMail(email);

    if (!emailCheck) {
      setEmailError("Email invalid!");
    } else {
      setEmailError("");
    }
    if (usernameCheck && passwordCheck && repasswordCheck && emailCheck) {
      const newAccount = {
        id: -1,
        username: username,
        avatar: avatar,
        password: password,
      };

      console.log(newAccount);

      axios({
        url: "http://localhost:8080/account",
        method: "POST",
        data: newAccount,
      })
        .then((response) => {
          Swal.fire("Good job!", "Create new account success!", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    document.title = "Sign Up Page";
  });

  const getNewImage = (event) => {
    setIsLoadingAvatar("show");
    let image = event.target.files[0];
    let formData = new FormData();
    formData.append("image", image);
    axios({
      url: "https://api.imgbb.com/1/upload?key=5c667629b5183713b807643171375a5d",
      method: "post",
      data: formData,
    })
      .then((res) => {
        setAvatar(res.data.data.url);
        setIsLoadingAvatar("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1>Sign Up</h1>

        <div className="login__form__input">
          <div className="avatar">
            <div className="avatar__img">
              <div className="avatar__img__wrapper">
                <img src={avatar} alt="" />
                <div className={`avatar-loading ${isLoadingAvatar}`}>
                  <img
                    src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <label for="file-upload" class="custom-file-upload">
              <i class="fa fa-cloud-upload"></i> Upload your avatar
            </label>
            <input
              id="file-upload"
              className="custom-file-input"
              type="file"
              onChange={(event) => {
                getNewImage(event);
              }}
            />
          </div>

          <div className="username">
            <h4>Username</h4>
            <input
              type="text"
              autoComplete="false"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              style={usernameError.length > 0 ? error : ok}
            />
            <span style={{ color: "red" }}>{usernameError}</span>
          </div>
          <div className="email">
            <h4>Email</h4>
            <input
              type="text"
              autoComplete="false"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              style={emailError.length > 0 ? error : ok}
            />
            <span style={{ color: "red" }}>{emailError}</span>
          </div>
          <div className="password">
            <h4>Password</h4>
            <input
              type="password"
              autoComplete="false"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              style={passwordError.length > 0 ? error : ok}
            />
            <span style={{ color: "red" }}>{passwordError}</span>
          </div>
          <div className="repassword">
            <h4>Re-Password</h4>
            <input
              type="password"
              autoComplete="false"
              onChange={(event) => {
                setRePassword(event.target.value);
              }}
              style={repasswordError.length > 0 ? error : ok}
            />
            <span style={{ color: "red" }}>{repasswordError}</span>
          </div>
        </div>

        <div className="login__form__submit">
          <button
            onClick={(event) => {
              signUp();
            }}
          >
            <h4>Sign Up</h4>
          </button>
        </div>

        <p>
          Already have account? <Link to="/login">Go to Sign In Page</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
