import * as React from 'react';
import styled from 'styled-components/macro';

const VideoWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const VideoPlayer = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  min-height: 280px;
`;

export const Video = (props) => {
  return (
    <VideoWrapper>
      <VideoPlayer controls>
        <source src={props.url} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoPlayer>
    </VideoWrapper>
  );
};


