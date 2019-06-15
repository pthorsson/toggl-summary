import React from 'react';
import styled from 'styled-components';
import { COLOR_GRAY } from 'config';
import { Container } from 'elements';

const Header: any = styled.header`
  width: 100%;
  background-color: ${COLOR_GRAY};
  margin-bottom: 20px;
`;

const Nav: any = styled.nav`
  display: flex;
`;

export const NavBar = () => (
  <Header>
    <Container>
      
    </Container>
  </Header>
);
