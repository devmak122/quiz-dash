import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BasicInfoForm = ({ data, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Call the onSubmit function passed from the parent component
        onSubmit(values);
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className="space-y-4">
          <div>
            <Field
              name="name"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>
          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>
          <div>
            <Field
              name="phone"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-lg"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="phone" component="div" className="text-red-500" />
          </div>
          <div>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>
          <button
            type="submit"
            className="py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary"
          >
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BasicInfoForm;
