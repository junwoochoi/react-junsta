/* eslint-disable */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import { Home, Auth } from './Pages';
import SideBarContainer from './Containers/SideBarContainer';
import storage from './lib/storage';
import { Grid, Box } from 'grommet';
import './App.scss';

const storageLoggedInfo = storage.get('loggedInfo');

@inject(({ auth, post }) => ({
  sideBarVisible: auth.sideBarVisible,
  setSideBarVisiblity: auth.setSideBarVisiblity,
  loggedInfo: auth.loggedInfo,
  checkStatus: auth.checkStatus,
  getFollowingUserList: post.getFollowingUserList,
}))
@observer
class App extends Component {
  initUserInfo = async () => {
    const { checkStatus, loggedInfo } = this.props;

    console.log('이닛 유저인포');

    loggedInfo.user = storageLoggedInfo;
    try {
      await checkStatus();
    } catch (e) {
      console.error(e);
      if (storageLoggedInfo) {
        storage.remove('loggedInfo');
      }
      window.location.href = '/auth/login';
    }
  };

  componentDidMount() {
    const { getFollowingUserList } = this.props;
    const currentLocation = this.props.location.pathname;
    if (currentLocation !== '/auth/login') {
      this.initUserInfo();
      getFollowingUserList(storageLoggedInfo.userId);
    }
  }

  render() {
    const { sideBarVisible } = this.props;

    if (!sideBarVisible) {
      return (
        <Box gridArea="main">
          <Route path="/auth" component={Auth} />
        </Box>
      );
    }
    return (
      <>
        <div className="wrapper">
          <div className="sidebar-box">
            <SideBarContainer />
          </div>
          <div className="main-box">
            <Route path="/" component={Home} />
            <Route path="/auth" component={Auth} />
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && <DevTools />}
      </>
    );
  }
}

export default App;
