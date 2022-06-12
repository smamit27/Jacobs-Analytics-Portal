import React from 'react';

export const Favorites = ({ color }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 18" fill='none' xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.0003 0.916748L12.5753 6.13341L18.3337 6.97508L14.167 11.0334L15.1503 16.7667L10.0003 14.0584L4.85033 16.7667L5.83366 11.0334L1.66699 6.97508L7.42533 6.13341L10.0003 0.916748Z"
        stroke="#767676"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Favorites.defaultProps = {
  color: '#767676',
};
