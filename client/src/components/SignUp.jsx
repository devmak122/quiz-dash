import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import loginImg from '../assets/Images/loginImg.jpg'; // Update path as needed
import googleImg from '../assets/Images/google.svg'; // Your Google image path
import githubImg from '../assets/Images/github.svg'; // Your GitHub image path
import linkedinImg from '../assets/Images/linkedin.svg'; // Your LinkedIn image path

const Login = () => {
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
        localStorage.setItem('token', res.data.token);
        toast.success('Login successfully');
        window.location.href = '/dashboard'; // Redirect to dashboard
      } catch (err) {
        setErrors({ submit: err.response?.data?.message || 'Something went wrong. Please try again.' });
        toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        console.error(err);
      }
      setSubmitting(false);
    },
  });

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/auth/${provider}`;
  };

  return (
    <div className="flex mobile:flex-col mobile:min-h-screen h-screen">
      {/* Left: Image Section */}
      <div className="lg:w-1/2 h-full hidden lg:block">
        <img
          src={loginImg}
          alt="leftImg"
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:w-1/2 mobile:min-h-screen laptop:flex flex-col">
        <div className="laptop:h-[77vh] flex flex-col laptop:gap-5 justify-end items-center p-4 mobile:bg-tertiary mobile:items-start lg:p-0">
          <h1 className="text-3xl lg:text-5xl text-primary font-semibold mobile:text-start mobile:text-5xl mobile:mb-5 mt-5 font-lora text-center">
            Welcome TO ZYZ
          </h1>
          <p className="text-primary font-poppins mobile:mb-5 text-lg lg:text-2xl text-center">
            Please Login
          </p>
          {formik.errors.submit && (
            <div className="text-red-500 text-center mb-4">
              {formik.errors.submit}
            </div>
          )}
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-primary font-poppins text-lg mb-1">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter Email"
                className="w-[500px] h-[60px] rounded-[30px] border border-primary px-[30px] py-[20px] focus:outline-none focus:border-primary"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="block text-primary font-poppins text-lg mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Passcode"
                className="w-[500px] h-[60px] rounded-[30px] border border-primary px-[30px] py-[20px] focus:outline-none focus:border-primary"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="text-right text-orange-500">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 lg:py-3 mt-4 font-semibold text-white bg-secondary rounded-[30px] uppercase"
              disabled={formik.isSubmitting}
            >
              Sign in
            </button>
          </form>
          <div className="mt-6 text-center">
            <div className="text-primary font-poppins mobile:mb-5 text-lg lg:text-sm text-center">
              — Or Sign in with —
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => handleSocialLogin('google')}
                className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white flex items-center space-x-2"
              >
                <img src={googleImg} alt="Google" className="w-6 h-6" />
                <span>Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('github')}
                className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white flex items-center space-x-2"
              >
                <img src={githubImg} alt="GitHub" className="w-6 h-6" />
                <span>GitHub</span>
              </button>
              <button
                onClick={() => handleSocialLogin('linkedin')}
                className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white flex items-center space-x-2"
              >
                <img src={linkedinImg} alt="LinkedIn" className="w-6 h-6" />
                <span>LinkedIn</span>
              </button>
            </div>
            <div className="mt-6 text-gray-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-orange-500">
                Sign up
              </a>
            </div>
          </div>
          <div className="laptop:hidden">
            <footer className="bg-white shadow-md w-full font-poppins">
              <div className="container mx-auto p-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                {/* Left Section */}
                <div className="text-[#214284] text-sm mb-2 sm:mb-0">
                  <p>
                    <Link to="/" className="underline">
                      Terms and Condition
                    </Link>{" "}
                    <br />{" "}
                    <Link to="/" className="underline px-2">
                      Privacy Policy
                    </Link>{" "}
                    |{" "}
                    <Link to="/" className="underline px-2">
                      Contact Us
                    </Link>
                  </p>
                </div>

                {/* Right Section */}
                <div className="text-[#214284] text-[16px]">
                  <p>&copy; 2021 All Rights Reserved by TFS</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
