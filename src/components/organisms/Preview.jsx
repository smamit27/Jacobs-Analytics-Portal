import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Text, Image,Icon, Modal } from '../atoms';
import favmobile from "../../assets/images/icon__fav__1x.png";
import favtablet from "../../assets/images/icon__fav__2x.png";
import favdesktop from "../../assets/images/icon__fav__3x.png";
import favmobileselected from '../../assets/images/icon__fav__selected_1x.png'
import favtabletselected from '../../assets/images/icon__fav__selected_2x.png'
import favdesktopselected from '../../assets/images/icon__fav__selected_3x.png'
import closemobile from "../../assets/images/icon__close__1x.png";
import closetablet from "../../assets/images/icon__close__2x.png";
import closedesktop from "../../assets/images/icon__close__3x.png";
import { BannerListWrapper } from '../molecules/Banner';
import { device, colors, textSize } from '../../theme';
import { useDispatch, useSelector } from "react-redux";
import { hidePreview, toggleFavourite } from '../../redux/common/action'
import {RequestAccess} from '../organisms';
import { connect } from 'react-redux';
import { getReportAccess} from '../../redux/common/action';

const connectedProps = (state) => ({
	user: state,
	reportAccessList: state.common.reportAccessList,

  });
  const connectionActions = {
	getReportAccess: getReportAccess
  }
  
  var connector = connect(connectedProps, connectionActions);


const PreviewWrapper = styled.div`
	display: flex;
`;

const Head = styled.div`
	color: #010101;
	font-weight: bold;
	font-size: 30px;
	flex: 1;
	padding: 32px 25px;
	margin-left: 0px;
	margin-top: 35px;
	@media ${device.tablet} {
		margin-top: 0px;
		margin-left: 0px; 

	}
	@media ${device.laptop} {
		margin-top: 0px;
		margin-left: 16%; 
	}
`;

const ImageWrapper = styled.div`
	padding: 6px;
	cursor: pointer;
	margin: 2px;
`;

const PreviewAction = styled.div`
	display: flex;
	padding: 20px 25px; 
	position: absolute;
	right: 0px;
	@media ${device.tablet} {
		position: relative;
	}
`;

const HeadSection = styled.div`
	display: flex;
`;

const ContentSection = styled.div`
	display: block;
	padding: 0px 25px;
	padding-bottom: 40px;

	&.tiny-padding {
		padding-bottom: 20px !important;
	}
	@media ${device.tablet} {
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
		padding: 0px 30px 0px 0px;
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
	span:nth-child(2){
		width:50%;
		text-align:right;
	}
	& .table-item-answer {
		font-weight: bold;
	}
`;

const Description = styled.div`
	font-size: 16px;
	line-height: 20px;
	color: #000;
    padding-top: 16px;
	@media ${device.laptop} {
		padding-top: 40px;
	 }
`

const OutlineButton = styled.a`
  color: ${colors.black};
  border: 1px solid ${colors.black};
  padding: 15px;
  background-color:{colors.white};
  font-size: ${textSize.body2.desktop};
  display: flex;
  margin-right:5px;
  text-align:center;
  align-items: center;
  justify-content:center;
  position: relative;
  cursor: pointer;
  opacity: 1;
  &.cursor-disabled {
	pointer-events: none;
	cursor: not-allowed;
	opacity: 0.4;
	background: #f8f8f8;
  }

  @media ${device.mobile} {
	width:100%;
 }

  @media ${device.tablet} {
	width:100%;
 }
 @media ${device.laptop} {
	width:63%;
 }
 
`
const ReportlineButton = styled.span`
color: ${colors.black};
  border: 1px solid ${colors.black};
  padding: 15px;
  background-color:{colors.white};
  font-size: ${textSize.body2.desktop};
  display: flex;
  margin-right:5px;
  text-align:center;
  align-items: center;
  justify-content:center;
  position: relative;
  cursor: pointer;
  opacity: 1;
  &.cursor-disabled {
	pointer-events: none;
	cursor: not-allowed;
	opacity: 0.4;
	background: #f8f8f8;
  }

  @media ${device.mobile} {
	width:100%;
 }

  @media ${device.tablet} {
	width:100%;
 }
 @media ${device.laptop} {
	width:63%;
 }

`

const TableHead = styled.div`
	font-size: 16px;
	line-height: 20px;
	color: #010101;
	padding: 14px 0px;
	font-weight: 600;
	border-bottom: 1px solid ${colors.primary.themep4};
`

const ScreenWrapper = styled.div`
	border: 1px solid #ddd;
	margin-top: 10px;
	margin-right: 0px;
	img {
		width: 100%;
	}
	@media ${device.tablet} {
		margin-right: 30px;
		img {
			width: 250px;
		}
	 }

	 @media ${device.laptop} {
		margin-right: 30px;

		img {
			width: 300px;
		}
	 }
`

const PreviewImage = styled.a`
	text-decoration:none;
`

