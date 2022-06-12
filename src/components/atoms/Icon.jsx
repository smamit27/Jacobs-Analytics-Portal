import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { respCss } from '../../helper';
import {
  Arrow, Circle, Triangle, Square,
  Lock, ChevronDown, Select, ChevronUp,
  Close, Folder, Move, OpenFilter,
  Carousel, GridView, ListView,
  Search, Settings, Notification,
  UserProfile, ChevronRight, Link,
  ChevronLeft, JacobsIcon,Expand,
  Favorites,FavSelected,Maximize
} from '../../assets/custom-icons';

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => (props.mr ? `${props.mr}px` : 0)};
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : 0)};
  width: 24px;
  height: 24px;

  ${css`
    ${(props) => respCss('height', props.height)}
  `}

  ${css`
    ${(props) => respCss('width', props.width)}
  `}

  svg {
    display: block;
    width: 100%;
  }
`;

export const Icon = (props) => {
  const components = {
    arrow: Arrow,
    circle: Circle,
    triangle: Triangle,
    square: Square,
    lock: Lock,
    chevrondown: ChevronDown,
    select: Select,
    chevronup: ChevronUp,
    close: Close,
    folder: Folder,
    move: Move,
    openfilter: OpenFilter,
    carousel: Carousel,
    gridview: GridView,
    listview: ListView,
    search: Search,
    settings: Settings,
    notification: Notification,
    userprofile: UserProfile,
    chevronright: ChevronRight,
    link: Link,
    chevronleft: ChevronLeft,
    jacobs: JacobsIcon,
    expand: Expand,
    favorites: Favorites,
    favSelected:FavSelected,
    maximize: Maximize
  };

  const Icons = components[props.name];

  return (
    <IconWrapper
      mt={props.mt}
      mr={props.mr}
      ml={props.ml}
      width={props.width}
      height={props.height}
    >
      <Icons {...props} />
    </IconWrapper>
  );
};

Icon.defaultProps = {
  height: '24px',
  width: '24px',
};
