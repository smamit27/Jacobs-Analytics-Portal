import React from 'react';

export const ChevronDown = ({ color }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 8.33331L10 13.3333L15 8.33331" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

ChevronDown.defaultProps = {
  color: 'black',
};
