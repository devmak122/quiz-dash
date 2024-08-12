import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProfileUpdateForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    collegeName: '',
    degree: '',
    interestedSubject: '',
    skillSets: '',
    yearsOfExperience: 0,
    resume: null,
  });

  useEffect(() => {
    // Fetch user data from localStorage instead of an API
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      const parsedUser = JSON.parse(storedUser);
      setInitialValues({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        password: '',
        collegeName: parsedUser.collegeName || '',
        degree: parsedUser.degree || '',
        interestedSubject: parsedUser.interestedSubject || '',
        skillSets: parsedUser.skillSets || '',
        yearsOfExperience: parsedUser.yearsOfExperience || 0,
        resume: null,
      });
    }
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    collegeName: Yup.string().required('College name is required'),
    degree: Yup.string().required('Degree is required'),
    interestedSubject: Yup.string().required('Interested subject is required'),
    skillSets: Yup.string().required('Skill sets are required'),
    yearsOfExperience: Yup.number().required('Years of experience is required'),
    resume: Yup.mixed().nullable(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
  
    Object.keys(values).forEach((key) => {
      if (key === 'resume' && values[key] === null) return;
      formData.append(key, values[key]);
    });
  
    const token = localStorage.getItem('token');
    console.log('FormData:', ...formData); // Debugging step
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/updateProfile', {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Profile update failed:', errorData.message || 'Unknown error');
        alert(`Profile update failed: ${errorData.message || 'Unknown error'}`);
        return;
      }
  
      const data = await response.json();
      alert('Profile updated successfully!');
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Network error:', error.message);
      alert(`Network error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };
  


  return (
    <div className="flex  p-3 ">
      <div className="w-full p-2">
        <h2 className="text-4xl font-semibold text-gray-800 text-center">Edit Your Profile</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="grid grid-cols-3 gap-8">
              {/* Name Field (Read-only) */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">First Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-500 cursor-not-allowed"
                  readOnly
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email Field (Read-only) */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-500 cursor-not-allowed"
                  readOnly
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Phone Field */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
                <Field
                  type="text"
                  name="phone"
                  id="phone"
                  className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password Field */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* College Name Field */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="collegeName" className="block text-sm font-semibold text-gray-700">College Name</label>
                <Field
                  type="text"
                  name="collegeName"
                  id="collegeName"
                  className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
                />
                <ErrorMessage name="collegeName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Degree Field */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="degree" className="block text-sm font-semibold text-gray-700">Degree</label>
                <Field
                  as="select"
                  id="degree"
                  name="degree"
                  className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Degree</option>
                  <option value="b.tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                </Field>
                <ErrorMessage name="degree" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Interested Subject Field */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="interestedSubject" className="block text-sm font-semibold text-gray-700">Interested Subject</label>
                <Field
                  as="select"
                  id="interestedSubject"
                  name="interestedSubject"
                  className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Interested Subject</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Data Science and Analytics">Data Science and Analytics</option>
                  <option value="Artificial Intelligence and Machine Learning">AI & ML</option>
                  <option value="Blockchain Development">Blockchain Development</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Web Development">Web Development</option>
                  <option value="WordPress Development">WordPress Development</option>
                  <option value="Content Writing">Content Writing</option>
                </Field>
                <ErrorMessage name="interestedSubject" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Skill Sets Field */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="skillSets" className="block text-sm font-semibold text-gray-700">Skill Sets</label>
                <Field
                  type="text"
                  name="skillSets"
                  id="skillSets"
                  className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
                />
                <ErrorMessage name="skillSets" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Years of Experience Field */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="yearsOfExperience" className="block  text-sm font-semibold text-gray-700">Years of Experience</label>
                <div className="relative">
                  {/* <FaLaptopCode className="absolute left-3 top-3 text-gray-500 text-xl" /> */}
                  <Field
                    as="select"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
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

              {/* Resume Upload Field */}
              <div className="col-span-2">
                <label htmlFor="resume" className="block text-sm font-semibold text-gray-700">Upload Resume</label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
                  onChange={(event) => setFieldValue('resume', event.currentTarget.files[0])}
                />
                <ErrorMessage name="resume" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <div className="col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="py-3 px-5 bg-red-500 text-white text-xl font-semibold rounded-lg transition duration-300 ease-in-out"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileUpdateForm;
