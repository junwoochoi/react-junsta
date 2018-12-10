import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorInfo.scss';

const ErrorInfo = ({ code, message }) => (
  <div className="ErrorInfo">
    {code !== '' && <div className="code">{code}</div>}
    <div className="message">{message}</div>
    <Link className="gohome" to="/">
      홈으로
    </Link>
  </div>
);

ErrorInfo.defaultProps = {
  message: '오류가 발생했습니다',
  code: '',
};

export default ErrorInfo;
