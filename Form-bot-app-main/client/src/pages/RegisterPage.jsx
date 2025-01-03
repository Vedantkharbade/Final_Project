import React, { useState } from "react";
import styles from './Register.module.css';
import { registerUser, loginUser } from '../api/user';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setCurrentUser } from "../configureslice/reduxSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    form: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
      form: "",
    });
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // dispatch(setCurrentUser({ email, password: formData.password }));
      try {
        const response = await registerUser({
          name: formData.username,
          email: formData.email,
          password: formData.password,
        });

        console.log('Register response:', response);

        if (response.status === 201) {
          const loginResponse = await loginUser({
            email: formData.email,
            password: formData.password,
          });

          console.log('Login response:', loginResponse);

          if (loginResponse.status === 200) {
            const { token, email } = loginResponse.data;
            localStorage.setItem("token", token);

            // Dispatch actions to update Redux store
           
            dispatch(setIsAuthenticated(true));

            console.log('Current User:', { email, password: formData.password });

            toast.success("Registration successful!");
            navigate('/login');
          } else {
            console.log('Unexpected login response status:', loginResponse.status);
            toast.error("An error occurred. Please try again later.");
            setErrors({ ...errors, form: "An error occurred. Please try again later." });
          }
        } else {
          console.log('Unexpected register response status:', response.status);
          toast.error("Registration failed. Please try again.");
          setErrors({ ...errors, form: "An error occurred. Please try again later." });
        }
      } catch (error) {
        if (error.message) {
          if (error.message === 'User already exists, please use another email address') {
            setErrors({ ...errors, form: "This email is already registered." });
            toast.error("This email is already registered.");
            console.log("User already exists (catch block - message)");
          } else {
            setErrors({ ...errors, form: "An error occurred. Please try again later." });
            toast.error("An error occurred. Please try again later.");
            console.log('Catch block error message:', error.message);
          }
        } else {
          setErrors({ ...errors, form: "An error occurred. Please try again later." });
          toast.error("An error occurred. Please try again later.");
          console.log('Catch block unknown error:', error);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.container__form} onSubmit={handleSubmit}>
        <div className={styles.input__div}>
          <label className={styles.form_label}>Username</label><br/>
          <input
            type="text"
            name="username"
            placeholder="Enter a Username"
            className={styles.form_inputs}
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}
        </div>
        <div className={styles.input__div}>
          <label className={styles.form_label}>Email</label><br/>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.form_inputs}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.input__div}>
          <label className={styles.form_label}>Password</label><br/>
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
        <div className={styles.input__div}>
          <label className={styles.form_label}>Confirm Password</label><br/>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={styles.form_inputs}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        </div>
        {errors.form && <p className={styles.error}>{errors.form}</p>}
        <div className={styles.button_container}>
          <button type="submit" className={styles.button}>Sign Up</button>
        </div>
        <div className={styles.para_container}>
          <p className={styles.para_small}>
            Already have an account?
          </p>
          <Link className={styles.link} to="/login">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;



