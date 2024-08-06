import React, { useState, useEffect } from 'react';
import BasicInfoForm from './BasicInfoForm';
import EducationalBackgroundForm from './EducationalBackgroundForm';
import ExperienceForm from './ExperienceForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import loginform from "../assets/Images/loginform.svg";
import { Link } from 'react-router-dom';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('registrationFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('registrationFormData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = (newData) => {
    setFormData({ ...formData, ...newData });
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = (newData) => {
    setFormData({ ...formData, ...newData });
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const CheckMarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
    </svg>
  );

  const handleSubmit = async (finalData) => {
    setFormData({ ...formData, ...finalData });
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => formDataObj.append(key, formData[key]));

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        toast.success('Registration successful!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        localStorage.removeItem('registrationFormData'); // Clear the stored data
        setTimeout(() => navigate('/login'), 3500);
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error('Registration failed: ' + error.message);
    }
    setCurrentStep(1);
  };

  const handleFileChange = (file) => {
    setFormData({ ...formData, resume: file });
  };

  const stepComponents = [
    <BasicInfoForm data={formData} onSubmit={handleNext} />,
    <EducationalBackgroundForm data={formData} onBack={handleBack} onNext={handleNext} />,
    <ExperienceForm data={formData} onFileChange={handleFileChange} onBack={handleBack} onSubmit={handleSubmit} />,
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:flex w-3/4 bg-cover bg-center relative">
        <img src={loginform} alt="Illustration" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-4 lg:p-24 bg-white shadow-lg">
        <h1 className="font-bold text-4xl mb-6 text-start">Sign up</h1>
        <p className="text-start text-xl font-medium text-gray-500 mb-8">
          If you already have an account,<br />
          <Link to="/login" className="text-red-500 font-bold hover:underline text-2xl">Login here!</Link>
        </p>

        <div className="flex justify-center w-full pt-10 items-center space-x-2 p-4">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`${currentStep >= step ? 'ring-2 ring-red-500 rounded-full p-1' : ''}`}>
                <div className={`w-12 h-12 flex items-center justify-center text-2xl font-bold ${currentStep >= step ? 'text-white bg-red-500' : 'text-red-500 bg-gray-300'} rounded-full`}>
                  {currentStep > step ? <CheckMarkIcon /> : step}
                </div>
              </div>
              {step < 3 && <hr className="border-t-2 w-32" />}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-6">
          {stepComponents[currentStep - 1]}
        </div>
      </div>
    </div>
  );
};

export default Registration;
