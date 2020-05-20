import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import colors from './resources/colors';
import Prenav from './components/Prenav';
import MainNavigation from './components/MainNavigation';
import Router from './components/Router';
import Footer from './components/Footer';

document.body.style.backgroundColor = colors.page.background;

const Clearfix = styled.div`
  clear: both;
`;
const PageContainer = styled(Container)`
  background-color: transparent;
  color: ${() => colors.page.text};
`;

function App() {
  return (
    <PageContainer>
      <BrowserRouter>
        <Prenav />
        <MainNavigation />
        <Router />
        <Clearfix />
        <Footer />
      </BrowserRouter>
    </PageContainer>
  );
}

export default App;
