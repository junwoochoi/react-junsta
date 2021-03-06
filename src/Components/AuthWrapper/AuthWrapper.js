import React from 'react';
import { Box, Grid } from 'grommet';
import { Route } from 'react-router-dom';
import LoginBox from '../LoginBox';
import RegisterBox from '../RegisterBox';
import './AuthWrapper.scss';

const AuthWrapper = () => (
  <div className="auth-wrapper">
    <div className="intro-wrapper">
      환영합니다
      <br />
      당신의 사진을 타인과 공유해보세요
    </div>
    <div className="login-wrapper">
      <Route path="/auth/login" component={LoginBox} />
      <Route path="/auth/register" component={RegisterBox} />
    </div>
  </div>
);
export default AuthWrapper;
