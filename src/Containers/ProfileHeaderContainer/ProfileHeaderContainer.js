import React, { Component } from 'react';

class ProfileHeaderContainer extends Component {
  render() {
    const { userId } = this.props;
    console.log(this.props);
    return <div>{userId}</div>;
  }
}

export default ProfileHeaderContainer;
