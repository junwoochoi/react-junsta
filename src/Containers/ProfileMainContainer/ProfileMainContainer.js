import React, { Component } from 'react';
import { getUserInfo } from '../../lib/api/user';

class ProfileMainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }

  getUserData = async () => {
    const { userId } = this.props;
    const response = await getUserInfo(userId);
    this.setState({ userInfo: response.data });
  };

  render() {
    const { userInfo } = this.state;
    console.log(userInfo);
    return <div />;
  }
}

export default ProfileMainContainer;
