import React from 'react';
import styled from 'styled-components/macro';
import { Text } from '../atoms';
import { device, colors } from '../../theme';
const ContentSection = styled.div`
	display: block;
	padding: 0px;
	padding-bottom: 40px;

	&.tiny-padding {
		padding-bottom: 20px !important;
	}
	@media ${device.tablet} {
		padding: 0px 25px;
       flex-wrap: wrap;
	   display: flex;
    }
	@media ${device.laptop} {
		padding: 0px 0px;
		flex-wrap: nowrap;
		justify-content: center;
	 }
`;

const TableSection = styled.div`
	padding: 20px 0px 0px 0px;
	margin-bottom: 20px;
	min-width: inherit;
	@media ${device.tablet} {
		padding: 0px 0px 0px 0px;
		min-width: 400px;
	 }
`;

const TableWrapper = styled.div`
	
`;

const TableItem = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 5px 0px 5px;
	border-bottom: 1px solid #A5A5A5;
	font-size: 14px;
	color: #010101;
	font-weight: normal;

	span:nth-child(2){
		width:70%;
	}
	a:nth-child(2){
		width:70%;
	}
	
	&.table-item-answer {
		font-weight: bold;
	}
`;

const TableHead = styled.div`
	font-size: 16px;
	line-height: 20px;
	color: #010101;
	padding: 14px 0px;
	font-weight: 600;
	border-bottom: 1px solid ${colors.primary.themep4};
`
const AnchorTagLink = styled.a`
 	&:hover{
		text-decoration: underline;
	}
`;


export const RequestAccess = (props) => {
	const requestAccess = props;
	return <div>
				<ContentSection>
					<TableSection>
						<TableHead>
							<Text text="Request Access Details" />
						</TableHead>
						<TableWrapper>
							<TableItem>
								<Text text="Long Description " />
								<Text bold="600" text={requestAccess.child?.LongDesc} />
							</TableItem>
							<TableItem>
								<Text text="Short Description" />
								<Text bold="600" text={requestAccess.child?.ShortDesc} />
							</TableItem>
							<TableItem>
								<Text text="Help Url" />
								<AnchorTagLink target="_blank" href={`${requestAccess.child?.HelpUrl} `}>
								{requestAccess.child?.HelpUrl} 
								</AnchorTagLink>
							</TableItem>
							<TableItem>
								<Text text="Url" />
								<AnchorTagLink target="_blank" href={`${requestAccess.child?.Url}`}>
								{requestAccess.child?.Url}
								</AnchorTagLink>
							</TableItem>
						</TableWrapper>
					</TableSection>
				</ContentSection>
	</div>
};

RequestAccess.defaultProps = {
};

export default RequestAccess