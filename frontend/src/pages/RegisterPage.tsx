import React, { useState } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

import ConnectSvg from '../assets/svg/connect.svg';
import ClanSvg from '../assets/svg/clan.svg';
import ModsSvg from '../assets/svg/mods.svg';
import ProfileSvg from '../assets/svg/profile.svg';

const Section = styled.section`
  margin: 10px 20px;
  padding: 20px 30px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  /* border: 1px solid #000; */
  text-align: center;
  height: 60vh;
  padding: 30px 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 25px;
`;

const GridItem = styled.div`
  padding: 15px;
`;

interface TitleProps {
  size?: number;
  align?: string;
  capitalize?: boolean;
}

const Title = styled.h2<TitleProps>`
  font-weight: bold;
  font-size: ${props => props.size}rem;
  text-transform: ${props => props.capitalize && 'capitalize'};
  text-align: ${props => props.align && props.align};
  position: relative;
`;

const Form = styled.form`
  margin-top: 25px;
  padding: 5px 30px;
  text-align: initial;
`;

const Label = styled.label`
  font-weight: 300;
  font-size: 1.3rem;
  display: block;
`;

const Input = styled.input`
  margin: 5px 0px;
  padding: 10px 20px;
  width: 100%;
  outline: none;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:first-child {
    margin-top: 20px;
    margin-bottom: 5px;
  }
`;

const List = styled.ul`
  list-style: none;
  text-align: left;
`;

const ListItem = styled.li`
  margin: 15px 0;
  display: flex;
  align-items: center;
`;

const ListItemText = styled.p`
  font-size: bold;
`;

const SvgIcon = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

const SubText = styled.p`
  font-style: italic;
  font-size: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CreateButton = styled.button`
  padding: 10px 20px;
  margin: 20px 0px;
  background-color: #000;
  color: #fff;
  font-size: 0.9rem;
  border: none;
  outline: none;
  font-weight: bold;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
`;

const CheckButton = styled.a`
  text-decoration: none;
  color: #000;
  font-style: italic;
  font-weight: 500;
  font-size: 0.7rem;
  cursor: pointer;
`;

export default function RegisterPage() {
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    url: '',
  });

  const [getUrlStatus, { loading, data }] = useLazyQuery(
    FETCH_URL_AVAILABILITY
  );

  console.log(data);

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const checkUrl = e => {
    getUrlStatus({ variables: { url: values.url } });
  };

  return (
    <Section>
      <Container>
        <GridContainer>
          <GridItem>
            <Title size={1.7} align={'left'}>
              Become a meme connoisseur today by joining the league of elites.
            </Title>
            <List>
              <ListItem>
                <SvgIcon src={ConnectSvg} />
                <ListItemText>
                  <strong>Connect with users around the globe.</strong> share
                  your creativity and get appreciated for your work.
                </ListItemText>
              </ListItem>
              <ListItem>
                <SvgIcon src={ClanSvg} />
                <ListItemText>
                  <strong>
                    Create communities called <em>clans</em>.
                  </strong>{' '}
                  Share posts, memes, videos and debate till dusk.
                </ListItemText>
              </ListItem>
              <ListItem>
                <SvgIcon src={ModsSvg} />
                <ListItemText>
                  <strong>
                    Moderate <em>clans</em>.
                  </strong>{' '}
                  Keep your clan safe from trolls, fake news by banning/pruning
                  users.
                </ListItemText>
              </ListItem>
              <ListItem>
                <SvgIcon src={ProfileSvg} />
                <ListItemText>
                  <strong>
                    Build your <em>social profile</em>.
                  </strong>{' '}
                  Earn + rep from users and commend other users for their work.
                </ListItemText>
              </ListItem>
            </List>
          </GridItem>

          <GridItem>
            <Title size={2.3} capitalize={true}>
              Join Komic
            </Title>
            <SubText>Join {1000} other users in building a community.</SubText>
            <Form>
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="URL Slug"
                name="url"
                value={values.url}
                onChange={handleChange}
              />
              <CheckButton onClick={checkUrl}>
                Check URL availabilty
              </CheckButton>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <ButtonContainer>
                <CreateButton>Create Account</CreateButton>
              </ButtonContainer>
            </Form>
          </GridItem>
        </GridContainer>
      </Container>
    </Section>
  );
}

const FETCH_URL_AVAILABILITY = gql`
  query checkUserSlugAvailability($url: String!) {
    checkUserSlugAvailability(url: $url) {
      code
      message
    }
  }
`;
