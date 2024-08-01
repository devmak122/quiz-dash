import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaLaptopCode } from 'react-icons/fa';

const ExperienceForm = ({ data, onBack, onSubmit, onFileChange }) => {
  const validationSchema = Yup.object().shape({
    yearsOfExperience: Yup.number()
      .min(0, "Experience can't be negative")
      .max(50, "Experience can't be more than 50 years")
      .required("Years of experience is required"),
    resume: Yup.mixed()
      .test("fileSize", "File size is too large", (value) => {
        return !value || (value && value.size <= 20000000); // 2MB limit
      })
      .test("fileType", "Unsupported file format", (value) => {
        return (
          !value || (value && ["application/pdf"].includes(value.type))
        );
      }),
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
      {({ isSubmitting, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="relative">
            <label htmlFor="yearsOfExperience" className="block mb-2 font-semibold text-body text-gray-700">Years of Experience</label>
            <FaLaptopCode className="absolute left-3 top-10 text-gray-400" />
            <Field
              as="select"
              id="degree"
              name="degree"
              className="w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            >
              <option value="">Your Experience</option>
              <option value="1">Fasher</option>
              <option value="2">0 to 1</option>
              <option value="3"> 1 to 2</option>
              <option value="3"> 2 to 3</option>
              <option value="3"> 3 to 4</option>
            </Field>
            <ErrorMessage name="yearsOfExperience" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
          <div>
            <label htmlFor="resume" className="block mb-2 font-semibold text-body text-gray-700">Upload Resume</label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept="application/pdf"
              onChange={(event) => {
                setFieldValue("resume", event.currentTarget.files[0]);
                onFileChange(event.currentTarget.files[0]);
              }}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            <ErrorMessage name="resume" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="py-2 px-6 bg-white border border-primary text-black font-semibold rounded-md transition-colors duration-300 ease-in-out"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-6 bg-primary text-white font-semibold rounded-md transition-colors duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-light'
                }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExperienceForm;
