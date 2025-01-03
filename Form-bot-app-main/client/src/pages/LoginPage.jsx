import React, { useState } from "react";
import styles from './Register.module.css';
import { loginUser, ValidateExitToken } from '../api/user';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated,setCurrentUser } from "../configureslice/reduxSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "", 
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
      login: "", 
    });
  };

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          try {
            const { token, userId, username } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
            const validateToken = await ValidateExitToken(token);
            if (validateToken) {
              toast.success("User logged in successfully");
              dispatch(setCurrentUser({ userId, username }));
              dispatch(setIsAuthenticated(true));
              navigate('/workspace');
            } else {
              throw new Error("Token validation failed");
            }
          } catch (error) {
            console.error("Token validation error:", error);
            toast.error("Token validation failed. Please try again.");
            setErrors(prevErrors => ({ ...prevErrors, login: "Token validation failed. Please try again." }));
          }
        } else if (response.status === 401) {
          setErrors(prevErrors => ({ ...prevErrors, login: "Email or password is incorrect" }));
          toast.error("Email or password is incorrect");
        } else if (response.status === 404) {
          setErrors(prevErrors => ({ ...prevErrors, login: "User not found" }));
          toast.error("User not found");
        } else {
          setErrors(prevErrors => ({ ...prevErrors, login: "An unexpected error occurred" }));
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.message || "An error occurred. Please try again later.");
        setErrors(prevErrors => ({ ...prevErrors, login: error.message || "An error occurred. Please try again later." }));
      }
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form className={styles.container__form} onSubmit={handleSubmit}>
        <div className={styles.input__div}>
          <label className={styles.form_label}>Email</label><br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            className={styles.form_inputs}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.input__div}>
          <label className={styles.form_label}>Password</label><br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.form_inputs}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        {errors.login && <p className={styles.error}>{errors.login}</p>}
        <div className={styles.button_container}>
          <button type="submit" className={styles.button}>Log In</button>
        </div>
        <div className={styles.para_container}>
          <span className={styles.para_small}>Don&apos;t have an account? </span>
          <Link className={styles.link} to="/register">Register now</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;


