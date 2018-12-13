import React, { Component } from 'react';
import './AutoComplete.scss';
import debounce from 'lodash/debounce';
import { getHashTagList } from '../../lib/api/post';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtagList: [],
    };
  }

  componentWillReceiveProps() {
    const { value } = this.props;
    const lastWord = value.split(' ').pop();
    if (lastWord.startsWith('#')) {
      if (lastWord.length === 1) this.setState({ hashtagList: [] });
      this.renderHashTags(lastWord.substr(1, lastWord.length));
    } else {
      this.setState({ hashtagList: [] });
    }
  }

  componentWillUnmount() {
    this.setState({
      hashtagList: [],
    });
  }

  renderHashTags = debounce(async tag => {
    if (!tag || tag.trim().length < 1) {
      return;
    }
    try {
      const response = await getHashTagList(tag);
      if (response.status === 200) {
        console.log(response.data);
        this.setState({
          hashtagList: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, 300);

  render = () => {
    const { placeholder, value, onChange } = this.props;
    const { hashtagList } = this.state;
    const hashtagKeywords = hashtagList.map(element => (
      <div className="keyword-item" key={element.tagName}>
        <span className="keyword">{element.tagName}</span>
        <span className="count">{element.count}개</span>
      </div>
    ));

    return (
      <div className="auto-complete-comp">
        <textarea placeholder={placeholder} value={value} onChange={onChange} />
        {hashtagKeywords.length > 0 && (
          <div className="keyword-container">{hashtagKeywords}</div>
        )}
      </div>
    );
  };
}

export default AutoComplete;
