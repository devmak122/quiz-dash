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
            <label htmlFor="yearsOfExperience" className="block mb-2 text-xl font-semibold text-gray-700">Years of Experience</label>
            <div className="relative">
              <FaLaptopCode className="absolute left-3 top-3 text-gray-500 text-xl" />
              <Field
                as="select"
                id="yearsOfExperience"
                name="yearsOfExperience"
                className="w-full pl-10 py-2 border-b-2 text-xl border-gray-300 focus:border-primary focus:outline-none"
              >
                <option value="">Your Experience</option>
                <option value="0">Fresher</option>
                <option value="1">0 to 1 year</option>
                <option value="2">1 to 2 years</option>
                <option value="3">2 to 3 years</option>
                <option value="4">3 to 4 years</option>
              </Field>
            </div>
            <ErrorMessage name="yearsOfExperience" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="resume" className="block mb-2  text-xl font-semibold text-gray-700">Upload Resume</label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept="application/pdf"
              onChange={(event) => {
                setFieldValue("resume", event.currentTarget.files[0]);
                onFileChange(event.currentTarget.files[0]);
              }}
              className="mt-1 block w-full text-xl text-red-600 border-b-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            />
            <ErrorMessage name="resume" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="py-3 px-10 bg-white border border-red-500 text-xl text-black font-semibold rounded-lg transition-colors duration-300 ease-in-out"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-3 px-10 bg-red-500 text-white text-xl font-semibold rounded-lg transition-colors duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-light'
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
