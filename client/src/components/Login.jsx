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
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <div className="flex mobile:flex-col mobile:min-h-screen h-screen">
      {/* Left: Image Section */}
      <div className="lg:w-1/2  h-full hidden lg:block">
        <img
          src={loginImg}
          alt="leftImg"
          className="object-cover  object-center bg-cover bg-center w-full h-full"
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
                className="p-2 bg-white rounded-full hover:bg-secondary hover:text-white flex items-center space-x-2"
              >
                <img src={googleImg} alt="Google" className="w-6 h-6" />
                <span>Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('github')}
                className="p-2 bg-white rounded-full hover:bg-secondary hover:text-white flex items-center space-x-2"
              >
                <img src={githubImg} alt="GitHub" className="w-6 h-6" />
                <span>GitHub</span>
              </button>
              <button
                onClick={() => handleSocialLogin('linkedin')}
                className="p-2 bg-white rounded-full hover:bg-secondary hover:text-white flex items-center space-x-2"
              >
                <img src={linkedinImg} alt="LinkedIn" className="w-6 h-6" />
                <span>Linkedin</span>
              </button>
            </div>
            <div className="mt-6 text-gray-500">
              Don't have an account?{" "}
              <Link to="/SignUp" className="text-orange-500">
                Sign up
              </Link>
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
// import React from "react";
// import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
// import devv from '../assets/Images/devv.svg'
// import wbg from '../assets/Images/wbg.png'
// import ellipse from '../assets/Images/circle.svg'
// import line from '../assets/Images/line.svg'
// import marker from  '../assets/Images/marker.svg'
// const Login = () => {
  
//   return (
//     <>
      
//         <div className="  bg-[#f6f2eb]  flex  justify-center  ">
//           <div className="bg-white  absolute  shadow-lg w-[500px] mt-40 h-[700px] rounded-[40px] p-10 z-50 ">
//             <h2 className="text-2xl font-bold mb-4 text-center"> Login</h2>
//             <p className="text-center text-gray-500 text-2xl mb-6">
//               Hey, Enter your details to get sign in to your account
//             </p>

//             <form className="space-y-4">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Enter Email / Phone No"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   placeholder="Passcode"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 />
//               </div>
//               <div className="text-right text-orange-500">
//                 <a href="/">Forgot Password?</a>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-orange-400 text-black font-semibold py-2 rounded-md hover:bg-orange-500 transition-colors"
//               >
//                 Sign in
//               </button>
//             </form>

//             <div className="mt-6 text-center">
//               <div className="text-gray-500">— Or Sign in with —</div>
//               <div className="flex justify-center space-x-4 mt-4">
//                 <button className="p-2 bg-gray-100 rounded-full  hover:bg-black hover:text-white  ">
//                   <FaFacebook className="text-lg" />
//                 </button>
//                 <button className="p-2 bg-gray-100 rounded-full  hover:bg-black hover:text-white">
//                   <FaGoogle className="text-lg" />
//                 </button>
//                 <button className="p-2 bg-gray-100 rounded-full  hover:bg-black hover:text-white">
//                   <FaGithub className="text-lg" />
//                 </button>
//               </div>
//               <div className="mt-6 text-gray-500">
//                 Don't have an account?{" "}
//                 <a href="/" className="text-orange-500">
//                   Sign up
//                 </a>
//               </div>
//             </div>
//           </div>
       
//           <img className="absolute right-80 h-80 bottom-80 z-10 w-80 scale-x-[-1]" src={devv} alt="" />
//           <div className="bg-white border border-black h-64 w-40 absolute right-[390px] bottom-[162px] "></div>
//       <img className="absolute h-56 w-32 left-[300px] bottom-[162px]" src={wbg} alt="" />
//       <img className="absolute h-56 w-32 right-60 bottom-[162px]" src={wbg} alt="" />
//       <div className="bg-white border border-black h-32 w-28 absolute left-[440px] bottom-[162px] "></div>
//       <img className="absolute h-2 w-2 right-20 top-80" src={ellipse} alt="" />
//       <img className="absolute h-64 w-64 right-12 top-56 opacity-50" src={line}  alt="" />
//       <img className="absolute h-2 w-2 left-96 top-60" src={ellipse} alt="" />
//       <img className="absolute h-2 w-2 right-[600px] bottom-[380px]" src={ellipse} alt="" />

//       <img className="absolute h-64 w-64 left-60 top-40 opacity-50" src={line} alt="" />
//       <img className="absolute h-64 w-64 z-10  left-[600px] top-[500px] opacity-50  scale-x-[-1] " src={line} alt="" />
//       <img className="absolute h-64 w-64 z-10  right-[600px] top-[100px] opacity-50  " src={line} alt="" />
//       <img src={marker} className="absolute h-24 w-24 -rotate-[65deg]  top-[670px] left-[450px]" alt="" />
//       <div className="flex justify-center items-center h-screen">
//       <div className="border absolute left-[420px] top-[400px] h-24 w-28 block content-center justify-center border-black p-4">
//       <div className=" ml-2 h-[2px] w-12 bg-black mb-2"></div>
//       <div className=" ml-2 h-[2px] w-8 bg-black"></div>
//       </div>
//       <div className="border absolute right-[560px] top-[330px] h-16 w-20 block content-center justify-center border-black p-4">
//         <div className="  h-[2px] w-8 bg-black mb-2"></div>
//         <div className="  h-[2px] w-6 bg-black"></div>
//       </div>
//       <div className="absolute h-[1px] content-center w-[1600px] bg-black bottom-[162px] "></div>
      
//     </div>
//         </div>
       
//     </>
//   );
// };

// export default Login;