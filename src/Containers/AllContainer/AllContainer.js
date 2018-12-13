import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { getAllPost } from '../../lib/api/post';
import PostCard from '../../Components/PostCard';
import './AllContainer.scss';

@observer
class AllContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      startIndex: 0,
      limit: 10,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.getPostList();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getPostList = () => {
    const { postList, startIndex, limit } = this.state;
    getAllPost({ startIndex, limit }).then(res => {
      this.setState({
        postList: postList.concat(res.data),
        startIndex: startIndex + limit,
      });
    });
  };

  handleScroll = e => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;

    if (bottom) {
      this.getPostList();
    }
  };

  render() {
    const { postList } = this.state;
    if (postList) {
      const postCardList = postList.map(value => (
        <PostCard value={value} key={value.postId} />
      ));

      return (
        <div
          className="cardList"
          ref={div => {
            this.cardListContainer = div;
          }}
        >
          {postCardList}
        </div>
      );
    }
    return <div>보여줄 내용이 없습니다.</div>;
  }
}

export default AllContainer;
