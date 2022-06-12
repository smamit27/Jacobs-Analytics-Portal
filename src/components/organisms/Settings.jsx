import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button, Text, Image } from './../atoms';
import { colors, device } from '../../theme';
import settings from "../../json/settings.json";

import screenshotdesktop from "../../assets/images/banner__image__5__1x.png";

import { useDispatch } from "react-redux";
import { toggleSettings } from "./../../redux/common/action";


const SettingsWrapper = styled.section`
  background: ${colors.black};
  position: absolute;
  top: 80px;
  width: 100%;
  height: calc(100% - 96px);
  padding: 25px 15px;
  right: 0;
  z-index: 3;
  @media only screen and ${device.mobileL} {
    width: 375px;
    top: 96px;
  }
`

const HeadingWrapper = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: ${colors.primary.n5};
  display: flex;
  justify-content: space-between;
  align-items: center;
  button{
    padding-left: 0;
    padding-right: 0;
  }
`

const KpilistContWrapper = styled.div`
  &.no--border > div:first-child{
    border-top: 0;
  }
`

const KpilistHeadingWrapper = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: ${colors.primary.n5};
  margin: 30px 0 15px;
`

const KpilistWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: solid 1px ${colors.primary.themep3};
  flex-wrap: wrap;
  button{
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    text-transform: none;
    &:first-child{
      div{
        margin-right: 10px;
      }
    }
  }
`

const KpibtnWrapper = styled.div`
  button{
    width: 100%;
    justify-content: center;
  }
`
const ImageListWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 10px;
  picture{
    width: calc(50% - 5px);
  }
`

const ExpandCollapseWrapper = styled.div`
  button{
    width: auto!important;
    div{
      margin-right: 0!important;
    }
  }
`

const SelectkpiWrapper = styled.div`
  width: 75%;
`

export const Settings = (props) => {
  const dispatch = useDispatch()

  const [showhide, setShowhide] = useState({ kpi: {} });
  const expandCollapse = (index) => {
    let oldValue = showhide;
    oldValue.kpi[index] = !oldValue.kpi[index];
    setShowhide({
      kpi: oldValue.kpi
    });
  }

  const [settingData, setSettingData] = useState(settings);
  const selectKpi = (index, subindex) => {
    let oldValue = settingData;
    oldValue.list[index].kpilist[subindex].selected = !oldValue.list[index].kpilist[subindex].selected;
    setSettingData({
      heading: oldValue.heading,
      list: oldValue.list
    });
  }

  const [showMore, setShowMore] = useState({ kpi: {} });
  const showMoreKpi = (index) => {
    let oldValue = showMore;
    oldValue.kpi[index] = !oldValue.kpi[index];
    setShowMore({
      kpi: oldValue.kpi
    });
  };
  return <SettingsWrapper>
    <HeadingWrapper>
      <Text tag="h3" text={settingData.heading} color={colors.primary.n5} />
      <div onClick={() => dispatch(toggleSettings())}>
        <Button text="" icon="close" bg={colors.transparent} iconcolor={colors.white} />
      </div>
    </HeadingWrapper>
    {settingData.list.map((item, index) =>
      <KpilistContWrapper className={item.heading ? "" : "no--border"} key={index}>{
        item.heading &&
        <KpilistHeadingWrapper>
          <Text tag="h4" text={item.heading} color={colors.primary.n5} />
        </KpilistHeadingWrapper>
      }
        {item.kpilist.map((subitem, subindex) =>
          <KpilistWrapper key={subindex}>
            {
              (index !== 1 && subindex < 4) &&
              <>
                <SelectkpiWrapper onClick={() => selectKpi(index, subindex)}>
                  <Button text={subitem.type} icon="select" bg={colors.transparent} color={colors.primary.n5} opacity="1" iconcolor={subitem.selected ? colors.primary.n5 : colors.primary.n1} />
                </SelectkpiWrapper>
                {
                  subitem.folder &&
                  <Button text="" icon="folder" bg={colors.transparent} iconcolor={colors.primary.n5} />
                }
                {
                  index === 0 &&
                  <ExpandCollapseWrapper onClick={() => expandCollapse(subindex)}>
                    <Button text="" icon={showhide.kpi[subindex] ? 'chevronup' : 'chevrondown'} bg={colors.transparent} iconcolor={colors.primary.n5} />
                  </ExpandCollapseWrapper>
                }
                {
                  index > 0 &&
                  <Button text="" icon="move" bg={colors.transparent} iconcolor={colors.primary.n5} />
                }
                {
                  showhide.kpi[subindex] &&
                  <ImageListWrapper>
                    <Image mobilesrcfile={screenshotdesktop} tabletsrcfile={screenshotdesktop} desktopsrcfile={screenshotdesktop} />
                    <Image mobilesrcfile={screenshotdesktop} tabletsrcfile={screenshotdesktop} desktopsrcfile={screenshotdesktop} />
                  </ImageListWrapper>
                }
              </>
            }
            {
              (index !== 1 && showMore.kpi[index] && subindex >= 4) &&
              <>
                <SelectkpiWrapper onClick={() => selectKpi(index, subindex)}>
                  <Button text={subitem.type} icon="select" bg={colors.transparent} color={colors.primary.n5} opacity="1" iconcolor={subitem.selected ? colors.primary.n5 : colors.primary.n1} />
                </SelectkpiWrapper>
                {
                  subitem.folder &&
                  <Button text="" icon="folder" bg={colors.transparent} iconcolor={colors.primary.n5} />
                }
                {
                  index === 0 &&
                  <ExpandCollapseWrapper onClick={() => expandCollapse(subindex)}>
                    <Button text="" icon={showhide.kpi[subindex] ? 'chevronup' : 'chevrondown'} bg={colors.transparent} iconcolor={colors.primary.n5} />
                  </ExpandCollapseWrapper>
                }
                {
                  index > 0 &&
                  <Button text="" icon="move" bg={colors.transparent} iconcolor={colors.primary.n5} />
                }
                {
                  showhide.kpi[subindex] &&
                  <ImageListWrapper>
                    <Image mobilesrcfile={screenshotdesktop} tabletsrcfile={screenshotdesktop} desktopsrcfile={screenshotdesktop} />
                  </ImageListWrapper>
                }
              </>
            }
          </KpilistWrapper>
        )}
        {
          index !== 1 &&
          <KpibtnWrapper>
            <div onClick={() => showMoreKpi(index)}>
              <Button text={showMore.kpi[index] ? 'Show Less' : 'Show MORE'} bg={colors.transparent} color={colors.primary.themep4} />
            </div>
            <div onClick={() => dispatch(toggleSettings())}>
              <Button text="Save Changes" bg={colors.primary.themep4} color={colors.primary.themep3} />
            </div>
          </KpibtnWrapper>
        }
        {
          index === 1 &&
          <KpibtnWrapper>
            <Button text="Add a folder" bg={colors.transparent} color={colors.primary.themep3} />
          </KpibtnWrapper>
        }
      </KpilistContWrapper>
    )}

  </SettingsWrapper>;
};

Settings.defaultProps = {
};

export default Settings;