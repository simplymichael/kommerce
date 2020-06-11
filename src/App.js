import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import colors from './resources/colors';
import Router from './components/Router';

document.body.style.backgroundColor = colors.page.background;

const PageContainer = styled(Container)`
  background-color: transparent;
  color: ${() => colors.page.text};
`;

function App() {
  return (
    <PageContainer>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </PageContainer>
  );
}

export default App;
