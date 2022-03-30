import React, { useState } from 'react';
import { Step } from './Step';

const Indicator = ({ steps }) => {
  const [selected, setSelected] = useState();
  return (
    <div className="progress-indicator">
      {steps.map((step, i) => (
        <Step
          number={i + 1}
          title={step}
          key={i}
          isHighlight={selected === i}
          setSelected={() => setSelected(i)}
        />
      ))}
    </div>
  );
};
export { Indicator };
