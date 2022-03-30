import React from 'react';

const Step = ({ number, title, setSelected, isHighlight }) => {
  return (
    <div className="step" onClick={() => setSelected(number)}>
      <div
        className="step__circle mr-2"
        style={{
          backgroundColor: isHighlight ? '#D63B03' : '#bebebe',
        }}
      >
        {number}
      </div>
      <div
        className="step__text"
        style={{
          color: isHighlight ? '#D63B03' : '#bebebe',
        }}
      >
        {title}
      </div>
    </div>
  );
};
export { Step };