const CloseButton = styled.div`
    position:absolute;
    right: 10px;
    background-color:${colors.white};
    top: 10px;
    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    height:24px;
    border-radius:50%;
    padding:8px;
    box-sizing:border-box;
`

const RequestModalWrapper = styled.span`
    display: flex;
    width: 100%;
    font-weight:bold;
    align-items: center; 
    justify-content: center;
    margin-top:10px;

    @media ${device.tablet} {
        margin-top:10%;
    }

	 @media ${device.laptop} {
        margin-top:10%;
	 } 
`

const RequestModalContent = styled.span`
    position:relative;
    background-color:${colors.white};
    padding:20px 20px;
    color:${colors.black};
    display: flex; 
    justify-content: center; 
    align-items: center;

    h4{
        font-weight:bold;
        font-size:1.4em;
    }

    @media ${device.mobile} {
        width: 90%;
        }
    @media ${device.tablet} {
        width:80%;
        }
    @media ${device.laptop} {
        width:50%;
    }`

const Preview = (props) => {
	const dispatch = useDispatch()
	const { previewData, scrollValue } = useSelector(({ common }) => common)
	const [modalStatus, setModalStatus,] = useState(false)
	const [imageUrl, setImageUrl] = useState(null)
	const handleClosePreview = () => {

		window.scrollTo({
			top: scrollValue,
			left: 0,
			behavior: 'smooth'
		});
		dispatch(hidePreview())
	}
	const previewReportUrl = (e,child) =>{
		if(previewData?.AccessFlg === 'N') {
			props.getReportAccess(child);
			setModalStatus(true);
		}
	}


	useEffect(() => {
		if (previewData?.imageUrl !== "") {
			setImageUrl(previewData?.ImageURL)
		} else {
			setImageUrl(null)
		}
	}, [previewData?.ImageURL])


	return <div>
		<PreviewWrapper>
			<BannerListWrapper>
				<HeadSection>
					<Head>
						<Text text={previewData?.ReportName} />
					</Head>
					<PreviewAction>
						<ImageWrapper onClick={() => dispatch(toggleFavourite(previewData, true))}>
						{previewData?.IsFavFlg === "Y" ? (<Icon name={'favSelected'} />) : (<Icon name={'favorites'} />)}
						</ImageWrapper>
						<ImageWrapper onClick={() => handleClosePreview()}>
						<Icon name={'close'} color='#c8c8c8'/>
						</ImageWrapper>
					</PreviewAction>
				</HeadSection>
				<ContentSection>
					<div>
						<ScreenWrapper>
							<PreviewImage href={imageUrl} target="_blank">
								<img src={previewData?.ImageURL} onError={(e) => {
									setImageUrl(false)
									e.target.src = "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
								}} alt={previewData?.ReportName} height={'auto'} width={'300px'} />
							</PreviewImage>
						</ScreenWrapper>
					</div>
					<TableSection>
						<TableHead>
							<Text text="Report Details" />
						</TableHead>
						<TableWrapper>
							<TableItem>
								<Text text="Key Users" />
								<Text bold="600" text={previewData?.KeyUsers} />
							</TableItem>
							<TableItem>
								<Text text="Key Metrics" />
								<Text bold="600" text={previewData?.KeyMetrics} />
							</TableItem>
							<TableItem>
								<Text text="Source of Data" />
								<Text bold="600" text={previewData?.SrcSystemName} />
							</TableItem>
							<TableItem>
								<Text text="Data Refresh Frequency" />
								<Text bold="600" text={previewData?.DataRefreshFrequency} />
							</TableItem>
						</TableWrapper>
					</TableSection>
					<Description>
						<Text text={previewData?.ReportDesc}></Text>
					</Description>

				</ContentSection>
				{
					(previewData?.ReportURL !== "")
					&& <ContentSection className="tiny-padding">
						<ReportlineButton onClick={(e)=> previewReportUrl(e,previewData?.AccessTypeId)}>Open Report</ReportlineButton>
					</ContentSection>
				}
				{
					(previewData?.WikiURL !== "")
					&& <ContentSection className="tiny-padding">
						<OutlineButton href={previewData?.WikiURL} target="_blank">Open Wiki Document</OutlineButton>
					</ContentSection>
				}
				
			</BannerListWrapper>

			<BannerListWrapper></BannerListWrapper>
			<BannerListWrapper></BannerListWrapper>
		</PreviewWrapper>
		{modalStatus && props.reportAccessList.length > 0 && props.reportAccessList.map((child, childIndex) => (
			<Modal modalStatus={modalStatus} handleModal={setModalStatus}>
			<RequestModalWrapper >
						<RequestModalContent>
							<CloseButton onClick={() => setModalStatus(false)}>
								  <Icon name="close" ></Icon>
							</CloseButton>
							<RequestAccess child={child}/>
	
						</RequestModalContent>
				</RequestModalWrapper>
			</Modal>
		))}
		
	</div>
};

Preview.defaultProps = {
};

export default connector(Preview);