import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, } from 'react-icons/fa';
import loginform from '../assets/Images/loginform.svg';
import Google from '../assets/Images/google.svg';
import Github from '../assets/Images/github.svg';
import Linkedin from '../assets/Images/linkedin.svg';
// FaGoogle, FaLinkedin, FaGithub 

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', values);
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate('/dashboard'), 3500);
      } catch (err) {
        setErrors({ submit: err.response?.data?.message || 'Something went wrong. Please try again.' });
        toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
      }
      setSubmitting(false);
    },
  });

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <div className="flex h-screen font-roboto">
      {/* Left: Image Section */}
      <div className="hidden laptop:flex w-3/4 bg-cover bg-center relative">
        <img src={loginform} alt="Illustration" className="object-cover w-full h-full" />
      </div>

      {/* Right: Login Form */}
      <div className="flex flex-col justify-center w-full laptop:w-4/12 p-8  laptop:px-14 bg-white shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Sign in</h1>
        <p className="text-gray-600 mb-8">
          If you don't have an account register<br />
          <Link to="/" className="text-red-500 text-2xl font-roboto font-bold">Register here!</Link>
        </p>
        {formik.errors.submit && (
          <div className="text-red-500 mb-4">
            {formik.errors.submit}
          </div>
        )}
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email" className="text-gray-700 mb-2 flex items-center">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="text"
                placeholder="Enter your email address"
                className="w-full pl-8 p-3 border-0 border-b border-gray-300 focus:outline-none focus:border-red-500"
                {...formik.getFieldProps('email')}
              />
              <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="password" className="text-gray-700 mb-2 flex items-center">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Enter your Password"
                className="w-full pl-8 p-3 border-0 border-b border-gray-300 focus:outline-none"
                {...formik.getFieldProps('password')}
              />
              <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-red-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
            disabled={formik.isSubmitting}
          >
            Login
          </button>
        <div className="my-8 text-center text-gray-600">or continue with</div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => handleSocialLogin('google')}
            className="p-2 bg-white rounded-full hover:bg-red-500 hover:text-white flex items-center space-x-2 transition-all duration-200"
          >
            <img src={Google} alt="Google" className="w-6 h-6" />
            <span>Google</span>
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            className="p-2 bg-white rounded-full hover:bg-red-500 hover:text-white flex items-center space-x-2 transition-all duration-200"
          >
            <img src={Github} alt="GitHub" className="w-6 h-6" />
            <span>GitHub</span>
          </button>
          <button
            onClick={() => handleSocialLogin('linkedin')}
            className="p-2 bg-white rounded-full hover:bg-red-500 hover:text-white flex items-center space-x-2 transition-all duration-200"
          >
            <img src={Linkedin} alt="LinkedIn" className="w-6 h-6" />
            <span>LinkedIn</span>
          </button>
        </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;