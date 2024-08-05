import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const BasicInfoForm = ({ data, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name is too short!')
      .max(50, 'Name is too long!'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
  });

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="relative">
            <label htmlFor="name" className="block mb-2 font-semibold text-gray-700 text-xl">Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <Field
                id="name"
                name="name"
                placeholder="Enter your full name"
                className="w-full pl-10 py-2 border-b-2 border-gray-300 text-xl focus:border-primary focus:outline-none"
              />
            </div>
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 ">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="example123@gmail.com"
                className="w-full pl-10 py-2 border-b-2 border-gray-300 text-xl focus:border-primary focus:outline-none"
              />
            </div>
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative">
            <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700 text-xl">Phone Number</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
              <Field
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full pl-10 py-2 border-b-2 border-gray-300 text-xl focus:border-primary focus:outline-none"
              />
            </div>
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700 text-xl">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                className="w-full pl-10 py-2 border-b-2 border-gray-300 text-xl focus:border-primary focus:outline-none"
              />
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-3 px-6 bg-red-500 text-white font-semibold rounded-lg transition-colors duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-light'
              }`}
          >
            {isSubmitting ? 'Submitting...' : 'Next'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BasicInfoForm;
