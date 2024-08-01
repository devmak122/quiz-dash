import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ExperienceForm = ({ data, onFileChange, onBack, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    experienceLevel: Yup.string().required("Experience level is required"),
    programmingLanguages: Yup.string().required("Programming languages are required"),
  });

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form submitted with values: ", values);
        onSubmit(values);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <Field
              as="select"
              name="experienceLevel"
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select Experience Level</option>
              <option value="0-1 year">0-1 year</option>
              <option value="1-2 years">1-2 years</option>
              <option value="2+ years">2+ years</option>
            </Field>
            <ErrorMessage name="experienceLevel" component="div" className="text-red-500" />
          </div>
          <div>
            <Field
              name="programmingLanguages"
              placeholder="Programming Languages Known"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <ErrorMessage name="programmingLanguages" component="div" className="text-red-500" />
          </div>
          <div>
            <input
              type="file"
              name="cv"
              onChange={(e) => setFieldValue("cv", e.currentTarget.files[0])}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="py-3 px-6 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
            <button
              type="submit"
              className="py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExperienceForm;
