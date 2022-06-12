import React from 'react';

export const ChevronUp = ({ color }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 11.6667L10 6.66669L5 11.6667" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

ChevronUp.defaultProps = {
  color: 'black',
};
