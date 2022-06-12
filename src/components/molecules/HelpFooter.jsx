import React from 'react';
import styled from 'styled-components/macro';
import { Text, Image } from '../atoms';
import listFooter from "../../json/footer.json";
import helpmobile from "../../assets/images/icon__help__1x.png";
import helptablet from "../../assets/images/icon__help__2x.png";
import helpdesktop from "../../assets/images/icon__help__3x.png";
import { device } from '../../theme';

import { connect } from "react-redux";
import { toggleHelp } from "./../../redux/common/action";

const connectedProps = (state) => ({

});

const connectionActions = {
	toggleHelp: toggleHelp
}

var connector = connect(connectedProps, connectionActions);

const HelpWrapper = styled.div`
    background: #460F32;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 16px;
	justify-content: space-between;
	
	@media ${device.tablet} {
		padding-left: ${(props) => props.even ? '' : '40px'};
	}

	@media ${device.laptop} {
		padding-left: ${(props) => props.last ? '' : '40px'};
	}
`;

const HeadWrapper = styled.div` 
    font-size: 22px;
	width: 200px;
`;

const ContentWrapper = styled.div`
	font-size: 16px;
	padding-left: 40px;
	flex: 4;
	line-height: 20px;
	display: none;
	
	@media ${device.tablet} {
		display: block;
	}
`;

const HelpIconWrapper = styled.div`
	font-size: 16px;
	background: #D72850;
	display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
	width: 64px;
	cursor: pointer;

	@media ${device.tablet} {
		margin-left: 40px;
	}
`;

export const HelpFooter = (props) => {
	return <HelpWrapper>
		<HeadWrapper>
			<Text tag="p" text={listFooter.help.head} color="#fff" />
		</HeadWrapper>
		<ContentWrapper>
			<Text tag="p" text={listFooter.help.content} color="#fff" />
		</ContentWrapper>
		<HelpIconWrapper onClick={() => props.toggleHelp()}>
			<Image mobilesrcfile={helpmobile} tabletsrcfile={helptablet} desktopsrcfile={helpdesktop} height={'30px'} width={'auto'} />
		</HelpIconWrapper>
	</HelpWrapper>;
};

HelpFooter.defaultProps = {
};

export default connector(HelpFooter);
