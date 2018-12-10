import { action, observable } from 'mobx';
import axios from 'axios';

class PostStore {
  constructor(root) {
    this.root = root;
  }

  @observable followingUserList = [];

  @observable
  error = {};

  @observable
  uploadPost = {
    file: '',
    contents_text: '',
  };

  @action
  getFollowingUserList = async userId => {
    const res = await axios.get('/post/follow/check', { params: { userId } });
    this.followingUserList = res.data;
  };

  @action
  toggleFollowingUser = async ({ userId, writerId }) => {
    await axios.post('/post/follow', {
      followUserId: userId,
      followedUserId: writerId,
    });
    await this.getFollowingUserList(userId);
  };

  @action
  setContentsText = value => {
    this.uploadPost.contents_text = value;
  };

  @action onSendUploadData = ({ formData, header }) =>
    axios.post('/post/upload', formData, header);

  @observable
  postList = [];

  @observable
  uploadWindowVisible = false;

  @action
  setUploadVisible = visible => {
    this.setUploadVisible = visible;
  };
}
export default PostStore;
