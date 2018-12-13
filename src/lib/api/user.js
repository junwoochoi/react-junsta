import axios from 'axios';

export const logout = () => axios.post('/user/logout');
export const checkIdExist = userId =>
  axios.get(`/user/exists?userId=${userId}`);
export const checkAuth = () => axios.get('/post/checkAuth');
export const registerUser = ({ userId, userName, password }) =>
  axios.post('/user/signup', { userId, userName, password });
export const loginUser = ({ userId, password }) =>
  axios.post('/user/login', { userId, password });
export const getFollowing = userId =>
  axios.get('/post/follow/check', { params: { userId } });
export const toggleFollowing = ({ userId, writerId }) =>
  axios.post('/post/follow', {
    followUserId: userId,
    followedUserId: writerId,
  });
