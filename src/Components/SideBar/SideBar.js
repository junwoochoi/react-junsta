import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import { Gallery, Notes, FormFilter } from 'grommet-icons';

const icon = {
  marginRight: '12px',
  fill: 'currentcolor',
};

const SideBar = () => (
  <div className="sidebar-wrapper">
    <NavLink exact to="/" className="sidebar-item" activeClassName="active">
      <Notes style={icon} />
      뉴스 피드
    </NavLink>
    <NavLink to="/all" className="sidebar-item" activeClassName="active">
      <Gallery style={icon} />
      전부 보기
    </NavLink>
    <NavLink to="/tags" className="sidebar-item" activeClassName="active">
      <FormFilter style={icon} />
      태그
    </NavLink>
  </div>
);

export default SideBar;
