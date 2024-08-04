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
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="relative">
            <label htmlFor="collegeName" className="block mb-2 font-semibold text-gray-700 text-xl">College Name</label>
            <div className="relative">
              <FaUniversity className="absolute left-3 top-3 text-gray-500" />
              <Field
                id="collegeName"
                name="collegeName"
                placeholder="Enter your college name"
                className="w-full pl-10 py-2 border-b-2 border-gray-300 text-xl focus:border-primary focus:outline-none"
              />
            </div>
            <ErrorMessage name="collegeName" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative">
            <label htmlFor="degree" className="block mb-2 font-semibold text-gray-700 text-xl">Degree</label>
            <div className="relative">
              <FaBook className="absolute left-3 top-3 text-gray-500" />
              <Field
                as="select"
                id="degree"
                name="degree"
                className="w-full pl-10 py-2 border-b-2 border-gray-300 text-xl focus:border-primary focus:outline-none"
              >
                <option value="">Select Degree</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </Field>
            </div>
            <ErrorMessage name="degree" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative">
            <label htmlFor="interestedSubject" className="block mb-2 font-semibold text-gray-700 text-xl">Interested Subject</label>
            <div className="relative">
              <FaBrain className="absolute left-3 top-3  text-gray-500" />
              <Field
                id="interestedSubject"
                name="interestedSubject"
                placeholder="Enter your interested subject"
                className="w-full pl-10 py-2 border-b-2 border-gray-300 text-xl focus:border-primary focus:outline-none"
              />
            </div>
            <ErrorMessage name="interestedSubject" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative">
            <label htmlFor="skillSets" className="block mb-2 font-semibold text-gray-700 text-xl">Skill Sets</label>
            <div className="relative">
              <Field
                id="skillSets"
                name="skillSets"
                placeholder="E.g., HTML, CSS, JavaScript"
                className="w-full pl-10 py-2 border-b-2 border-gray-300 text-xl focus:border-primary focus:outline-none"
              />
            </div>
            <ErrorMessage name="skillSets" component="div" className="text-red-500 text-sm mt-1" />
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
              className={`py-3 px-10 bg-red-500 text-white text-xl font-semibold rounded-lg transition duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
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
