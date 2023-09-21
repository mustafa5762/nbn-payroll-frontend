import React, { useState } from "react";
import "./index.css";
import TextField from "../../components/Textfield";
import instance from "../../axios";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

const Login = ({isLoggedIn}) => {
  // State to store the email input value
  const [email, setEmail] = useState("");

  // State to store the password input value
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false)
  const [errore, setErrore] = useState(null);

  // Function to handle email input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle password input changes
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true)

    if (!email || !password) {
        setErrore("All fields are required.");
        setloading(false);
        return;
      }

    const data = {
        email,
        password
    }

    try {
        // Make a POST request using Axios
        const response = await instance.post('/login', data);
    
        // Check if the request was successful
        if (response.status === 200) {
          setErrore(null);
          Cookies.set('accessToken', response.data.token, { secure: true, expires: 1, path: '/' });
          Cookies.set('username', response.data.user, { secure: true, expires: 1, path: '/' });
          setloading(false)
          window.location = '/'
        } else {
          setErrore('An error occurred while submitting the form.');
          setloading(false)
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx (e.g., 4xx or 5xx)
          setErrore(error.response.data.message);
          setloading(false)
        } else if (error.request) {
          // The request was made but no response was received
          setErrore('No response received from the server. Please try again later.');
          setloading(false)
        } else {
          // Something happened in setting up the request
          setErrore('An error occurred while making the request.');
          setloading(false)
        }
      } 
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ display: "block" }}>
      <hr />
      <div className="login">
        <div className="flex flex-col space-y-4">
          <div className="heading">
            <h1>Sign In</h1>
          </div>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {errore && <p className="error">{errore}</p>}
            <TextField
              style="fill"
              label="Email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              style="fill"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {loading ? (
              <p>Loading...</p>
            ) : (
              <button type="submit">Submit</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

