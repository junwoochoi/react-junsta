import axios from 'axios';

export const getHashTagList = keyword =>
  axios.get('/hashtag/list', {
    params: {
      keyword,
    },
  });

export const getCommentList = postId =>
  axios.get(`/comment`, { params: { postId } });

export const getImage = imageName =>
  axios.post(
    '/post/image',
    { fileName: imageName },
    {
      responseType: 'arraybuffer',
    },
  );

export const liketoggle = data => axios.post('/post/like/toggle', data);

export const checkLiked = params =>
  axios.get('/post/like/check', {
    params,
  });

export const addComment = param => axios.post('/comment/add', param);
export const sendUploadData = ({ formData, header }) =>
  axios.post('/post/upload', formData, header);
export const getAllPost = ({ startIndex, limit }) =>
  axios.get(`/post/all`, {
    params: {
      startIndex,
      limit,
    },
  });
