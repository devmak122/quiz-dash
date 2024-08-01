import React, { useState } from 'react';
import VerticalStepper from './VerticalStepper';
import BasicInfoForm from './BasicInfoForm';
import EducationalBackgroundForm from './EducationalBackgroundForm';
import ExperienceForm from './ExperienceForm';

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    collegeName: '',
    degree: '',
    interestedSubject: '',
    skillSets: '',
    experienceLevel: '',
    programmingLanguages: '',
    cv: null,
  });

  const handleNext = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
    console.log('Final Data:', formData);
    // Submit finalData to the server or perform other actions
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
        <VerticalStepper activeStep={activeStep} />
        {/* <div className="w-3/4 ml-8">
          {activeStep === 0 && (
            <BasicInfoForm data={formData} onNext={handleNext} />
          )}
          {activeStep === 1 && (
            <EducationalBackgroundForm
              data={formData}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}
          {activeStep === 2 && (
            <ExperienceForm
              data={formData}
              onBack={handleBack}
              onNext={handleSubmit}
            />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default MultiStepForm;
