import { observable, action } from 'mobx';
import axios from 'axios';

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
    axios.get(`/user/exists?userId=${userId}`).then(res => {
      this.exists.userId = res.data.exists;
    });

  @action checkStatus = () => axios.get('/post/checkAuth');

  @action registerUser = ({ userId, userName, password }) =>
    axios.post('/user/signup', { userId, userName, password }).then(res => {
      this.result.register = res;
    });

  @action loginUser = ({ userId, password }) =>
    axios.post('/user/login', { userId, password }).then(res => {
      this.result.login = res;
    });

  @action logout = () => axios.post('/user/logout');
}
export default AuthStore;
