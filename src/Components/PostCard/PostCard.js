import { Image } from 'grommet';
import { Favorite, User as UserIcon, Chat, Tip } from 'grommet-icons';
import React, { Component, Fragment } from 'react';
import { Instagram } from 'react-content-loader';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import storage from '../../lib/storage';
import { timeSince } from '../../lib/common';
import {
  getCommentList,
  getImage as getImageFromServer,
  liketoggle,
  addComment,
  checkLiked,
} from '../../lib/api/post';
import './PostCard.scss';

const userInfo = storage.get('loggedInfo');

@observer
class PostCard extends Component {
  static defaultProps = {
    value: {
      uploadBy: '',
      contents_pic: '',
      contents_text: '',
      postId: -1,
      uploadDate: '',
      likeCount: 0,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      commentValue: '',
      imgSrc: '',
      isLiked: false,
      isLoaded: false,
      edit: false,
      commentList: [],
    };
  }

  async componentDidMount() {
    const { value } = this.props;
    const { contents_pic } = value;

    await this.getLike();
    await this.getComment();
    await this.getImage(contents_pic);

    this.setState({
      isLoaded: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      commentValue: '',
    });
  }

  getComment = async () => {
    const { value } = this.props;
    const { postId } = value;

    try {
      const comments = await getCommentList(postId);
      this.setState({
        commentList: comments.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  getLike = async () => {
    const { value } = this.props;
    const { postId } = value;
    if (postId !== -1) {
      await checkLiked({ userId: userInfo.userId, postId }).then(res => {
        this.setState({
          isLiked: res.data,
        });
      });
    }
  };

  getImage = async imageName => {
    const { value } = this.props;
    try {
      const img = await getImageFromServer(imageName).then(
        response =>
          `data:image/png;base64, ${Buffer.from(
            response.data,
            'binary',
          ).toString('base64')}`,
      );
      this.setState({
        imgSrc: img,
      });
    } catch (e) {
      console.error(e);
      if (e.response.status === 400) {
        value.contents_text = '이미지를 받아오지 못했습니다.';
      } else {
        value.contents_text = '알수없는 에러가 발생했습니다.';
      }
    }
  };

  toggleLike = async () => {
    const { value } = this.props;
    const { isLiked } = this.state;
    const { postId } = value;

    const data = {
      userId: userInfo.userId,
      postId,
    };
    await liketoggle(data).then(() => {
      if (isLiked) {
        value.likeCount -= 1;
      } else {
        value.likeCount += 1;
      }
      this.setState({
        isLiked: !isLiked,
      });
    });
  };

  toggleComment = () => {
    const { edit } = this.state;
    this.setState({
      edit: !edit,
    });
  };

  handleChange = e => {
    this.setState({
      commentValue: e.target.value,
    });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.sendComment();
    }
  };

  sendComment = async () => {
    const { commentValue } = this.state;
    const { value } = this.props;
    const { postId } = value;

    if (!commentValue) return;

    const commentObj = {
      comment_text: commentValue,
      postId,
      writerId: userInfo.userId,
    };

    try {
      const commentList = await addComment(commentObj);
      this.getComment();
      console.log(commentList);
      this.setState({
        commentValue: '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  moveToProfile = e => {
    const { history } = this.props;
    const profileId = e.target.innerText;
    history.push(`/profile/@${profileId}`);
  };

  render() {
    const { value } = this.props;
    const { isLiked } = this.state;
    const { uploadBy, contents_text, key, likeCount, uploadDate } = value;
    const { imgSrc, isLoaded, edit, commentList, commentValue } = this.state;

    const timeDiff = timeSince(new Date(uploadDate));

    const commentMap = commentList.map(element => (
      <Fragment key={element.commentId}>
        <div className="comment-item">
          <span className="comment-text">{element.comment_text}</span>
          <span className="comment-writer">{element.writerId}</span>
        </div>
        <div className="border-line" />
      </Fragment>
    ));
    if (isLoaded) {
      return (
        <div className="container">
          <div className="userid-container">
            <UserIcon className="user-icon" />
            <button
              type="button"
              className="userid"
              onClick={this.moveToProfile}
            >
              {uploadBy}
            </button>
            <span className="divider" />
            <span className="time">{`${timeDiff} 전`}</span>
          </div>
          <Image
            src={imgSrc}
            alt="고객의 이미지"
            className="image"
            width="100%"
            height="100%"
            fit="cover"
          />

          <div className="button-container" style={{ dislplay: 'flex' }}>
            <Favorite
              className={`like ${isLiked ? ' liked' : ''}`}
              onClick={this.toggleLike}
            />
            <Tip onClick={this.toggleComment} />
            <div className="count-wrapper">
              <div className="like-count">
                좋아요 <b>{likeCount}</b>개
              </div>
              <div className="comment-count" onClick={this.toggleComment}>
                댓글 <b>{commentList.length}</b>개
              </div>
            </div>
          </div>
          <div className="content">
            <button
              type="button"
              className="userid"
              onClick={this.moveToProfile}
            >
              {uploadBy}
            </button>
            {contents_text}
          </div>
          <div className={`comment-wrapper ${edit ? 'edit' : ''}`}>
            {commentList.length > 0 && (
              <div className="comment-list">{commentMap}</div>
            )}
            <div className="comment-container">
              <input
                placeholder="당신의 의견을 남겨주세요."
                value={commentValue}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
              <Chat onClick={this.sendComment} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container" style={{ padding: '0.75rem' }}>
        <Instagram animate={false} uniquekey={key} />
      </div>
    );
  }
}

export default withRouter(PostCard);
