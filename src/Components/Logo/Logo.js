import React from 'react';
import { NavLink } from 'react-router-dom';

const style = {
  padding: '1.75rem 2rem',
  fontSize: '2rem',
  lineHeight: '2rem',
  fontFamily: 'Inconsolata',
  color: '#212529',
  display: 'block',
  position: 'relative',
};

const Logo = () => (
  <NavLink exact to="/" style={style}>
    Junpic
  </NavLink>
);

export default Logo;
