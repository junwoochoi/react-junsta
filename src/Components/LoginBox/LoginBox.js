import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Box, TextInput, Button, FormField } from 'grommet';
import { Login } from 'grommet-icons';
import storage from '../../lib/storage';

class LoginBox extends React.Component {
  componentWillUnmount() {
    const { initInput } = this.props;
    initInput('login');
  }

  handleLogin = async () => {
    const { form, loginUser, result, error, initInput } = this.props;
    const { userId, password } = form;
    try {
      await loginUser({ userId, password });
      const loggedInfo = result.login.data;
      console.log(loggedInfo);
      storage.set('loggedInfo', loggedInfo);
      window.location.href = '/';
    } catch (e) {
      console.error(e);
      initInput('login');
      if (e.response.status === 401) {
        error.errorMessage = '아이디와 비밀번호를 확인해주세요';
        return;
      }
      error.errorMessage = '알수없는 에러가 발생하였습니다.';
    }
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { name, value } = e.target;
    onChange(name, value, 'login');
  };

  handleKeyPress = e => {
    if (e.charCode === 13 || e.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    const { form, error } = this.props;
    return (
      <Box pad="xlarge" className="login-box" margin="large" elevation="small">
        <FormField label="아이디">
          <TextInput
            name="userId"
            placeholder="아이디"
            value={form.userId}
            onChange={this.handleChange}
          />
        </FormField>
        <FormField label="비밀번호" error={error.errorMessage}>
          <TextInput
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </FormField>
        <Button
          label="로그인"
          primary
          icon={<Login />}
          margin="xsmall"
          onClick={this.handleLogin}
        />

        <Link
          to="/auth/register"
          style={{
            textDecoration: 'underline',
            textAlign: 'right',
            color: '#a8a8a8',
          }}
        >
          회원가입
        </Link>
      </Box>
    );
  }
}

export default inject(({ auth }) => ({
  form: auth.login,
  onChange: auth.changeInput,
  initInput: auth.initInput,
  loginUser: auth.loginUser,
  error: auth.error,
  result: auth.result,
}))(observer(LoginBox));
