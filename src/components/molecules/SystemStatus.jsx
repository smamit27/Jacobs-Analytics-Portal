import React,{useState} from 'react';
import styled from 'styled-components/macro';
import { Text } from '../atoms';
import { device, colors } from '../../theme';
import dayjs from 'dayjs';
import { filter } from 'lodash';

export const SystemStatusWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #FDFDFD;
  padding: 25px 40px 25px;
  border-top: solid 1px ${colors.black};
  @media ${device.mobile} {
    padding: 25px 15px;
  }
  @media ${device.tablet} {
    padding: 25px 40px 25px;
  }

`;

export const LeftWrapper = styled.div`
`;

export const RightWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const HeadingWrapper = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

export const ParaWrapper = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #D72850;
`;

export const ButtonWrapper = styled.button`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  align-items: flex-end;
  text-align: center;
  letter-spacing: 0.01em;
  // text-transform: uppercase;
  color: ${colors.primary.themep4};
  border: solid 1px ${colors.black};
  padding: 15px;
  cursor: pointer;
  &:hover{
    background: #ffffff;
  }
`;
const ContentSection = styled.div`
	display: block;
	padding: 0px;
	padding-bottom: 40px;
  background:#FDFDFD;
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
  @media ${device.mobile} {
		padding: 15px;
	 }
	@media ${device.tablet} {
		padding: 20px 25px;
		width: 100%;
	 }
   @media ${device.laptop} {
		padding: 25px 40px 45px;
		width: 55%;
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
    width: 50%;
    text-align: right;
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



export const SystemStatus = (props) => {
  const[viewHistory,setViewHistory] = useState(false);
  const subjectAreaList = props.systemDateTime.filter(area => (area.SubjectArea !== 'General Ledger' && area.SubjectArea !== 'Supply Chain Management'));

  return (
    <>
    <SystemStatusWrapper>
      <LeftWrapper>
        <HeadingWrapper>Refresh Status</HeadingWrapper>
        {/* <ParaWrapper>Analytics Live Update </ParaWrapper> */}
      </LeftWrapper>
      <RightWrapper>
        <ButtonWrapper onClick={() => setViewHistory(!viewHistory)}>{viewHistory ? 'Hide' : 'View'} Refresh History</ButtonWrapper>
      </RightWrapper>

    </SystemStatusWrapper>
{viewHistory &&(
    <ContentSection>
					<TableSection>
						{/* <TableHead>
							<Text text="Last Refresh Client & Project Analytics: Date & time " />
						</TableHead> */}
						<TableWrapper>
            { subjectAreaList.length > 0 && subjectAreaList.map((child, childIndex) =>(
							<TableItem key={childIndex}>
								<Text text={`Last Refresh (PST) ${child.SubjectArea}`} />
								<Text bold="600" text={`${dayjs(child?.LastRefreshDate).format('dddd, MMMM D, YYYY h:mm A')}`} />
							</TableItem>
            ))}
						</TableWrapper>
					</TableSection>
				</ContentSection>
  )}
        </>
  );
};

SystemStatus.defaultProps = {

};

SystemStatus.defaultProps = {};

export default SystemStatus;
