import React, { Component } from 'react';
import { Button, Box } from 'grommet';
import { Upload } from 'grommet-icons';
import { withRouter } from 'react-router-dom';
import { logout } from '../../lib/api/user';

class Header extends Component {
  handleUploadBtn = () => {
    const { history } = this.props;
    history.push('/upload');
  };

  logout = async () => {
    try {
      const { history } = this.props;

      await logout();
      history.push('/auth/login');
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const iconStyle = {
      fontSize: '1em',
    };
    return (
      <Box justify="between" direction="row" pad="medium">
        <Button
          style={iconStyle}
          primary
          label="사진 올리기"
          icon={<Upload size="small" />}
          onClick={this.handleUploadBtn}
        />
        <Button
          style={iconStyle}
          color="brand"
          label="로그아웃"
          onClick={this.logout}
        />
      </Box>
    );
  }
}

export default withRouter(Header);
