import React from 'react';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        const res = await axios.post('http://localhost:5000/api/login', values);
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

  const handleSocialLogin = async (provider) => {
    // This is a placeholder. You need to implement the actual OAuth flow with the chosen provider.
    toast.info(`Login with ${provider} is not implemented yet.`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg">
      <div className="w-96 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <p className="text-center text-gray-500 mb-6">
            Hey, enter your details to get signed into your account.
          </p>
          {formik.errors.submit && <div className="text-red-500 text-center mb-4">{formik.errors.submit}</div>}
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Enter Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <input
                type="password"
                placeholder="Passcode"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
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
              className="w-full bg-orange-400 text-black font-semibold py-2 rounded-md hover:bg-orange-500 transition-colors"
              disabled={formik.isSubmitting}
            >
              Sign in
            </button>
          </form>
          <div className="mt-6 text-center">
            <div className="text-gray-500">— Or Sign in with —</div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white"
              >
                <FaFacebook className="text-lg" />
              </button>
              <button
                onClick={() => handleSocialLogin('Google')}
                className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white"
              >
                <FaGoogle className="text-lg" />
              </button>
              <button
                onClick={() => handleSocialLogin('Github')}
                className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white"
              >
                <FaGithub className="text-lg" />
              </button>
            </div>
            <div className="mt-6 text-gray-500">
              Don't have an account? <a href="/signup" className="text-orange-500">Sign up</a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
