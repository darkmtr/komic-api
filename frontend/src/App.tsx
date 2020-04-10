import React from 'react';
import './App.css';
import styled from 'styled-components';

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
      <h1>hello</h1>
      <StyledButton>CLICK ME</StyledButton>
    </div>
  );
}

export default App;
