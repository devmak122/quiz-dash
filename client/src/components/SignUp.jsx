import React, { useState } from 'react';
import BasicInfoForm from './BasicInfoForm';
import EducationalBackgroundForm from './EducationalBackgroundForm';
import ExperienceForm from './ExperienceForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

  const handleNext = (newData) => {
    setFormData({ ...formData, ...newData });
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = (newData) => {
    setFormData({ ...formData, ...newData });
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const CheckMarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
    </svg>
  );

  const handleSubmit = async (finalData) => {
    setFormData({ ...formData, ...finalData });
    console.log('Final Registration Data:', { ...formData, ...finalData });

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, ...finalData }),
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

        setTimeout(() => {
          navigate('/login');
        }, 3500);
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
    <div className="min-h-screen bg-body-bg bg-cover bg-no-repeat flex items-center justify-center">
      <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-3xl">
        <h1 className="text-2xl font-bold text-center mb-6">Registration</h1>
        <div className="flex justify-center w-full pt-10 items-center space-x-2 p-4 laptop:items-center laptop:justify-center">
          <div className={`${currentStep >= 1 ? 'ring-2 ring-primary rounded-full p-1' : ''}`}>
            <div className={`w-10 h-10 flex items-center justify-center font-bold ${currentStep >= 1 ? 'text-primary bg-secondary' : 'text-primary bg-tertiary'} rounded-full`}>
              {currentStep > 1 ? <CheckMarkIcon /> : '1'}
            </div>
          </div>

          <hr className="border-t-2 w-32" />
          <div className={`${currentStep >= 2 ? 'ring-2 ring-primary rounded-full p-1' : ''}`}>
            <div className={`w-10 h-10 flex items-center justify-center font-bold ${currentStep >= 2 ? 'text-primary bg-secondary' : 'text-secondary bg-tertiary'} rounded-full`}>
              {currentStep > 2 ? <CheckMarkIcon /> : '2'}
            </div>
          </div>
          <hr className="border-t-2 w-32" />
          <div className={`${currentStep >= 3 ? 'ring-2 ring-primary rounded-full p-1' : ''}`}>
            <div className={`w-10 h-10 flex items-center justify-center font-bold ${currentStep >= 3 ? 'text-primary bg-secondary' : 'text-secondary bg-tertiary'} rounded-full`}>
              {currentStep > 3 ? <CheckMarkIcon /> : '3'}
            </div>
          </div>
        </div>
        <div>{stepComponents[currentStep - 1]}</div>
      </div>
    </div>
  );
};

export default Registration;
