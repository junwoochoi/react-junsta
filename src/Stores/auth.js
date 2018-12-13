import { observable, action } from 'mobx';
import {
  checkIdExist,
  checkAuth,
  registerUser,
  logout as logoutApi,
  loginUser as loginUserApi,
} from '../lib/api/user';

class AuthStore {
  constructor(root) {
    this.root = root;
  }

  @observable loggedInfo = {};

  @observable error = {
    form: '',
    errorMessage: '',
  };

  @observable exists = { userId: null };

  @observable sideBarVisible = true;

  @observable login = {
    userId: '',
    password: '',
  };

  @observable result = {};

  @observable register = {
    userId: '',
    password: '',
    userName: '',
  };

  @action changeInput = (name, value, type) => {
    if (type === 'login') {
      this.login[name] = value;
    } else if (type === 'register') {
      this.register[name] = value;
    }
  };

  @action initInput = type => {
    if (type === 'login') {
      this.login = { userId: '', password: '' };
    } else if (type === 'register') {
      this.register = {
        userId: '',
        password: '',
        userName: '',
      };
    }
  };

  @action setSideBarVisiblity = visible => {
    this.sideBarVisible = visible;
  };

  @action checkUserIdExists = userId =>
    checkIdExist(userId).then(res => {
      this.exists.userId = res.data.exists;
    });

  @action checkStatus = () => checkAuth();

  @action registerUser = ({ userId, userName, password }) =>
    registerUser({ userId, userName, password }).then(res => {
      this.result.register = res;
    });

  @action loginUser = ({ userId, password }) =>
    loginUserApi({ userId, password }).then(res => {
      this.result.login = res;
    });

  @action logout = () => logoutApi();
}
export default AuthStore;
