import React from 'react';

export const Square = ({ color }) => {
  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path d="M.5 39.5V.5h39v39H.5z" stroke={color} />
    </svg>
  );
};

Square.defaultProps = {
  color: 'black',
};
