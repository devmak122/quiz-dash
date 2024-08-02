import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUniversity, FaBook, FaBrain } from 'react-icons/fa';

const EducationalBackgroundForm = ({ data, onBack, onNext }) => {
  const validationSchema = Yup.object().shape({
    collegeName: Yup.string()
      .required('College name is required')
      .min(2, 'College name is too short!'),
    degree: Yup.string().required('Degree is required'),
    interestedSubject: Yup.string().required('Interested subject is required'),
    skillSets: Yup.string().required('Skill sets are required'),
  });

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onNext(values);
        setSubmitting(false); // Stop the loader after submission
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="relative">
            <label htmlFor="collegeName" className="block mb-2 font-semibold text-body text-gray-700">College Name</label>
            <FaUniversity className="absolute left-3 top-10 text-primary" />
            <Field
              id="collegeName"
              name="collegeName"
              placeholder="Enter your college name"
              className="w-full px-10 py-2 border border-primary rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            />
            <ErrorMessage name="collegeName" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
          <div className="relative">
            <label htmlFor="degree" className="block mb-2 font-semibold text-body text-gray-700">Degree</label>
            <FaBook className="absolute left-3 top-10 text-primary" />
            <Field
              as="select"
              id="degree"
              name="degree"
              className="w-full px-10 py-2 border border-primary rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            >
              <option value="">Select Degree</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </Field>
            <ErrorMessage name="degree" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
          <div className="relative">
            <label htmlFor="interestedSubject" className="block mb-2 font-semibold text-body text-gray-700">Interested Subject</label>
            <FaBrain className="absolute left-3 top-10 text-primary" />
            <Field
              id="interestedSubject"
              name="interestedSubject"
              placeholder="Enter your interested subject"
              className="w-full px-10 py-2 border border-primary rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            />
            <ErrorMessage name="interestedSubject" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
          <div className="relative">
            <label htmlFor="skillSets" className="block mb-2 font-semibold text-body text-gray-700">Skill Sets</label>
            <Field
              id="skillSets"
              name="skillSets"
              placeholder="E.g., HTML, CSS, JavaScript"
              className="w-full px-10 py-2 border border-primary rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            />
            <ErrorMessage name="skillSets" component="div" className="text-red-500 mt-1 text-sm" />
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
              {isSubmitting ? 'Submitting...' : 'Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EducationalBackgroundForm;
