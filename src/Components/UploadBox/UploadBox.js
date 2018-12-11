import React from 'react';
import { Box, Image, Button, TextInput } from 'grommet';
import './UploadBox.scss';
import { inject, observer } from 'mobx-react';
import { Image as ImageIcon } from 'grommet-icons';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import AutoComplete from '../AutoComplete';
import ErrorInfo from '../ErrorInfo';
import storage from '../../lib/storage';

@inject(({ post }) => ({
  uploadPost: post.uploadPost,
  setContentsText: post.setContentsText,
  onSendUploadData: post.onSendUploadData,
  error: post.error,
}))
@observer
class UploadBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      fileUrl: '',
      errorMessage: '',
    };
  }

  componentDidMount() {
    const { error } = this.props;
    error.code = undefined;
    error.message = '';
  }

  componentWillUnmount() {
    const { setContentsText } = this.props;
    setContentsText('');
  }

  sendPost = async () => {
    const { uploadPost, onSendUploadData, error, history } = this.props;
    const { contents_text } = uploadPost;
    const { fileUrl, file } = this.state;

    if (!fileUrl || !contents_text) {
      this.setState({
        errorMessage: '이미지 혹은 설명을 입력해주세요.',
      });
      return;
    }

    const header = {
      'Content-Type': 'undefined',
    };
    const formData = new FormData();
    const userInfo = storage.get('loggedInfo');
    if (!userInfo) {
      return;
    }

    formData.append('fileContent', file);
    formData.append(
      'inputJson',
      JSON.stringify({
        uploadBy: userInfo.userId,
        contents_text,
      }),
    );
    try {
      await onSendUploadData({ header, formData });
      history.push('/');
    } catch (e) {
      console.error(e);
      console.log(e.response);
      if (e.response.status === 403) {
        error.code = e.response.status;
        error.message = '로그인이 필요합니다.';

        return;
      }
      if (e.response.status === 400) {
        error.code = e.response.status;
        error.message = '요청이 올바르지 않습니다.';
        return;
      }
      error.code = e.response.status;
      error.message = '알수없는 에러가 발생했습니다.';
    }
  };

  handleClick = () => {
    this.myInput.click();
  };

  handleChange = e => {
    if (e.target.type === 'file') {
      const fileName = e.target.files[0];

      if (!fileName.type.match('image.*')) {
        this.setState({
          file: '',
          errorMessage: '파일이 이미지가 아닙니다.',
        });
        return;
      }
      const { uploadPost } = this.props;
      if (fileName) {
        const url = URL.createObjectURL(fileName);
        this.setState({
          file: fileName,
          fileUrl: url,
          errorMessage: '',
        });
        [uploadPost.file] = e.target.files;
      } else {
        uploadPost.file = '';
      }
    } else {
      const { setContentsText } = this.props;
      setContentsText(e.target.value);
    }
  };

  render() {
    const { fileUrl, errorMessage } = this.state;
    const { uploadPost, error } = this.props;

    if (error.code) {
      return <ErrorInfo {...error} />;
    }
    return (
      <div className="upload-box">
        <div className="button-wrapper">
          <button
            type="button"
            icon={<ImageIcon size="0.95em" />}
            onClick={this.handleClick}
          >
            이미지 선택
          </button>
          <input
            type="file"
            onChange={this.handleChange}
            ref={ref => {
              this.myInput = ref;
            }}
          />
          <button type="button" onClick={this.sendPost} className="write-btn">
            작성하기
          </button>
        </div>
        {fileUrl || fileUrl.length > 0 ? (
          <Image
            src={fileUrl}
            alt="업로드 이미지"
            style={{ width: '9rem' }}
            margin="small"
            alignSelf="center"
          />
        ) : (
          ''
        )}

        <div className="errorMsg">{errorMessage}</div>

        <AutoComplete
          className="input-upload-text"
          placeholder="설명 입력..."
          value={uploadPost.contents_text}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
export default withRouter(UploadBox);
