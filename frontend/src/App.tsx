import React from 'react';
import './App.css';
import styled from 'styled-components';
import Router from './Router';
import NavBar from './components/NavBar';

const StyledButton = styled.button`
  border: none;
  background-color: #000;
  color: #fff;
  padding: 10px 25px;
  margin: 10px;
  cursor: pointer;
`;

function App() {
  return (
    <div>
      <NavBar />
      <Router />
    </div>
  );
}

export default App;
