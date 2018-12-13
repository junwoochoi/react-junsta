import { action, observable } from 'mobx';
import { getFollowing, toggleFollowing } from '../lib/api/user';
import { sendUploadData } from '../lib/api/post';

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
    const res = await getFollowing(userId);
    this.followingUserList = res.data;
  };

  @action
  toggleFollowingUser = async ({ userId, writerId }) => {
    await toggleFollowing({ userId, writerId });
    await this.getFollowingUserList(userId);
  };

  @action
  setContentsText = value => {
    this.uploadPost.contents_text = value;
  };

  @action onSendUploadData = ({ formData, header }) =>
    sendUploadData({ formData, header });

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
