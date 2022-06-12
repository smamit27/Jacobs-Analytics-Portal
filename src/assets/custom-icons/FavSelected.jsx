import React from 'react';

export const FavSelected = ({ color }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.0003 1.91675L12.5753 7.13341L18.3337 7.97508L14.167 12.0334L15.1503 17.7667L10.0003 15.0584L4.85033 17.7667L5.83366 12.0334L1.66699 7.97508L7.42533 7.13341L10.0003 1.91675Z"
        fill={color}
        stroke="#000000"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

FavSelected.defaultProps = {
  color: '#FFC83D',
};
