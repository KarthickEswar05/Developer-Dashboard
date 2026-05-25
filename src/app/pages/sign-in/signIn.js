import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../../users.json";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const goToDashboard = (e) => {
    e.preventDefault();
    if (username && password) {
      const result = data.find((e) => {
        return e.username === username && e.password === password;
      });
      if (result) {
        navigate("/dashboard", { state: { username: result.gitname } });
        localStorage.setItem("email",result.username)
        localStorage.setItem("username",result.gitname)
      } else {
        alert("Please enter correct username or password");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={goToDashboard}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                required={true}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignIn;
