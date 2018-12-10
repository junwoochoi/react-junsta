import AuthStore from './auth';
import PostStore from './post';
import CommentStore from './comment';

class RootStore {
  constructor() {
    this.auth = new AuthStore(this);
    this.post = new PostStore(this);
    this.comment = new CommentStore(this);
  }
}

export default RootStore;
