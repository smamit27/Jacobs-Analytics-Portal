import React from 'react';

export const Triangle = ({ color }) => {
  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path d="M1.207 39.5L39.5 1.207V39.5H1.207z" stroke={color} />
    </svg>
  );
};

Triangle.defaultProps = {
  color: 'black',
};
