import React, { Component } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { NavLink, NavLinkProps } from 'react-router-dom';

const Nav = styled.nav`
  position: relative;
  width: 100%;
  height: 75px;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 20px;
  align-items: center;
`;

interface INavSectionProps {
  left?: number;
}

const NavSection = styled.div`
	margin-left: ${(props: INavSectionProps) => props.left && props.left}px;
	/* width : ${(props: INavSectionProps) => props.width && props.width}; */
`;

const NavTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #1e6aa7;
`;

const Icon = styled.i`
  margin-right: 5px;
`;

const NavTitleTag = styled.span`
  font-size: 0.9rem;
  letter-spacing: 0;
  margin-left: 5px;
`;

const Input = styled.input`
  border: none;
  padding: 15px 20px;
  width: 70vw;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 30px;
`;

const NavBarLink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  font-weight: 300;
`;

const CreatePostButton = styled(NavBarLink)`
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 25px;
  transition: all 0.5s;

  &:hover {
    background-color: #ff0000;
  }
`;

const UserButton = styled(NavBarLink)`
  /* border: 1px solid #1e6aa7; */
  /* padding: 5px 10px; */
  color: #000;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0 15px;
`;

const activeLinkStyle = {
  color: '#1e6aa7',
};

export default function NavBar() {
  return (
    <Nav>
      <NavSection>
        <NavBarLink exact to="/">
          <NavTitle>
            {' '}
            <Icon className="fas fa-meteor"></Icon>
            KOMIC
          </NavTitle>
        </NavBarLink>
      </NavSection>
      <NavSection left={30}>
        <Input type="text" placeholder="Search posts or clans" />
      </NavSection>
      <NavSection left={10}>
        <CreatePostButton exact to="/post/new">
          <Icon className="fas fa-plus"></Icon> Create Post
        </CreatePostButton>
        <UserButton exact to="/login" activeStyle={activeLinkStyle}>
          Login
        </UserButton>
        <UserButton exact to="/register" activeStyle={activeLinkStyle}>
          Sign Up
        </UserButton>
      </NavSection>
    </Nav>
  );
}
