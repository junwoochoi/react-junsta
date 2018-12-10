import React, { Component } from 'react';
import SideBar from '../../Components/SideBar';
import Logo from '../../Components/Logo';
import './SideBarContainer.scss';

class SideBarContainer extends Component {
  render() {
    return (
      <div className="sidebar">
        <Logo />
        <SideBar />
      </div>
    );
  }
}

export default SideBarContainer;
