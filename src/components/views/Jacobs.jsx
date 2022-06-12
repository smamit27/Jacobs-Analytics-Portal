import React from 'react';
import styled from 'styled-components/macro';
import { Filter, Main, SnackBar } from "./../molecules";
import { Header, Footer, Settings, Preview, UserProfile, Notifications } from "./../organisms";
import { useSelector } from "react-redux";

const PageWrapper = styled.div`
min-height:100vh;
display:flex;
flex-direction:column;
justify-content:space-between;
`;

export const Jacobs = (props) => {
  const { preview, settingsOpen, userProfile, notifications } = useSelector(({ common, filter }) => ({ ...common, ...filter }))

  return <PageWrapper>
    <div>
      {preview && <Preview />}
      {!preview && <>
        <Header />
        {settingsOpen && <Settings />}
        {userProfile && <UserProfile />}
        <Notifications />
      </>}
      <Filter />
      {/* <CategoryFilter /> */}
      <Main />
      <SnackBar />
    </div>
    <Footer />
  </PageWrapper>;
};

Jacobs.defaultProps = {
  selected: false,
};

export default Jacobs;