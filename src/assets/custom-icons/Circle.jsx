import React from 'react';

export const Circle = ({ color }) => {
  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path
        d="M20 .5C30.77.5 39.5 9.23 39.5 20S30.77 39.5 20 39.5.5 30.77.5 20 9.23.5 20 .5z"
        stroke={color}
      />
    </svg>
  );
};

Circle.defaultProps = {
  color: 'black',
};
