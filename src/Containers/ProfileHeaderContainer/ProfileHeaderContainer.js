import React, { Component } from 'react';
import ProfileHeader from '../../Components/ProfileHeader';
import * as userApi from '../../lib/api/user';

class ProfileHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    userApi
      .getUserInfo(userId)
      .then(res => this.setState({ userInfo: res.data }));
  }

  toggleFollow = async ({ followedUserId, followUserId }) => {
    await userApi.toggleFollowing({ followedUserId, followUserId });
  };

  render() {
    const { userInfo } = this.state;

    if (userInfo) {
      return (
        <ProfileHeader
          {...userInfo}
          toggleFollow={({ followedUserId, followUserId }) =>
            this.toggleFollow({ followedUserId, followUserId })
          }
        />
      );
    }

    return <div>loading....</div>;
  }
}

export default ProfileHeaderContainer;
