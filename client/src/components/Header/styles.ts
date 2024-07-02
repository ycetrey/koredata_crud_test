import styled from "styled-components";

export const HeaderContainer = styled('div')`
  grid-area: Header;

  display: flex;
  flex-direction: row;

  background-color: ${(props) => props.theme["bg-header"]};
  width: 100%;

  align-items: center;
  position: relative;
  z-index: 3;
  justify-content: right;
  padding-right: 5px;
`;
