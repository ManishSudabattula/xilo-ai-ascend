
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypedText: React.FC = () => {
  return (
    <div className="h-8 text-xl text-frameworkx-text/90">
      <TypeAnimation
        sequence={[
          'AI Researcher',
          2000,
          'Full Stack Developer', 
          2000,
          'Content Creator',
          2000,
          'AI Educator',
          2000,
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        className="inline-block"
      />
    </div>
  );
};

export default TypedText;
