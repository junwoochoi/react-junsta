import React, { Component } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import PostCard from '../../Components/PostCard';
import storage from '../../lib/storage';
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
    axios
      .get(`/post/all`, {
        params: {
          startIndex,
          limit,
        },
      })
      .then(res => {
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
