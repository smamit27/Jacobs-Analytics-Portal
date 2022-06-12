import Snackbar from '@material-ui/core/Snackbar';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Image } from '../atoms';

import { connect } from "react-redux";
import { closeSnackBar } from "../../redux/common/action";
import closemobile from "../../assets/images/icon__close__1x.png";
import closetablet from "../../assets/images/icon__close__2x.png";
import closedesktop from "../../assets/images/icon__close__3x.png";

const connectedProps = (state) => ({
  snackBarOption: state.common.snackBarOption,
});

const connectionActions = {
  closeSnackBar: closeSnackBar,
}

var connector = connect(connectedProps, connectionActions);

const SnackbarWrapper = styled.div`
    & .MuiSnackbarContent-root {
        background: #0A7DFF;
        border-radius: 0px;
    }

    & .MuiSnackbarContent-message {
        padding: 7px 50px 7px 0px;
        font-size: 16px;
        color: #fff;
    }

    .MuiSnackbar-anchorOriginTopCenter {
        top: 1px;
    }
`;

const ImageWrapper = styled.div`
    cursor: pointer;
`;

export const SnackBar = (props) => {
  const [state, setState] = useState(props.snackBarOption);

  const { message, open } = state;

  useEffect(() => {
    setState(props.snackBarOption)
  }, [props.snackBarOption])

  return (
    <SnackbarWrapper>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={props.closeSnackBar}
        message={message}
        action={
          <React.Fragment>
            <ImageWrapper onClick={() => props.closeSnackBar()}>
              <Image mobilesrcfile={closemobile} tabletsrcfile={closetablet} desktopsrcfile={closedesktop} height={'auto'} width={'20px'} />
            </ImageWrapper>
          </React.Fragment>
        }
      />
    </SnackbarWrapper>
  );
};

SnackBar.defaultProps = {
};

export default connector(SnackBar);

