import React, { useState } from 'react';
import BasicInfoForm from './BasicInfoForm';
import EducationalBackgroundForm from './EducationalBackgroundForm';
import ExperienceForm from './ExperienceForm';


const CheckMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
  </svg>
);

const StepIndicator = () => {
 
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {}
  });

  const handleNext = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      [`step${currentStep}`]: data
    }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (data) => {
    const finalData = {
      ...formData,
      step3: data
    };
    console.log('Final Payload:', finalData);
    
  };

  return (
    <div className="w-full h-full pb-5">
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

      {/* Render the corresponding step component */}
      {currentStep === 1 && (
        <BasicInfoForm data={formData.step1} onSubmit={handleNext} />
      )}
      {currentStep === 2 && (
        <EducationalBackgroundForm data={formData.step2} onBack={handleBack} onNext={handleNext} />
      )}
      {currentStep === 3 && (
        <ExperienceForm data={formData.step3} onBack={handleBack} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default StepIndicator;
