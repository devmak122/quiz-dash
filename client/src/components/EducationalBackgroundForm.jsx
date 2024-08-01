import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EducationalBackgroundForm = ({ data, onBack, onNext }) => {
  const validationSchema = Yup.object().shape({
    collegeName: Yup.string().required('College name is required'),
    degree: Yup.string().required('Degree is required'),
    interestedSubject: Yup.string().required('Interested subject is required'),
    skillSets: Yup.string().required('Skill sets are required'),
  });

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onNext(values);
      }}
    >
      {() => (
        <Form className="space-y-6">
          <div>
            <Field
              name="collegeName"
              placeholder="College Name"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
            <ErrorMessage name="collegeName" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
          <div>
            <Field
              as="select"
              name="degree"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Degree</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </Field>
            <ErrorMessage name="degree" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
          <div>
            <Field
              name="interestedSubject"
              placeholder="Interested Subject"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
            <ErrorMessage name="interestedSubject" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
          <div>
            <Field
              name="skillSets"
              placeholder="Skill Sets"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
            <ErrorMessage name="skillSets" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="py-2 px-6 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 shadow-md"
            >
              Back
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-primary text-white font-semibold rounded-md hover:bg-primary shadow-md"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EducationalBackgroundForm;