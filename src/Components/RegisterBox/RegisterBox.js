import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Box, FormField, TextInput, Button } from 'grommet';
import { UserNew } from 'grommet-icons';
import { isLength, isAlphanumeric } from 'validator';
import debounce from 'lodash/debounce';

@inject(({ auth }) => ({
  form: auth.register,
  changeInput: auth.changeInput,
  initInput: auth.initInput,
  error: auth.error,
  exists: auth.exists,
  checkExists: auth.checkUserIdExists,
  registerUser: auth.registerUser,
  result: auth.result,
}))
@observer
class RegisterBox extends Component {
  validate = {
    userId: value => {
      const { error } = this.props;
      error.form = 'register';
      if (!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
        error.errorMessage =
          '아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.';
        return false;
      }
      return true;
    },
    password: value => {
      const { error } = this.props;
      error.form = 'register';
      if (!isLength(value, { min: 4 })) {
        error.errorMessage = '비밀번호를 4자 이상 입력하세요.';
        return false;
      }

      error.form = '';
      error.errorMessage = '';
      return true;
    },
    userName: () => true,
  };

  checkUserIdExists = debounce(async userId => {
    const { checkExists, error, exists } = this.props;
    try {
      await checkExists(userId);
      if (exists.userId) {
        error.errorMessage = '이미 존재하는 아이디 입니다.';
      } else {
        error.form = '';
        error.errorMessage = '';
      }
    } catch (e) {
      console.error(e);
    }
  }, 300);

  componentWillUnmount() {
    const { initInput } = this.props;
    initInput('register');
  }

  handleChange = e => {
    const { changeInput } = this.props;
    const { name, value } = e.target;

    changeInput(name, value, 'register');

    const validation = this.validate[name](value);
    if (name.indexOf('userId') > -1 && validation) {
      this.checkUserIdExists(value);
    }
  };

  handleRegister = async () => {
    const { form, error, registerUser, result, history } = this.props;
    const { userId, password, userName } = form;
    const { validate } = this;

    if (error.errorMessage || error.errorMessage.length > 0) {
      return;
    }

    if (!validate.userId || !validate.password) {
      return;
    }

    try {
      await registerUser({ userId, password, userName });

      const loggedInfo = result.register;
      console.log(loggedInfo);
      history.push('/auth/login');
    } catch (e) {
      console.error(e);
      if (e.response.status === 400) {
        error.errorMessage = '이미 존재하는 회원입니다. 아이디를 확인해주세요';
        return;
      }
      error.errorMessage = '알수없는 에러가 발생하였습니다.';
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
        <FormField label="비밀번호">
          <TextInput
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={this.handleChange}
          />
        </FormField>
        <FormField label="이름" error={error.errorMessage}>
          <TextInput
            name="userName"
            placeholder="이름"
            value={form.userName}
            onChange={this.handleChange}
          />
        </FormField>
        <Button
          label="가입하기"
          primary
          icon={<UserNew />}
          margin="xsmall"
          onClick={this.handleRegister}
        />
        <Link
          to="/auth/login"
          style={{
            textDecoration: 'underline',
            textAlign: 'right',
            color: '#a8a8a8',
          }}
        >
          로그인
        </Link>
      </Box>
    );
  }
}

export default RegisterBox;
