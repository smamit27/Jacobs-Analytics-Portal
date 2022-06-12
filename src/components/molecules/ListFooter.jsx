import React from 'react';
import styled from 'styled-components/macro';
import { Text } from '../atoms';
import { device } from '../../theme';
import { connect } from "react-redux";
import { resetNotifyMeFetch } from "./../../redux/common/action";
import { colors} from '../../theme';

const connectedProps = (state) => ({
  user: state
});

const connectionActions = {
  resetNotifyMeFetch: resetNotifyMeFetch
}

var connector = connect(connectedProps, connectionActions);

const ListFooterWrapper = styled.div`
    flex: 1;
    min-width: 230px;
`;

const TextWrapper = styled.div`
    font-weight: 600;
    font-size: 16px;
    margin-right: 0px;
    margin-top: 20px;
    margin-bottom: 10px;
    color: #fff;
    border-bottom:1px solid ${colors.primary.themep4};

    @media ${device.tablet} {
      margin-right: ${(props) => props.even === 0 ? '24px': ''};
    }
  
    @media ${device.laptop} {
      margin-right: ${(props) => props.last ? '': '24px'};
    }
`;

const ItemSection = styled.div`
    font-size: 16px;
    margin-right: 0px;
    margin-bottom: 10px;
    border-bottom:1px solid #A5A5A5;

    @media ${device.tablet} {
      margin-right: ${(props) => props.even === 0 ? '24px': ''};
    }
  
    @media ${device.laptop} {
      margin-right: ${(props) => props.last ? '': '24px'};
    }
`;

const ListFooter = (props) => {
  return <ListFooterWrapper>
        <TextWrapper even={props.index % 2} last={props.list?.length === props.index + 1}>
          <Text tag="p" text={props.head} color="#fff"/> 
        </TextWrapper>
        { props.list.map((item, index) => <ItemSection key={index} even={props.index % 2} last={props.list?.length === props.index + 1}>
          <Text tag="p" text={item.label} color="#fff"/>
        </ItemSection>)}
  </ListFooterWrapper>;
};

ListFooter.defaultProps = {
};

export default connector(ListFooter);

