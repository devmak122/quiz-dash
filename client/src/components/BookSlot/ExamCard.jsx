import React from 'react';

const ExamCard = ({ exam }) => {
  return (
    <div className="exam-card">
      <h2>{exam.title}</h2>
      <p>{exam.description}</p>
      {/* Display other exam details here */}
    </div>
  );
};

export default ExamCard;
