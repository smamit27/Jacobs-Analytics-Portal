import React from 'react';

export const ChevronRight = ({ color }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33398 15L13.334 10L8.33398 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

ChevronRight.defaultProps = {
  color: 'black',
};
