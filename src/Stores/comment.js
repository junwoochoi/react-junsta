import { action, observable } from 'mobx';
import axios from 'axios';

class CommentStore {
  constructor(root) {
    this.root = root;
  }
}
export default CommentStore;
