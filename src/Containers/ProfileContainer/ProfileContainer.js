import React, { Component } from 'react';
import ProfileHeaderContainer from '../ProfileHeaderContainer';
import ProfileMainContainer from '../ProfileMainContainer';

class ProfileContainer extends Component {
  render() {
    const { match } = this.props;
    const { userId } = match.params;
    return (
      <>
        <ProfileHeaderContainer userId={userId} />
        <ProfileMainContainer userId={userId} />
      </>
    );
  }
}

export default ProfileContainer;
