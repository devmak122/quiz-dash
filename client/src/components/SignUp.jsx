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
      const response = await fetch('https://quiz-dashbackend.onrender.com/api/auth/register', {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success('Registration successful!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        localStorage.removeItem('registrationFormData'); // Clear the stored data
        localStorage.setItem('user', JSON.stringify(responseData.user)); // Store user data
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
    <div className="flex flex-row mobile:flex-row laptop:h-screen overflow-hidden">
    {/* Left: Illustration */}
    <div className="hidden mobile:hidden tablet:hidden laptop:flex w-full laptop:w-3/4 bg-cover bg-center relative">
      <img src={loginform} alt="Illustration" className="object-cover w-full h-full" />
    </div>
  
    {/* Right: Sign Up Form */}
    <div className="flex flex-col justify-center w-full laptop:w-4/12 p-10 mt-24 mobile:p-6 tablet:p-8 bg-white shadow-laptop h-full mobile:h-[90%] laptop:h-[80%]">
      <h1 className="font-bold text-2xl mobile:text-3xl laptop:text-4xl mb-4 text-start">Sign up</h1>
      <p className="text-start text-sm mobile:text-base laptop:text-xl font-medium text-gray-500">
        If you already have an account,<br />
        <Link to="/login" className="text-red-500 font-bold hover:underline text-lg mobile:text-xl laptop:text-2xl">Login here!</Link>
      </p>
  
      <div className="flex justify-center w-full pt-6 mobile:pt-8 laptop:pt-10 items-center space-x-2 p-2 mobile:p-4">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div className={`${currentStep >= step ? 'ring-2 ring-red-500 rounded-full p-1' : ''}`}>
              <div className={`w-8 h-8 mobile:w-10 mobile:h-10 laptop:w-12 laptop:h-12 flex items-center justify-center text-lg mobile:text-xl laptop:text-2xl font-bold ${currentStep >= step ? 'text-white bg-red-500' : 'text-red-500 bg-gray-300'} rounded-full`}>
                {currentStep > step ? <CheckMarkIcon /> : step}
              </div>
            </div>
            {step < 3 && <hr className="border-t-2 w-16 mobile:w-24 laptop:w-32" />}
          </React.Fragment>
        ))}
      </div>
  
      <div className="mt-4 mobile:mt-6">
        {stepComponents[currentStep - 1]}
      </div>
    </div>
  </div>
  
  );
};

export default Registration;
