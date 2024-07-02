import styled from 'styled-components';
import { Row } from 'react-bootstrap';

export const Grid = styled('div')`
  height: 100vh;
  display: grid;
  width: 100vw !important;
  grid-template-columns: 250px auto;
  grid-template-rows: 64px auto;
  grid-template-areas:
    "Menu Header"
    "Menu Content";
`;

export const Content = styled('div')`
  height: calc(100vh - 130px);
  width: 100%;
  padding: 17px;
`;