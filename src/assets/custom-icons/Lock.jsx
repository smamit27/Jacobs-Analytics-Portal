import React from 'react';

export const Lock = ({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
      <path fill={color} d="M44,37H4v5c0,1.105,0.895,2,2,2h36c1.105,0,2-0.895,2-2V37z"></path>
      <path
        fill="#000000"
        stroke="#000000"
        d="M11,13v3h4v-3c0-4.971,4.029-9,9-9h0c4.971,0,9,4.029,9,9v3h4v-3c0-7.18-5.82-13-13-13h0 C16.82,0,11,5.82,11,13z"
      ></path>
      <path fill={color} d="M44,23H4v-5c0-1.105,0.895-2,2-2h36c1.105,0,2,0.895,2,2V23z"></path>
      <rect width="40" height="7" x="4" y="23" fill={color}></rect>
      <rect width="40" height="7" x="4" y="30" fill={color}></rect>
      <path
        fill="#ffffff"
        d="M27,29c0-1.657-1.343-3-3-3s-3,1.343-3,3c0,1.304,0.837,2.403,2,2.816V35c0,0.552,0.448,1,1,1 s1-0.448,1-1v-3.184C26.163,31.403,27,30.304,27,29z"
      ></path>
    </svg>
  );
};

Lock.defaultProps = {
  color: '#FFC83D',
};
