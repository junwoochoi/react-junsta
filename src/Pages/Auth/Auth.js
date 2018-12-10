import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AuthWrapper from '../../Components/AuthWrapper';

class Auth extends Component {
  componentWillMount() {
    const { setSideBarVisiblity } = this.props;
    setSideBarVisiblity(false);
  }

  componentWillUnmount() {
    const { setSideBarVisiblity } = this.props;
    setSideBarVisiblity(false);
  }

  render() {
    return <AuthWrapper />;
  }
}

export default inject(({ auth }) => ({
  setSideBarVisiblity: auth.setSideBarVisiblity,
}))(observer(Auth));
