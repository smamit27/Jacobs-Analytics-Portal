import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import parse from 'html-react-parser';
import { colors } from '../../theme';
import { respCss } from '../../helper';

export const ContentWrapper = styled.div`
  line-height: 2rem;
  color: ${(props) => props.color};
  font-family: inherit;
  font-size: 1.6rem;
  line-height: 2.8rem;
  font-weight: 400;
  max-width: 700px;

  ${css`
    ${(props) => respCss('padding', props.padding)}
  `}

  ${css`
    ${(props) => respCss('display', props.padding)}
  `}
`;

export const Content = (props) => {
  const parsedContent = parse(props.body);

  return (
    <ContentWrapper color={props.color} padding={props.padding}>
      {parsedContent}
    </ContentWrapper>
  );
};

Content.defaultProps = {
  body: 'this is a default test. Please add some content',
  centered: false,
  color: colors.black,
};
